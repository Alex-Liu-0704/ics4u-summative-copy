import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ImageGrid, ImageOverlay, Pagination } from "@/components";
import { favoriteAction, getImageUrl, type ImageCell } from "@/core";
import { SEARCH_ENDPOINT } from "@/core/constants/endpoints";
import type { SearchResponse } from "@/core/types/responses";
import { getPrice } from "@/core/utils/prices";
import { useDebounce, useFirebaseContext, useTmdb } from "@/hooks";

export const SearchView = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState<number>(1);
  const query = searchParams.get("q") ?? "";
  const type = searchParams.get("type") ?? "movie";
  const debouncedQuery = useDebounce(query, 500);
  const { favorites, toggleFavorite } = useFirebaseContext();
  const { data } = useTmdb<SearchResponse>(`${SEARCH_ENDPOINT}/${type}`, { page, query: debouncedQuery });

  useEffect(() => {
    setPage(1);
  }, []);

  const gridData: ImageCell[] = (data?.results ?? []).map((result) => ({
    id: result.id,
    imageUrl: getImageUrl(result.profile_path ?? result.poster_path ?? null),
    media: type === "movie" ? "movie" : undefined,
    primaryText: result.name ?? result.title ?? "",
    secondaryText: type === "movie" ? `$${getPrice(result.release_date ?? "")}` : "",
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="mx-auto max-w-[1200px] space-y-5 p-10">
      <h1 className="font-bold text-3xl">Search for: {query}</h1>
      <ImageGrid
        images={gridData}
        onClick={(image) => {
          type === "person"
            ? navigate(`/person/${image.id}/career`)
            : navigate(`/${type === "movie" ? "movies" : "tv"}/${image.id}/summary`);
        }}
      >
        {(image) =>
          type === "movie" && (
            <ImageOverlay actions={[favoriteAction((image: ImageCell) => favorites.has(image.id), toggleFavorite)]} image={image} />
          )
        }
      </ImageGrid>
      {data.results.length ? (
        <Pagination maxPages={data.total_pages} onClick={setPage} page={page} />
      ) : (
        <p className="text-center text-gray-400">No search results found</p>
      )}
    </section>
  );
};
