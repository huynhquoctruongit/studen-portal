import { ImageCMS } from "@/ui/image";
import Link from "next/link";
import { useFollow } from "@/hook/use-follow";
import { usePathname } from "next/navigation";
const Followers = ({ profile, followers, toggle }: any) => {
  const meta = profile?.user_meta_id;
  const { follow } = useFollow();
  return (
    <div className="md:w-[600px] min-h-auto max-h-[459px] overflow-scroll bg-white rounded-[16px] p-[24px]">
      <div className="flex items-center justify-center mb-[32px]">
        <ImageCMS src={profile?.avatar} width={100} height={100} className="w-[48px] h-[48px] rounded-full" />
        <p className="text-18-bold text-blue ml-[16px]">Người theo dõi {meta?.nick_name || "ICANTECH Club-er"}</p>
      </div>
      <div>
        {followers?.data?.map((item: any, index: any) => {
          const { avatar, id, user_meta_id } = item?.follower_id || {};
          const isFollowed = follow[item?.follower_id?.id];
          return (
            <div
              key={index}
              className="flex items-center w-full justify-between py-[16px] [&:not(:first-child)]:border-t-[1px] border-[#E6E6E6]"
            >
              <div className="flex items-center">
                <div className="block overflow-hidden rounded-full mr-[8px]">
                  <ImageCMS src={avatar} width={100} height={100} className="w-[48px] h-[48px] rounded-full" />
                </div>
                <Link href={`/profile?id=${id}`} onClick={toggle}>
                  <p className="text-blue body-18-bold">{user_meta_id?.nick_name || "ICANTECH Club-er"}</p>
                </Link>
              </div>
              {isFollowed && <p className="text-pink">Đang theo dõi</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Followers;
