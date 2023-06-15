"use client";
import Image from "next/image";
import { useState } from "react";
interface ParamsProps {
  width?: any;
  height?: any;
  quality?: number;
  className?: string;
  loading?: any;
  sizes?: string;
  fill?: any;
  objectFit?: "cover" | "contain";
  priority?: boolean;
  classn?: string;
}
interface PropsLoader extends ParamsProps {
  src: string;
}
const removeNull = (params: any) => {
  const obj: any = {};
  Object.keys(params).map((key: any) => {
    if (params[key]) obj[key] = params[key];
  });
  return obj;
};
const myLoader = ({ src, width, height, quality }: PropsLoader) => {
  const params: ParamsProps = removeNull({ width, quality });
  const qs = "?" + new URLSearchParams(params as any).toString();
  return process.env.CMS + "/assets/" + src + qs;
};

const MyImageWithLoader = (props: PropsLoader) => {
  return <Image {...props} loader={myLoader} alt="Not found image" />;
};

export const MyImage = ({ src, ...props }: PropsLoader) => {
  const params: ParamsProps = removeNull({
    width: props.width,
    height: props.height,
    quality: 100,
  });
  const qs = "?" + new URLSearchParams(params as any).toString();
  const source = process.env.CMS + "/assets/" + src + qs;
  return (
    <Image
      src={source}
      // blurDataURL="/images/blur.jpeg"
      // placeholder="blur"
      {...props}
      alt="Not found image"
      style={{
        maxWidth: "100%",
        height: "auto",
      }}
    />
  );
};

export const ImageCMS = ({ src, ...props }: PropsLoader) => {
  const [error, setErrror] = useState(false);
  const params: ParamsProps = removeNull({
    width: props.width,
    height: props.height,
    quality: 100,
  });
  const qs = "?" + new URLSearchParams(params as any).toString();
  const source = error ? "/images/default-project.png" : process.env.CMS + "/assets/" + src + qs;
  const cls = props?.className;
  const classN = props?.classn;
  if (src) {
    return (
      <div className={classN}>
        <img src={source} onError={() => setErrror(true)} {...props} alt="Not found image" />
      </div>
    );
  } else {
    return (
      <div className={classN}>
        <img
          src={"/images/default-project.png"}
          onError={() => setErrror(true)}
          className="w-full object-cover"
          {...props}
          alt="Not found image"
        />
      </div>
    );
  }
};
export default MyImageWithLoader;

export const Avatar = ({ src, ...props }: PropsLoader) => {
  const params: ParamsProps = removeNull({
    width: props.width,
    height: props.height,
    quality: 100,
  });
  const qs = "?" + new URLSearchParams(params as any).toString();
  const source = src ? process.env.CMS + "/assets/" + src + qs : "/images/default-project.png";
  return <Image src={source} {...props} alt="Not found image" />;
};
