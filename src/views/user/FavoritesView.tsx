import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, ImageGrid, ImageOverlay } from "@/components";
import { favoriteAction, type ImageCell, type Media } from "@/core";
import { useFirebaseContext } from "@/hooks";

export const FavoritesView = () => {
  const navigate = useNavigate();
  const { favorites, toggleFavorite, clearFavorites } = useFirebaseContext();
  const [mediaType, setMediaType] = useState<Media>("movie");
  const mediaFavorites = Array.from(favorites.values()).filter((image) => image.media === mediaType);

  return (
    <section className="mx-auto max-w-7xl space-y-5 p-5">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-3xl">Favorites</h1>
        <div className="mb-5 flex gap-3">
          <Button onClick={() => setMediaType("movie")} variant={mediaType === "movie" ? "primary" : "grey"}>
            Movies
          </Button>
          <Button onClick={() => setMediaType("tv")} variant={mediaType === "tv" ? "primary" : "grey"}>
            TV
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-xl">{mediaType === "movie" ? "Movies" : "TV Shows"}</h2>
        {mediaFavorites.length > 0 && (
          <Button onClick={() => clearFavorites(mediaType)} variant="red">
            Clear
          </Button>
        )}
      </div>
      {mediaFavorites.length === 0 ? (
        <p className="text-gray-400">You have no favorite {mediaType === "movie" ? "movies" : "TV shows"} yet.</p>
      ) : (
        <ImageGrid
          images={mediaFavorites}
          onClick={(image) => (mediaType === "movie" ? navigate(`/movies/${image.id}/summary`) : navigate(`/tv/${image.showId}/seasons`))}
        >
          {(image) => (
            <ImageOverlay actions={[favoriteAction((image: ImageCell) => favorites.has(image.id), toggleFavorite)]} image={image} />
          )}
        </ImageGrid>
      )}
    </section>
  );
};
