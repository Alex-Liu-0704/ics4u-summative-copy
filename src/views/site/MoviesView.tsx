import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ImageGrid, ImageOverlay, LinkGroup, Pagination } from "@/components";
import { favoriteAction, getImageUrl, type ImageCell } from "@/core";
import { MOVIE_ENDPOINT } from "@/core/constants/endpoints";
import type { MoviesResponse } from "@/core/types/responses";
import { getPrice } from "@/core/utils/prices";
import { useFirebaseContext, useTmdb } from "@/hooks";

export const MoviesView = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const { category } = useParams();
  const { favorites, toggleFavorite } = useFirebaseContext();
  const { data } = useTmdb<MoviesResponse>(`${MOVIE_ENDPOINT}/${category}`, { page });

  const gridData: ImageCell[] = (data?.results ?? []).map((result) => ({
    id: result.id,
    imageUrl: getImageUrl(result.poster_path),
    media: "movie",
    primaryText: result.original_title,
    secondaryText: `$${getPrice(result.release_date ?? "")}`,
  }));

  console.log("MoviesView render");

  useEffect(() => {
    setPage(1);
  }, []);

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="mx-auto max-w-[1200px] space-y-5 p-5">
      {/* <h1 className="text-3xl font-bold mb-4">Movies</h1> */}
      <LinkGroup
        options={[
          { label: "Now Playing", to: "/movies/category/now_playing" },
          { label: "Popular", to: "/movies/category/popular" },
          { label: "Top Rated", to: "/movies/category/top_rated" },
          { label: "Upcoming", to: "/movies/category/upcoming" },
        ]}
      />
      <ImageGrid images={gridData} onClick={(image) => navigate(`/movies/${image.id}/summary`)}>
        {(image) => (
          <ImageOverlay actions={[favoriteAction((image: ImageCell) => favorites.has(image.id), toggleFavorite)]} image={image} />
        )}
      </ImageGrid>
      <Pagination maxPages={data.total_pages} onClick={setPage} page={page} />
    </section>
  );
};
