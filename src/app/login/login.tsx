"use client";
import { useEffect } from "react";

export default function LoginCom() {
  useEffect(() => {
    (async () => {
      try {
        // getProfile();
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return <div className="w-full h-[540px]"></div>;
}
