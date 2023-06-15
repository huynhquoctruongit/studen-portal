const Editable = ({ value, onChange, error, className, disabled, ...rest }: any) => {
  const clDisabled = "bg-gray border-[1px] border-[#BCBBBB]";

  const cls = (disabled ? clDisabled : error ? "border-[1px] border-pink " : " ") + className;
  return (
    <div className="relative w-full" {...rest}>
      <textarea
        className={"py-2.5 px-3 bg-[#DEF8FF] text-blue rounded-[5px] mt-1 w-full " + cls}
        onChange={(e) => {
          onChange(e);
        }}
        defaultValue={value}
        rows={3}
        disabled={disabled}
      ></textarea>
      {error && <div className="text-11 text-pink mt-0.5">{error}</div>}
    </div>
  );
};

export default Editable;
