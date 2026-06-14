import { Outlet, useNavigate, useParams } from "react-router-dom";
import { Button, DetailItem, LinkGroup } from "@/components";
import { getImageUrl } from "@/core";
import { PERSON_ENDPOINT } from "@/core/constants/endpoints";
import type { PersonResponse } from "@/core/types/responses";
import { useTmdb } from "@/hooks";

export const PersonView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useTmdb<PersonResponse>(`${PERSON_ENDPOINT}/${id}`, {});

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="mx-auto max-w-7xl p-5">
      <div className="flex gap-5">
        <div className="flex flex-col items-center gap-4">
          <img alt={data.name} className="w-50 rounded-xl object-cover shadow-lg" src={getImageUrl(data.profile_path)} />
          <Button onClick={() => navigate(-1)} variant="primary">
            ← Back
          </Button>
        </div>
        <div className="flex-1 space-y-4">
          <h1 className="font-bold text-4xl">{data.name}</h1>
          <div className="grid grid-cols-4 gap-3">
            <DetailItem label="Place of Birth" value={data.place_of_birth ?? "N/A"} />
            <DetailItem label="Born" value={data.birthday ?? "N/A"} />
            <DetailItem label="Died" value={data.deathday ?? "N/A"} />
            <DetailItem label="Known For" value={data.known_for_department ?? "N/A"} />
          </div>
          <p className="text-gray-300">{data.biography}</p>
          <LinkGroup
            options={[
              { label: "Career", to: "career" },
              { label: "Images", to: "images" },
            ]}
          />
        </div>
      </div>
      <Outlet />
    </section>
  );
};
