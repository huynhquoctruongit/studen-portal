"use client";
import TopTen from "./top-ten";
import useSWR from "swr";
import Link from "next/link";
import Loading from "../../home/loading/topten";

export const ProjectUser = ({ user_created }: any) => {
  const TitleUser = () => (
    <div>
      Dự án của{" "}
      <Link href={"/profile?id=" + user_created?.id} className="hello guy">
        {user_created?.user_meta_id?.nick_name}
      </Link>
    </div>
  );
  const { data: projects } = useSWR(
    `/items/projects?limit=10&fields=*,user_created.*,user_created.user_meta_id.*,subject_id.*,project_statistic_id.*&filter[user_created][_eq]=` +
      user_created.id,
    { revalidateIfStale: true },
  );
  if (!projects?.data) return <Loading />;
    
  return <TopTen projects={projects?.data} title={<TitleUser />} />;
};

export const ProjectOrther = () => {
  const { data: projects } = useSWR(
    `/items/projects?limit=10&fields=*,user_created.*,user_created.user_meta_id.*,subject_id.*,project_statistic_id.*&meta=filter_count&sort=-project_statistic_id.num_fame_per_week`,
    { revalidateIfStale: true },
  );
  if (!projects?.data) return <Loading />;
  return <TopTen projects={projects?.data} title={"Dự án của Creator khác"} />;
};

export default ProjectUser;
