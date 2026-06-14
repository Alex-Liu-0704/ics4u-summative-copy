import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ImageGrid, ImageOverlay, LinkGroup, Pagination } from "@/components";
import { favoriteAction, getImageUrl, type ImageCell } from "@/core";
import { GENRE_ENDPOINT } from "@/core/constants/endpoints";
import { MOVIE_GENRES, TV_GENRES } from "@/core/constants/genres";
import type { GenreResponse } from "@/core/types/responses";
import { useFirebaseContext, useTmdb } from "@/hooks";

export const GenreView = () => {
  const navigate = useNavigate();
  const { category, genre } = useParams();
  const [page, setPage] = useState<number>(1);
  const formatCategory = category === "movies" ? "movie" : "tv";
  const genres = formatCategory === "tv" ? TV_GENRES : MOVIE_GENRES;
  const genreId = genres.find((item) => item.name.toLowerCase() === genre)?.id;
  const { favorites, toggleFavorite, movieGenres, tvGenres } = useFirebaseContext();
  const preferredGenres =
    formatCategory === "tv" ? genres.filter((g) => tvGenres.includes(g.name)) : genres.filter((g) => movieGenres.includes(g.name));
  const { data } = useTmdb<GenreResponse>(`${GENRE_ENDPOINT}/${formatCategory}`, { page, with_genres: genreId });

  const gridData: ImageCell[] = (data?.results ?? []).map((result) => ({
    id: result.id,
    imageUrl: getImageUrl(result.poster_path),
    media: formatCategory,
    primaryText: result.original_title ?? result.name ?? "",
  }));

  useEffect(() => {
    setPage(1);
  }, []);

  useEffect(() => {
    if (preferredGenres.length > 0 && !preferredGenres.find((g) => g.name.toLowerCase() === genre)) {
      navigate(`/genre/${category}/${preferredGenres[0].name.toLowerCase()}`);
    }
  }, [preferredGenres, navigate, genre, category]);

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="mx-auto max-w-[1200px] space-y-5 p-5">
      <LinkGroup
        options={[
          {
            label: "Movies",
            match: "/genre/movies/:genre",
            to: `/genre/movies/action`,
          },
          {
            label: "TV",
            match: "/genre/tv/:genre",
            to: `/genre/tv/action`,
          },
        ]}
      />
      <LinkGroup
        options={preferredGenres.map((item) => ({
          label: item.name,
          to: `/genre/${category}/${item.name.toLowerCase()}`,
        }))}
      />
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
