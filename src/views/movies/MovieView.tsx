import { BsCart2, BsCartFill } from "react-icons/bs";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { LinkGroup, Modal } from "@/components";
import { getBackdropUrl, getImageUrl, type Media } from "@/core";
import { MOVIE_ENDPOINT, TV_ENDPOINT } from "@/core/constants/endpoints";
import { ICON_SIZE, ORIGINAL_IMAGE_BASE_URL } from "@/core/constants/images";
import type { DetailsResponse } from "@/core/types/responses";
import { getPrice } from "@/core/utils/prices";
import { useFirebaseContext, useTmdb } from "@/hooks";

export const MovieView = () => {
  const navigate = useNavigate();
  const { category, id } = useParams();
  const endpoint = category === "movies" ? `${MOVIE_ENDPOINT}/${id}` : `${TV_ENDPOINT}/${id}`;
  const { cart, toggleCart } = useFirebaseContext();
  const { data } = useTmdb<DetailsResponse>(endpoint, {});

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <Modal onClick={() => navigate(-1)}>
      <div className="grid h-full grid-rows-[auto_1fr] overflow-hidden">
        <img
          alt={data.title ?? data.name}
          className="h-48 w-full rounded-t-2xl object-cover"
          src={getBackdropUrl(data.backdrop_path)}
          style={{
            backgroundImage: `url(${ORIGINAL_IMAGE_BASE_URL}${data.backdrop_path})`,
          }}
        />
        <div className="grid min-h-0 grid-cols-[auto_1fr] gap-5 overflow-hidden p-5">
          <img alt={data.title ?? data.name} className="w-50 rounded-xl object-cover" src={getImageUrl(data.poster_path)} />
          <div className="flex min-h-0 flex-col gap-3">
            <div className="flex items-center justify-between">
              <h1 className="font-bold text-3xl">{data.title ?? data.name}</h1>
              {category === "movies" && (
                <button
                  className="rounded-full bg-black/50 p-2 backdrop-blur-sm"
                  onClick={() => {
                    toggleCart({
                      id: data.id,
                      imageUrl: getImageUrl(data.poster_path),
                      media: category as Media,
                      primaryText: data.title ?? data.name,
                      secondaryText: `$${getPrice(data.release_date ?? "")}`,
                    });
                  }}
                >
                  {cart.has(data.id) ? (
                    <BsCartFill className="text-blue-500" size={ICON_SIZE} />
                  ) : (
                    <BsCart2 className="text-white" size={ICON_SIZE} />
                  )}
                </button>
              )}
            </div>
            <div className="flex items-center justify-between">
              {data.tagline && <p className="font-bold text-blue-400 text-md">{data.tagline}</p>}
              {category === "movies" && <p className="font-bold text-blue-400 text-lg">${getPrice(data.release_date ?? "")}</p>}
            </div>
            <LinkGroup
              options={
                category === "movies"
                  ? [
                      { label: "Summary", to: "summary" },
                      { label: "Credits", to: "credits" },
                      { label: "Trailers", to: "trailers" },
                      { label: "Reviews", to: "reviews" },
                    ]
                  : [
                      { label: "Summary", to: "summary" },
                      { label: "Seasons", match: "/:category/:id/season/:season", to: "seasons" },
                      { label: "Credits", to: "credits" },
                      { label: "Trailers", to: "trailers" },
                      { label: "Reviews", to: "reviews" },
                    ]
              }
            />
            <div className="min-h-0 flex-1 overflow-y-auto">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
