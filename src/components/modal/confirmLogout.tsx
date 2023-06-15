import { Button } from "@/ui/button";
const ConfirmLogout = ({ toggle, action }: any) => {
  return (
    <div className="md:w-[500px] p-8 md:px-[40px] md:py-[38px] bg-white rounded-[8px]">
      <p className="body-18 text-blue text-center">Bạn có chắc muốn đăng xuất không?</p>
      <div className="flex items-center justify-center mt-[24px]">
        <Button onClick={() => action(true)}  className="mr-[16px]">
          Đăng xuất
        </Button>
        <Button onClick={() => toggle()} type="outlined" >
          Không
        </Button>
      </div>
    </div>
  );
};
export default ConfirmLogout;
