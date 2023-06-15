import { Button } from "@/ui/button";
const ConfirmDelete = ({ toggle, action }: any) => {
  return (
    <div className="md:w-[500px] px-[40px] py-[38px] bg-white rounded-[8px]">
      <p className="body-18 text-blue text-center">Bạn có muốn xoá bình luận này không?</p>
      <div className="flex items-center justify-center mt-[24px]">
        <Button onClick={() => action(true)} className="mr-[16px]">
          Có
        </Button>
        <Button onClick={() => toggle()} type="outlined">
          Không
        </Button>
      </div>
    </div>
  );
};
export default ConfirmDelete;
