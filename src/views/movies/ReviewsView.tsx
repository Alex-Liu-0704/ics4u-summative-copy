import { useParams } from "react-router-dom";
import { MOVIE_ENDPOINT, TV_ENDPOINT } from "@/core/constants/endpoints";
import type { ReviewsResponse } from "@/core/types/responses";
import { useTmdb } from "@/hooks";

export const ReviewsView = () => {
  const { id, category } = useParams();
  const endpoint = category === "movies" ? `${MOVIE_ENDPOINT}/${id}` : `${TV_ENDPOINT}/${id}`;
  const { data } = useTmdb<ReviewsResponse>(`${endpoint}/reviews`, {});

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="space-y-4 px-2">
      <h2 className="font-bold text-2xl">Reviews</h2>
      {data.results.length ? (
        data.results.slice(0, 5).map((review) => (
          <div className="rounded-xl bg-gray-800 p-5 shadow" key={review.id}>
            <p className="mb-2 text-gray-400 text-sm">By {review.author}</p>
            <p className="line-clamp-6 text-gray-300 text-sm leading-relaxed">{review.content}</p>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-400">No reviews available.</p>
      )}
    </section>
  );
};
