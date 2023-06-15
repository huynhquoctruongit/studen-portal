import { isMobileOnly, isTablet } from "react-device-detect";

const ProjectSketon = () => {
  const list = isMobileOnly ? [2] : isTablet ? [2, 2] : [1, 2, 3];
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-y-5 md:gap-y-0 gap-x-[30px] mt-8 mb-10">
      {list.map((item, index) => {
        return (
          <div key={"keton+" + item + index} className="rounded-2xl bg-[#f8f8f8] md:w-[362px] h-[390px] overflow-hidden">
            <div className="md:w-[362px] h-[260px] bg-gray-100 animate-pulse"></div>
            <div className="md:w-[362px] h-[68px] border-b-[1px] border-gray-100">
              <div className="flex justify-between px-4">
                <div className="rounded-full w-16 h-16 bg-gray-100 translate-y-[-40%] animate-pulse"></div>
                <div className="">
                  <div className="w-[253px] h-7 mt-1 bg-gray-100  delay-100 animate-pulse"></div>
                  <div className="w-[253px] h-6 mt-1 bg-gray-100  animate-pulse"></div>
                </div>
              </div>
            </div>
            <div className="flex gap-x-2 p-4">
              <div className="w-[34px] h-6 bg-gray-100  delay-100 animate-pulse"></div>
              <div className="w-[34px] h-6 bg-gray-100  delay-100 animate-pulse"></div>
              <div className="w-[34px] h-6 bg-gray-100  delay-100 animate-pulse"></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProjectSketon;
