import { directus } from "@/lib/directus";
import { useRouter } from "next/navigation";
import useSWR from "swr";
export function useAuth(options?: any) {
  const {
    data: profile,
    error,
    mutate,
  } = useSWR("/users/me?fields=*,user_meta_id.*,user_statistic_id.*", {
    revalidateOnFocus: false,
    revalidateOnMount: false,
    shouldRetryOnError: false,
    ...options,
  });
  const router = useRouter();
  async function login() {
    await mutate();
  }
  async function logout() {
    await mutate(null as any, false);
    localStorage.removeItem("auth_token");
    localStorage.removeItem("refresh_token");
    try {
      await directus.auth.logout();
    } catch (error) {}
    location.href = window.location.origin;
  }
  const firstLoading = profile === undefined && error === undefined;

  // if (profile && profile?.data.user_meta_id?.nick_name)
  // profile.data.user_meta_id.nick_name = profile?.data.user_meta_id?.nick_name.normalize("NFC");

  return {
    isLogin: firstLoading ? null : profile ? true : false,
    profile: profile?.data,
    error,
    login,
    logout,
    getProfile: mutate,
    firstLoading,
    data: profile?.data,
  };
}
