import { axiosServer } from "@/lib/api/axios-server";
import NotFound from "@/ui/notfound";
import ProfilePage from "./loaded";
import Loading from "./loading";

const syncData = async (userId: string) => {
  if (!userId || userId === "undefined") return null;
  const listByUserAxios = axiosServer.get(`/users?limit=100&fields=*,user_statistic_id.*,user_meta_id.*&filter[id][_eq]=${userId}`);
  const activityLogAxios = axiosServer.get(`/items/notifications?filter[source_user_id]=${userId}`);
  const listAxios = axiosServer.get(
    `/items/projects?limit=10&fields=*,subject_id.*,user_created.user_meta_id.*&meta=filter_count&filter[user_created][id][_eq]=${userId}`,
  );
  const behaByUserAxios = axiosServer.get(
    `/items/projects?fields=*,subject_id.*,project_statistic_id.*&filter[user_created][id][_eq]=${userId}`,
  );
  const followersAxios = axiosServer.get(
    `/items/followers?fields=*,follower_id.*,follower_id.user_meta_id.*&filter[followed_id][_eq]=${userId}`,
  );
  const profileByIdAxios = axiosServer(`/users?fields=*,user_meta_id.*,user_statistic_id.*&filter[id][_eq]=${userId}`);
  const allPromise = [listByUserAxios, activityLogAxios, listAxios, behaByUserAxios, followersAxios, profileByIdAxios];
  try {
    const reuslt: any = await Promise.allSettled(allPromise).catch((error) => console.log(error));
    const data = reuslt.map((element: any) => {
      if (element.status === "fulfilled") return element.value;
      else return { data: [] };
    });
    return data;
  } catch (error) {
    return null;
  }
};

export default async function Profile({ searchParams }: any) {
  const userId = searchParams.id || "";
  const data = await syncData(userId);
  if (!data) {
    return (
      <NotFound
        content={
          <>
            Không tìm thấy người dùng này <br /> hoặc đã có lỗi xảy ra
          </>
        }
      />
    );
  }

  const [listByUser, activityLog, list, behaByUser, followers, profileById] = data || [];
  return <ProfilePage dataFetched={{ listByUser, activityLog, list, behaByUser, followers, profileById }} />;
}
