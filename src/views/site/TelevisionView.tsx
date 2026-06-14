import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ImageGrid, LinkGroup, Pagination } from "@/components";
import { getImageUrl } from "@/core";
import { TV_ENDPOINT } from "@/core/constants/endpoints";
import type { TvResponse } from "@/core/types/responses";
import { useTmdb } from "@/hooks";

export const TelevisionView = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const { category } = useParams();
  const { data } = useTmdb<TvResponse>(`${TV_ENDPOINT}/${category}`, { page });

  const gridData = (data?.results ?? []).map((result) => ({
    id: result.id,
    imageUrl: getImageUrl(result.poster_path),
    primaryText: result.name,
  }));

  useEffect(() => {
    setPage(1);
  }, []);

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="mx-auto max-w-[1200px] space-y-5 p-5">
      <LinkGroup
        options={[
          { label: "Airing Today", to: "/tv/category/airing_today" },
          { label: "On The Air", to: "/tv/category/on_the_air" },
          { label: "Popular", to: "/tv/category/popular" },
          { label: "Top Rated", to: "/tv/category/top_rated" },
        ]}
      />
      <ImageGrid images={gridData} onClick={(image) => navigate(`/tv/${image.id}/summary`)} />
      <Pagination maxPages={data.total_pages} onClick={setPage} page={page} />
    </section>
  );
};
