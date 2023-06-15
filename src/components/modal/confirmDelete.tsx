import { Button } from "@/ui/button";
const ConfirmDelete = ({ profile, toggle, action }: any) => {
  return (
    <div className="md:w-[500px] px-[40px] py-[38px] bg-white rounded-[8px]">
      <p className="body-18 text-blue text-center">
        Bạn có muốn huỷ theo dõi <span className="font-bold">{profile?.user_meta_id?.nick_name}</span> không?
      </p>
      <div className="flex items-center justify-center mt-[24px]">
        <Button onClick={() => action(true)} type="outlined" className="mr-[16px]">
          Có
        </Button>
        <Button onClick={() => action(false)}>Không</Button>
      </div>
    </div>
  );
};
export default ConfirmDelete;
