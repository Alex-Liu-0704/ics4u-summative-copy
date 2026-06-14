import { useNavigate, useParams } from "react-router-dom";
import { ImageGrid } from "@/components";
import { getImageUrl } from "@/core";
import { PERSON_ENDPOINT } from "@/core/constants/endpoints";
import type { CareerResponse } from "@/core/types/responses";
import { useTmdb } from "@/hooks";

export const CareerView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useTmdb<CareerResponse>(`${PERSON_ENDPOINT}/${id}/combined_credits`, {});

  const gridData = (data?.cast ?? []).map((result) => ({
    id: result.id,
    imageUrl: getImageUrl(result.poster_path),
    primaryText: result.title ?? result.name ?? "",
    secondaryText: result.character,
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="mt-10 px-2">
      <h2 className="mb-6 font-bold text-2xl">Career</h2>
      {gridData.length ? (
        <ImageGrid
          images={gridData}
          onClick={(image) => {
            const mediaType = data.cast.find((item) => item.id === image.id)?.media_type;
            navigate(`/${mediaType === "movie" ? "movies" : "tv"}/${image.id}/summary`);
          }}
        />
      ) : (
        <p className="text-center text-gray-400">No credits available.</p>
      )}
    </section>
  );
};
