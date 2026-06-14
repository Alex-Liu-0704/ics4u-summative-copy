import { useNavigate, useParams } from "react-router-dom";
import { Button, ImageGrid } from "@/components";
import { getImageUrl } from "@/core";
import { TV_ENDPOINT } from "@/core/constants/endpoints";
import type { EpisodeResponse } from "@/core/types/responses";
import { getPrice } from "@/core/utils/prices";
import { useTmdb } from "@/hooks";

export const EpisodeView = () => {
  const navigate = useNavigate();
  const { id, season } = useParams();

  const { data } = useTmdb<EpisodeResponse>(`${TV_ENDPOINT}/${id}/season/${season}`, {});

  const gridData = (data?.episodes ?? []).map((result) => ({
    id: result.episode_number,
    imageUrl: getImageUrl(result.still_path),
    primaryText: `Ep ${result.episode_number}: ${result.name}`,
    secondaryText: result.air_date,
    showId: Number(id),
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="flex-1 space-y-3 px-2">
      <Button onClick={() => navigate(-1)} variant="primary">
        ← Back
      </Button>
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-3xl">{data.name} Episodes</h1>
        <p className="font-bold text-blue-400 text-lg">${getPrice(data.air_date ?? "")}</p>
      </div>
      {data.episodes.length ? <ImageGrid images={gridData} /> : <p className="text-center text-gray-400">No episodes available.</p>}
    </section>
  );
};
