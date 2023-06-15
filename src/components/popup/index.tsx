import ModalView from "@/ui/modal";
import { createContext, useContext, useRef, useState } from "react";
import { ShareModalGolbal } from "../modal/share";
const PopupContext = createContext({});
export const WrapPopup = ({ children }: any) => {
  const [show, setShow] = useState(false);
  const [share, setShare]: any = useState(null);
  const component = useRef(<></>);
  const setPopup = (content: any) => {
    component.current = content;
    setShow(true);
  };
  const closePopup = () => {
    setShow(false);
  };
  return (
    <PopupContext.Provider value={{ setPopup, closePopup, setShare }}>
      {children}
      <ModalView open={show} toggle={setShow}>
        {component.current}
      </ModalView>
      <ModalView open={share} toggle={() => setShare(false)}>
        <ShareModalGolbal data={share} />
      </ModalView>
    </PopupContext.Provider>
  );
};

export const usePopup = () => {
  const statePopup: any = useContext(PopupContext);
  return statePopup;
};
