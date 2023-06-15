"use client";
import AxiosController from "@/lib/api/axios-controller";
import { useEffect, useRef } from "react";

const TrackingPage = ({ projectId }: any) => {
  const timeout: any = useRef();
  useEffect(() => {
    if (!projectId) return;
    timeout.current = setTimeout(() => {
      AxiosController.post(`/api/v1/projects/${projectId}/view`);
    }, 15000);
    return () => {
      timeout.current && clearTimeout(timeout.current);
    };
  }, []);
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [projectId]);
  return null;
};

export default TrackingPage;
