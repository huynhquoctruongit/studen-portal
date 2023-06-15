import AxiosClient from "@/lib/api/axios-client";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";

export function usePin() {
  const params: any = useSearchParams();
  const id = params.get("id");
  const filter = {
    _and: [
      { user_created: { _eq: id } },
      {
        project_id: { status: { _eq: "PUBLISHED" } },
      },
    ],
  };
  const url = id ? "/items/histories?filter=" + JSON.stringify(filter) : null;
  const { data, error, mutate } = useSWR(url);

  const projectPinned = data?.data || [];
  const projects: any = {};
  projectPinned.forEach((element: any) => {
    projects[element.project_id] = element;
  });

  const pin = async (projectId: any) => {
    if (projectPinned.length >= 3) return;
    await AxiosClient.post("/items/histories", { project_id: projectId });
    mutate();
  };
  const unPin = async (projectId: any) => {
    const id = projects[projectId].id;
    await AxiosClient.delete("/items/histories/" + id);
    mutate();
  };

  return { pin, unPin, projectPinned: projects, length: projectPinned?.length || 0, foreUpdate: mutate };
}
