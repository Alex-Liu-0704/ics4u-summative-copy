import { useParams } from "react-router-dom";
import { DetailItem } from "@/components";
import { type DetailsResponse, MOVIE_ENDPOINT, TV_ENDPOINT } from "@/core";
import { useTmdb } from "@/hooks";

export const SummaryView = () => {
  const { id, category } = useParams();
  const endpoint = category === "movies" ? `${MOVIE_ENDPOINT}/${id}` : `${TV_ENDPOINT}/${id}`;
  const { data } = useTmdb<DetailsResponse>(endpoint, {});

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="space-y-2 overflow-y-auto p-5">
      <p className="text-gray-300 leading-relaxed">{data.overview}</p>
      <div className="grid grid-cols-2 gap-4 pt-2">
        {category === "movies" ? (
          <>
            <DetailItem label="Release" value={data.release_date ?? ""} />
            <DetailItem label="Runtime" value={data.runtime ? `${Math.floor(data.runtime / 60)}h ${data.runtime % 60}m` : "N/A"} />
            <DetailItem label="Genres" value={data.genres?.map((g) => g.name).join(", ") ?? ""} />
            <DetailItem label="Rating" value={`${Math.round(data.vote_average * 10)}%`} />
          </>
        ) : (
          <>
            <DetailItem label="Release" value={data.first_air_date ?? ""} />
            <DetailItem label="Status" value={data.status ?? ""} />
            <DetailItem label="Seasons" value={data.number_of_seasons ?? ""} />
            <DetailItem label="Episodes" value={data.number_of_episodes ?? ""} />
          </>
        )}
      </div>
    </section>
  );
};
