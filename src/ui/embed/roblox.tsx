import { Button } from "../button";

const Roblox = ({ src }: any) => {
  return (
    <div className="p-10">
      <div className="flex justify-center">
        <img className="h-[82px]" src="/images/step/roblox1.png" alt="" />
        <img className="h-[82px]" src="/images/step/roblox2.png" alt="" />
      </div>
      <div className="body-18-bold mt-4 text-blue text-center">
        Nếu bạn chưa tải ứng dụng Roblox thì hãy <br /> {"nhấn vào nút 'Tải ứng dụng' bên dưới nhé"}
      </div>
      <div className="flex justify-center">
        <Button className="mt-6">
          <a rel="noreferrer" href="https://setup.rbxcdn.com/mac/version-d7b11ea3a6594e46-Roblox.dmg" target={"_blank"}>
            TẢI ỨNG DỤNG
          </a>
        </Button>
      </div>
    </div>
  );
};
export default Roblox;
