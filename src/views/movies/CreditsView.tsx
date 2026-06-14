import { useNavigate, useParams } from "react-router-dom";
import { ImageGrid } from "@/components";
import { getImageUrl } from "@/core";
import { MOVIE_ENDPOINT, TV_ENDPOINT } from "@/core/constants/endpoints";
import type { CreditsResponse } from "@/core/types/responses";
import { useTmdb } from "@/hooks";

export const CreditsView = () => {
  const navigate = useNavigate();
  const { id, category } = useParams();
  const endpoint = category === "movies" ? `${MOVIE_ENDPOINT}/${id}` : `${TV_ENDPOINT}/${id}`;
  const { data } = useTmdb<CreditsResponse>(`${endpoint}/credits`, {});

  const gridData = (data?.cast ?? []).map((result) => ({
    id: result.id,
    imageUrl: getImageUrl(result.profile_path),
    primaryText: result.name,
    secondaryText: result.character,
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="px-2">
      <h2 className="mb-6 font-bold text-2xl">Credits</h2>
      {data.cast.length ? (
        <ImageGrid images={gridData} onClick={(image) => navigate(`/person/${image.id}/career`)} />
      ) : (
        <p className="text-center text-gray-400">No credits available.</p>
      )}
    </section>
  );
};
