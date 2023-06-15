import Link from "next/link";
import { useAuth } from "@/hook/auth";
import { useRouter } from "next/navigation";
const Profile = ({ setModalProfile, activeProfile, action }: any) => {
  const router = useRouter();
  const { logout, profile } = useAuth();
  const list = [
    {
      title: "Trang cá nhân",
      action: () => {
        setModalProfile(false);
        router.push(`/profile?id=${profile?.id}`);
      },
    },
    {
      title: "Đăng xuất",
      action: async () => {
        setModalProfile(false);
        await action();
      },
    },
  ];

  return (
    <div className="scroll-none w-[172px] bg-white absolute z-20 rounded-[4px] shodow-popup right-0 top-[64px]">
      <div className="mt-[8px]">
        {list.map((item, index) => (
          <div onClick={item.action} key={index}>
            <div className="text-14 leading-[150%] mb-[8px] flex items-center hover:bg-[#DEF8FF] py-[8px] px-[16px]">
              <span className="body-15-bold whitespace-nowrap text-[#4F4F4F]">{item.title} </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Profile;
