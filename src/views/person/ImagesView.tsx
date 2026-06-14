import { useParams } from "react-router-dom";
import { ImageGrid } from "@/components";
import { getImageUrl } from "@/core";
import { PERSON_ENDPOINT } from "@/core/constants/endpoints";
import type { ImagesResponse } from "@/core/types/responses";
import { useTmdb } from "@/hooks";

export const ImagesView = () => {
  const { id } = useParams();
  const { data } = useTmdb<ImagesResponse>(`${PERSON_ENDPOINT}/${id}/images`, {});

  const gridData = (data?.profiles ?? []).map((image, i) => ({
    id: i,
    imageUrl: getImageUrl(image.file_path),
    primaryText: "",
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="mt-10 px-2">
      <h2 className="mb-6 font-bold text-2xl">Images</h2>
      {gridData.length ? <ImageGrid images={gridData} /> : <p className="text-center text-gray-400">No images available.</p>}
    </section>
  );
};
