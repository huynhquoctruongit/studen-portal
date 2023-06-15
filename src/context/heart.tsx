import { useAuth } from "@/hook/auth";
import AxiosClient from "@/lib/api/axios-client";
import { chain, keyBy } from "lodash";
import { createContext, useContext, useEffect, useState } from "react";
const Behavior = createContext({});
const BehaviorProvider = ({ children }: any) => {
  const [data, setData] = useState<any>(null);
  const { profile } = useAuth();
  const filter = {
    user_created: {
      _eq: profile?.id,
    },
    type: { _eq: "LIKE" },
  };
  useEffect(() => {
    if (!profile?.id) return;
    AxiosClient.get("/items/behaviours?fields=project_id&limit=100000&filter=" + JSON.stringify(filter)).then((res) => {
      setData(res.data);
    });
  }, [profile?.id]);
  const value = !data ? {} : keyBy(data, "project_id");
  return <Behavior.Provider value={{ like: value }}>{children}</Behavior.Provider>;
};

export default BehaviorProvider;

export const useBehavior = () => {
  return useContext(Behavior);
};
