"use client";
import { useEffect } from "react";
const CheckBannedText = ({ text, className }: any) => {
  let modalMessage = text
  let regex = /<span class=\"banned\">.+<\/span>/g;
  let replaced = modalMessage.replace(regex, "***");

  return <div className="title text-pink" id="text-title-detail" dangerouslySetInnerHTML={{ __html: replaced as string }}></div>
};
export default CheckBannedText;
