"use client";
import { useAuth } from "@/hook/auth";
import ModalView from "@/ui/modal";
import { usePathname } from "next/navigation";
import OnBoarding from "./login/onboarding";
import relativeTime from "dayjs/plugin/relativeTime";
import weekOfYear from "dayjs/plugin/weekOfYear";
import dayjs from "dayjs";


dayjs.extend(weekOfYear);
dayjs.extend(relativeTime);
dayjs().locale("vn").format();

const Auth = () => {
  const { profile, isLogin, getProfile } = useAuth({ revalidateOnMount: true });
  const pathname = usePathname();

  return (
    <div>
      <ModalView open={pathname !== "/login" && isLogin && profile && !profile.user_meta_id}>
        <div className="bg-white p-6 max-w-[770px] mx-auto rounded-lg">
          <OnBoarding onSuccess={getProfile} type="popup" />
        </div>
      </ModalView>
    </div>
  );
};
export default Auth;
