const classtype: any = {
  solid: "bg-blue rounded-md text-white active:bg-[#0159a0b3]",
  outlined: "border-[1px] border-blue rounded-md text-blue hover:bg-blue-lighter active:text-white active:bg-[#0159a0b3]",
};

const classDisbale: any = {
  solid: "rounded-md bg-gray-200 text-gray-400",
  outlined: "border-[1px] border-gray-400 rounded-md text-gray-400 bg-gray-200 ",
};

export const Button = ({ type = "solid", color, children, disabled = false, className, href, icon, onClick, ...rest }: any) => {  
  const Icon = icon;
  const classNameType = disabled ? classDisbale[type] : classtype[type];
  const clsDefault =
    "animate md:px-[24px] px-[14px] py-[8px] cursor-pointer h-[40px] items-center flex w-fit whitespace-nowrap active:shadow-button-pressed hover:shadow-button ";

  return (
    <button onClick={disabled ? () => {} : onClick} className={`${clsDefault} ${classNameType} ${className || ""}`}>
      {icon && <Icon className="w-[18px] stroke-white mr-2" />}
      {children}
    </button>
  );
};

export const ButtonPink = ({ icon, children, onClick, className }: any) => {
  const Icon = icon;
  return (
    <button
      onClick={onClick}
      className={`whitespace-nowrap flex items-center cursor-pointer bg-pink text-white px-[24px] py-[8px] rounded-[10px] h-[40px] ${className}`}
      style={{
        boxShadow:
          "5px 10px 20px rgba(134, 153, 168, 0.2), inset 0px -3px 8px rgba(255, 255, 255, 0.25), inset 1px 1px 1px rgba(255, 255, 255, 0.6), inset -1px -1px 2px rgba(0, 0, 0, 0.25)",
      }}
    >
      {icon && <Icon className="mr-2" />}
      {children}
    </button>
  );
};
