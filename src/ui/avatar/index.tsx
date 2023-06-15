import Image from "next/image";

const Avatar = ({ className, src, width, height, classParent }: any) => {
  return (
    <div>
      <div className={classParent} style={{ height, width }}>
        <Image
          src={src || "/images/default-project.png"}
          className={"rounded-full w-full h-full border-[1.5px] border-white drop-shadow " + className}
          width={width}
          height={height}
          alt=""
        />
      </div>
    </div>
  );
};
export default Avatar;
