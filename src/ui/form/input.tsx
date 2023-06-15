const Input = ({ value, onChange, error, className, ...rest }: any) => {
  const clDisabled = "bg-gray border-[1px] border-[#BCBBBB]";
  const cls = (rest.disabled ? clDisabled : error ? "border-[1px] border-pink " : " ") + className;
  return (
    <div className="relative w-full">
      <input type="text" {...rest} className={"py-2.5 px-3 rounded-[5px] mt-1 w-full text-blue " + cls} value={value} onChange={onChange} />
      {error && <div className="text-11 text-pink mt-0.5">{error}</div>}
    </div>
  );
};

export default Input;
