import { ImageCMS } from "@/ui/image";
import { Button, ButtonPink } from "@/ui/button";
import Link from "next/link";
const Followers = ({ profile, toggle }: any) => {
  return (
    <div className="md:w-[600px] min-h-auto max-h-[459px] overflow-scroll bg-white rounded-[16px] p-[24px]">
      <div className="flex items-center justify-center mb-[32px]">
        <ImageCMS src={profile?.avatar} width={100} height={100} className="w-[48px] h-[48px] rounded-full" />
        <p className="text-24-bold text-blue ml-[16px]">Dự án của {profile?.user_meta_id?.nick_name}</p>
      </div>
    </div>
  );
};
export default Followers;
