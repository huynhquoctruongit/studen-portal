import { createContext, useContext } from "react";
import { v4 as uuidV4 } from "uuid";
import { useReducer } from "react";

export const TrackerContext = createContext(null);

function defaultGetUserId() {
  let deviceId = window.localStorage.getItem("device-id");
  if (!deviceId) {
    deviceId = uuidV4();
    window.localStorage.setItem("device-id", deviceId);
  }
  return deviceId;
}

function newTracker(config: any) {}

function reducer(state: any, action: any) {
  switch (action.type) {
    case "init": {
      return { ...state, tracker: newTracker(state.config) };
    }
    case "start": {
      console.log("Starting tracker...");
      state.tracker.start();
      return state;
    }
  }
}

export const useTracker = () => {
  const { initTracker, startTracking }: any = useContext(TrackerContext);
  return { initTracker, startTracking };
};

export default function TrackerProvider({ children, config = {} }: any) {
  let [state, dispatch]: any = useReducer(reducer, { tracker: null, config });

  // let value: any = {
  //   startTracking: () => dispatch({ type: "start" }),
  //   initTracker: () => dispatch({ type: "init" }),
  // };

  let value: any = {
    startTracking: () => dispatch({ type: "start" }),
    initTracker: () => dispatch({ type: "init" }),
  };

  if (process.env.MODE !== "PRODUCTION-DISABLE-TRACKER") {
    value = { startTracking: () => {}, initTracker: () => {} };
  }

  return <TrackerContext.Provider value={value}>{children}</TrackerContext.Provider>;
}
