import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { ButtonGroup, ImageGrid, ImageOverlay, LinkGroup, Pagination } from "@/components";
import { favoriteAction, getImageUrl, type ImageCell } from "@/core";
import { TRENDING_ENDPOINT } from "@/core/constants/endpoints";
import type { GenreResponse } from "@/core/types/responses";
import { useFirebaseContext, useTmdb } from "@/hooks";

export const TrendingView = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const interval = searchParams.get("interval") || "day";
  const formatCategory = category === "movies" ? "movie" : "tv";
  const { favorites, toggleFavorite } = useFirebaseContext();
  const { data } = useTmdb<GenreResponse>(`${TRENDING_ENDPOINT}/${formatCategory}/${interval}`, { page });

  const gridData: ImageCell[] = (data?.results ?? []).map((result) => ({
    id: result.id,
    imageUrl: getImageUrl(result.poster_path),
    media: formatCategory,
    primaryText: result.original_title ?? result.name ?? "",
  }));

  useEffect(() => {
    setPage(1);
  }, []);

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="mx-auto max-w-[1200px] space-y-5 p-5">
      <div className="mb-4 flex items-center justify-between">
        <LinkGroup
          options={[
            { label: "Movies", to: `/trending/movies?interval=${interval}` },
            { label: "TV", to: `/trending/tv?interval=${interval}` },
          ]}
        />
        <ButtonGroup
          onClick={(value) => setSearchParams({ interval: value })}
          options={[
            { label: "Today", value: "day" },
            { label: "Week", value: "week" },
          ]}
          value={interval}
        />
      </div>
      <ImageGrid images={gridData} onClick={(image) => navigate(`/${category}/${image.id}/summary`)}>
        {(image) =>
          image.media === "movie" ? (
            <ImageOverlay actions={[favoriteAction((image: ImageCell) => favorites.has(image.id), toggleFavorite)]} image={image} />
          ) : null
        }
      </ImageGrid>
      <Pagination maxPages={data.total_pages} onClick={setPage} page={page} />
    </section>
  );
};
