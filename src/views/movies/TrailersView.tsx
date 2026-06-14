import { useParams } from "react-router-dom";
import { MOVIE_ENDPOINT, TV_ENDPOINT } from "@/core/constants/endpoints";
import type { TrailersResponse } from "@/core/types/responses";
import { useTmdb } from "@/hooks";

export const TrailersView = () => {
  const { id, category } = useParams();
  const endpoint = category === "movies" ? `${MOVIE_ENDPOINT}/${id}` : `${TV_ENDPOINT}/${id}`;
  const { data } = useTmdb<TrailersResponse>(endpoint, { append_to_response: "videos" });

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  const trailerVideos = data?.videos?.results.filter((v) => v.site === "YouTube" && v.type === "Trailer");

  return (
    <section className="space-y-4 px-2">
      <h2 className="font-bold text-2xl">Trailers</h2>
      {trailerVideos && trailerVideos.length > 0 ? (
        <div className="grid grid-cols-2 gap-6">
          {trailerVideos.map((video) => (
            <div className="aspect-video" key={video.key}>
              <iframe
                allowFullScreen
                className="h-full w-full rounded-xl"
                src={`https://www.youtube.com/embed/${video.key}`}
                title="Movie Trailer"
              />
              <p className="mt-2 text-gray-400 text-sm">{video.name}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400">No trailers available.</p>
      )}
    </section>
  );
};
