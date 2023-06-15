"use client";
import { WrapPopup } from "@/components/popup";
import BehaviorProvider from "@/context/heart";
import { useAuth } from "@/hook/auth";
import { fetcherClient } from "@/lib/api/axios-client";
import TrackerProvider, { useTracker } from "@/lib/open-replay/contex";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import useSWR, { SWRConfig } from "swr";

const AppContext = ({ children }: any) => {
  const refProfile: any = useRef();
  useSWR("/items/profanity_words");
  const { profile } = useAuth();
  const value = {
    fetcher: fetcherClient,
    revalidateIfStale: false,
    revalidateOnFocus: false,
  };
  refProfile.current = profile;
  const getUserId = () => {
    return refProfile?.current?.id;
  };
  return (
    <div>
      <SWRConfig value={value}>
        <BehaviorProvider>
          <TrackerProvider config={{ getUserId: getUserId }}>
            <InitOpenReplay />
            <WrapPopup>{children}</WrapPopup>
          </TrackerProvider>
        </BehaviorProvider>
      </SWRConfig>
    </div>
  );
};

const InitOpenReplay = () => {
  const { profile } = useAuth();
  const isSended: any = useRef(false);
  const pathname = usePathname();

  const { initTracker, startTracking } = useTracker();
  useEffect(() => {
    if (pathname?.includes("/login")) return;
    if (process.env.MODE !== "PRODUCTION" || isSended.current) return;
    const token = localStorage.getItem("auth_token");
    if (!token) {
      initTracker();
      startTracking();
      isSended.current = true;
    }
    if (token && profile?.id) {
      initTracker();
      startTracking();
      isSended.current = true;
    }

    setTimeout(() => {
      if (isSended.current) return;
      initTracker();
      startTracking();
      isSended.current = true;
    }, 5000);
  }, [profile]);
  return null;
};

export default AppContext;
