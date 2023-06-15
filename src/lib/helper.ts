import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

dayjs.updateLocale("en", {
  relativeTime: {
    future: "%s",
    past: "%s trước",
    s: "vài giây",
    m: "một phút",
    mm: "%d phút",
    h: "một giờ",
    hh: "%d giờ",
    d: "một ngày",
    dd: "%d ngày",
    M: "một tháng",
    MM: "%d tháng",
    y: "một năm",
    yy: "%d năm",
  },
});
export const getErrCode: any = {
  DUPLICATED_NICK_NAME: "Nickname của bạn đã có trên hệ thống, vui lòng chọn tên khác nhé",
  PROFANITY_WORD_FOUND_IN_NICK_NAME: "Nickname của bạn không hợp lệ. Bạn vui lòng đặt tên khác nhé",
  PROFANITY_WORD_FOUND_IN_INTRODUCTION: "Mô tả của bạn không hợp lệ. Bạn vui lòng đặt mô tả khác nhé",
};
export function getCookie(cname: string) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export const source: any = {
  DEVELOPMENT: "affb2bdb-39fe-4154-aaea-c1ac39eceb17",
  STAGING: "b6028283-709d-4732-8374-44d3bed7d984",
  PRODUCTION: "b6028283-709d-4732-8374-44d3bed7d984",
};

export const domainAll: any = {
  DEVELOPMENT: "https://ictc.dev.icanx.vn",
  STAGING: "https://ictc.stag.icanx.vn",
  PRODUCTION: "https://club.icantech.vn",
};

export const renderImageById = (id: string) => {
  if (!id) return "";
  const source = process.env.CMS + "/assets/" + id;
  return source;
};
export const domain = domainAll[process.env.MODE as string] || domainAll.DEVELOPMENT;

export const folderSource = source[process.env.MODE as string] || source.DEVELOPMENT;

export const timeAgo = (date_created: string) => {
  const dayago = dayjs(date_created).fromNow();
  return dayago;
};

export const fameCount = (like: any, view: any, comment: any, follower: any) => {
  // Tim * 55 + Unique_view * 33 + Tổng comment * 11 => Project
  // Tổng danh vọng của project mà coder tạo ra + Follower * 999 => Coder

  if (like != undefined && view != undefined && comment != undefined && follower != undefined) {
    const project = like * 55 + view * 33 + comment * 11;
    const user = project + follower * 999;
    return {
      fameProject: project,
      fameUser: user,
    };
  }
};

export const checkBannedText = (text: any) => {
  if (text) {
    let modalMessage = text;
    let regex = /<span class=\"banned\">.+<\/span>/g;
    let replaced = modalMessage.replace(regex, "***");
    return replaced;
  }
  return "";
};


const str =
  "([a-zA-Z0-9àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ ]){1,}".normalize(
    "NFD",
  );
const regexName = new RegExp(str, "y");

export const standardizedNickname = (value: string) => {
  const result = value.normalize("NFD").replaceAll(regexName, "");
  return result;
};

export const checkName = (value: string) => {
  const str =
    "([a-zA-Z0-9àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ ]){1,}".normalize(
      "NFD",
    );
  const regexName = new RegExp(str, "y");
  const text = value.normalize("NFD");
  const result: any = text.normalize("NFD").match(regexName);
  return result && result[0]?.length === text.length;
  // return result;
};

export const removeVietnameseTones = (str: string) => {
  if (!str) return "";
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
  // Remove extra spaces
  // Bỏ các khoảng trắng liền nhau
  str = str.replace(/ + /g, " ");
  str = str.trim();
  // Remove punctuations
  // Bỏ dấu câu, kí tự đặc biệt
  // str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
  return str;
};
