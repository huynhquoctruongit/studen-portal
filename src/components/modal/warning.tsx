import { Button } from "@/ui/button";
import { WarningIcon } from "@/ui/icons/action";
import { usePopup } from "../popup";
const WarningModal = ({ message }: any) => {
  const { closePopup } = usePopup();
  return (
    <div className="md:w-[500px] px-[40px] py-[38px] bg-white rounded-[8px]">
      <div className="rounded-lg bg-white flex flex-col items-center">
        <WarningIcon />
        <div className="mt-4 text-blue body-18-bold ">{message}</div>
        <div className="mt-6">
          <Button onClick={closePopup}>Đóng</Button>
        </div>
      </div>
    </div>
  );
};
export default WarningModal;
