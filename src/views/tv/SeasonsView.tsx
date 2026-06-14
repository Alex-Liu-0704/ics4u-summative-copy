import { useNavigate, useParams } from "react-router-dom";
import { ImageGrid, ImageOverlay } from "@/components";
import { cartAction, favoriteAction, getImageUrl, type ImageCell } from "@/core";
import { TV_ENDPOINT } from "@/core/constants/endpoints";
import type { SeasonsResponse } from "@/core/types/responses";
import { getPrice } from "@/core/utils/prices";
import { useFirebaseContext, useTmdb } from "@/hooks";

export const SeasonsView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { favorites, toggleFavorite, cart, toggleCart } = useFirebaseContext();
  const { data } = useTmdb<SeasonsResponse>(`${TV_ENDPOINT}/${id}`, {});

  const gridData: ImageCell[] = (data?.seasons ?? [])
    .filter((result) => result.season_number > 0)
    .map((result) => ({
      id: result.id,
      imageUrl: getImageUrl(result.poster_path),
      media: "tv",
      primaryText: `${data?.name} - ${result.name}`,
      season: result.season_number,
      secondaryText: `$${getPrice(result.air_date ?? "")}`,
      showId: data?.id,
    }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="px-2">
      <h2 className="mb-6 font-bold text-2xl">Seasons</h2>
      {data.seasons.length ? (
        <ImageGrid images={gridData} onClick={(image) => navigate(`/tv/${id}/season/${image.season}`)}>
          {(image) => (
            <ImageOverlay
              actions={[
                favoriteAction((image: ImageCell) => favorites.has(image.id), toggleFavorite),
                cartAction((image: ImageCell) => cart.has(image.id), toggleCart),
              ]}
              image={image}
            />
          )}
        </ImageGrid>
      ) : (
        <p className="text-center text-gray-400">No seasons available.</p>
      )}
    </section>
  );
};
