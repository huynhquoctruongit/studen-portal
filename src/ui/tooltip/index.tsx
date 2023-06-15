const Tooltip = ({ className, content, children, position, shape = true }: any) => {
  if (!content) return children;
  return (
    <div>
      <div className="relative group ">
        {children}
        <div className={`w-fit justify-center absolute flex ${className || ""}`} style={{ right: position?.x, bottom: position?.y }}>
          <div className="w-fit relative hidden group-hover:flex shadow-md justify-center z-10 border-blue py-3 px-1.5 text-xs leading-none mb-[10px] bg-blue-lighter border-[1px] rounded-lg">
            {shape && (
              <div className="absolute top-full right-[50px]" style={{ transform: "translateY(-7px)" }}>
                <div
                  className="w-4 h-4 rounded-t-sm bg-blue-lighter rotate-45 border-r-[1px] border-b-[1px] border-blue"
                  style={{ borderRadius: "0px 0px 2px 0px" }}
                ></div>
              </div>
            )}
            <p className="whitespace-nowrap body-15 text-gray-600">{content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Tooltip;
