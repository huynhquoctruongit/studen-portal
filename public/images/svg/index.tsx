export function ArrowIcon({ className, fill }: any) {
  return (
    <svg width="8" className={`cursor-pointer ${className}`} height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1.01 0.985966L7 6.99298L1.01 13"
        stroke={fill || "#0159A0"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function FbIcon({ className, fill }: any) {
  return (
    <svg
      className={`cursor-pointer ${className}`}
      width="25px"
      height="25px"
      viewBox="0 0 28 28"
      fill={fill || "white"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M26.25 14.0742C26.25 7.30938 20.7648 1.82422 14 1.82422C7.23516 1.82422 1.75 7.30938 1.75 14.0742C1.75 20.1883 6.22891 25.2562 12.0859 26.176V17.6163H8.97477V14.0742H12.0859V11.3754C12.0859 8.30578 13.9152 6.60883 16.713 6.60883C18.0534 6.60883 19.4556 6.84836 19.4556 6.84836V9.86329H17.9102C16.3893 9.86329 15.9135 10.8072 15.9135 11.7773V14.0742H19.3107L18.7682 17.6163H15.9141V26.1771C21.7711 25.2578 26.25 20.1899 26.25 14.0742Z"
      />
    </svg>
  );
}
export function YoutubeIcon({ className, fill }: any) {
  return (
    <svg
      className={`cursor-pointer ${className}`}
      width="28"
      height="22"
      viewBox="0 0 28 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M27.8166 5.13695C27.8166 2.67601 26.0064 0.696328 23.7697 0.696328C20.74 0.554687 17.6502 0.5 14.4925 0.5H13.5082C10.3581 0.5 7.26284 0.554687 4.23315 0.696875C2.0019 0.696875 0.191739 2.6875 0.191739 5.14844C0.0550201 7.09476 -0.00294869 9.04164 0.000332559 10.9885C-0.00513619 12.9354 0.056843 14.8841 0.18627 16.8346C0.18627 19.2955 1.99643 21.2916 4.22768 21.2916C7.41049 21.4393 10.6753 21.5049 13.9949 21.4994C17.3199 21.5104 20.5756 21.4411 23.7621 21.2916C25.9988 21.2916 27.8089 19.2955 27.8089 16.8346C27.9402 14.8823 28.0003 12.9354 27.9949 10.983C28.0073 9.03617 27.9478 7.08747 27.8166 5.13695ZM11.3207 16.3534V5.60726L19.2503 10.9776L11.3207 16.3534Z"
        fill={fill || "white"}
      />
    </svg>
  );
}
export function CallIcon({ className, fill }: any) {
  return (
    <svg
      className={`cursor-pointer ${className}`}
      width="21"
      height="21"
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.67962 1.98705L2.95956 1.70711C3.35008 1.31658 3.98325 1.31658 4.37377 1.70711L7.62623 4.95956C8.01675 5.35008 8.01675 5.98325 7.62623 6.37377L6.31704 7.68296C6.1277 7.87229 6.08077 8.16154 6.20051 8.40102C7.58495 11.1699 9.8301 13.4151 12.599 14.7995C12.8385 14.9192 13.1277 14.8723 13.317 14.683L14.6262 13.3738C15.0168 12.9832 15.6499 12.9832 16.0404 13.3738L19.2929 16.6262C19.6834 17.0168 19.6834 17.6499 19.2929 18.0404L19.013 18.3204C16.9016 20.4317 13.559 20.6693 11.1703 18.8777L8.62857 16.9714C6.88504 15.6638 5.33622 14.115 4.02857 12.3714L2.12226 9.82968C0.330722 7.44096 0.568269 4.0984 2.67962 1.98705Z"
        stroke={fill || "#DC3B8A"}
        strokeWidth="1.5"
      />
    </svg>
  );
}
export function MailIcon({ className, fill }: any) {
  return (
    <svg
      className={`cursor-pointer ${className}`}
      width="22"
      height="21"
      viewBox="0 0 22 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.66699 7.80531C1.66699 6.60249 1.66699 6.00108 1.96569 5.51778C2.26439 5.03447 2.80231 4.76551 3.87814 4.2276L9.21147 1.56093C10.0893 1.12202 10.5282 0.902572 11.0003 0.902572C11.4725 0.902572 11.9114 1.12202 12.7892 1.56093L18.1225 4.2276C19.1983 4.76551 19.7363 5.03447 20.035 5.51778C20.3337 6.00108 20.3337 6.60249 20.3337 7.80531V15.3332C20.3337 17.2188 20.3337 18.1616 19.7479 18.7474C19.1621 19.3332 18.2193 19.3332 16.3337 19.3332H5.66699C3.78137 19.3332 2.83857 19.3332 2.25278 18.7474C1.66699 18.1616 1.66699 17.2188 1.66699 15.3332V7.80531Z"
        stroke={fill || "#0159A0"}
        strokeWidth="1.5"
      />
      <path
        d="M1.66699 7.6665L4.58121 10.5807C4.95628 10.9558 5.46499 11.1665 5.99542 11.1665H16.0052C16.5357 11.1665 17.0444 10.9558 17.4194 10.5807L20.3337 7.6665"
        stroke={fill || "#0159A0"}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
export function HeartIcon(props: any) {
  return (
    <svg {...props} width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12.0003 21.5999C11.6668 21.5996 11.3411 21.5028 11.0656 21.3219C6.98429 18.6542 5.21676 16.8224 4.24265 15.6815C2.16565 13.2448 1.17076 10.742 1.19984 8.03232C1.23203 4.92664 3.81894 2.3999 6.96664 2.3999C9.08518 2.3999 10.6014 3.46279 11.5464 4.44069C11.6047 4.5 11.6749 4.54725 11.7527 4.57953C11.8306 4.61182 11.9144 4.62848 11.9992 4.62848C12.084 4.62848 12.1679 4.61182 12.2457 4.57953C12.3236 4.54725 12.3938 4.5 12.452 4.44069C13.3981 3.46279 14.9133 2.3999 17.0318 2.3999C20.1795 2.3999 22.7664 4.92664 22.7986 8.03232C22.8277 10.742 21.8318 13.2448 19.7558 15.6815C18.7817 16.8254 17.0141 18.6542 12.9328 21.3219C12.6579 21.5024 12.333 21.5992 12.0003 21.5999Z"
        fill="#FF4949"
        stroke="#FF4949"
        strokeWidth="1.5"
      />
    </svg>
  );
}
export function FollowerIcon(props: any) {
  return (
    <svg {...props} width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M17.9164 14.8529C17.1624 14.8529 16.5196 14.5676 15.9879 13.9968C15.4562 13.426 15.1904 12.7359 15.1904 11.9265C15.1904 11.117 15.4562 10.4269 15.9879 9.85616C16.5196 9.28539 17.1624 9.00001 17.9164 9.00001C18.6704 9.00001 19.3132 9.28539 19.8449 9.85616C20.3766 10.4269 20.6424 11.117 20.6424 11.9265C20.6424 12.7359 20.3766 13.426 19.8449 13.9968C19.3132 14.5676 18.6704 14.8529 17.9164 14.8529ZM12.2324 21.7332V20.1455C12.2324 19.6058 12.3387 19.144 12.5514 18.7601C12.7641 18.3761 13.0637 18.0803 13.4504 17.8728C14.1657 17.4784 14.8907 17.1879 15.6254 17.0011C16.3601 16.8143 17.1237 16.7209 17.9164 16.7209C18.7091 16.7209 19.4727 16.8091 20.2074 16.9855C20.9421 17.1619 21.6671 17.4577 22.3824 17.8728C22.7691 18.0596 23.0687 18.3502 23.2814 18.7445C23.4941 19.1389 23.6004 19.6058 23.6004 20.1455V21.7332H12.2324ZM9.68039 11.7397C8.40439 11.7397 7.36039 11.3038 6.54839 10.4321C5.73639 9.5604 5.33039 8.43962 5.33039 7.06979C5.33039 5.69996 5.73639 4.57918 6.54839 3.70747C7.36039 2.83576 8.40439 2.3999 9.68039 2.3999C10.9564 2.3999 12.0004 2.83576 12.8124 3.70747C13.6244 4.57918 14.0304 5.69996 14.0304 7.06979C14.0304 8.43962 13.6244 9.5604 12.8124 10.4321C12.0004 11.3038 10.9564 11.7397 9.68039 11.7397ZM0.400391 21.7332V18.8068C0.400391 18.1011 0.564724 17.4525 0.893391 16.861C1.22206 16.2695 1.71506 15.818 2.37239 15.5067C3.66772 14.8841 4.90989 14.4171 6.09889 14.1058C7.28789 13.7944 8.48172 13.6388 9.68039 13.6388C10.2991 13.6388 10.8501 13.6699 11.3334 13.7322C11.8167 13.7944 12.3387 13.8878 12.8994 14.0124L12.1599 14.8062L11.4204 15.6001C11.1691 15.5586 10.8984 15.5327 10.6084 15.5223C10.3184 15.5119 10.0091 15.5067 9.68039 15.5067C8.57839 15.5067 7.50539 15.6261 6.46139 15.8647C5.41739 16.1034 4.28639 16.5445 3.06839 17.1879C2.79772 17.3332 2.57539 17.5615 2.40139 17.8728C2.22739 18.1841 2.14039 18.4954 2.14039 18.8068V19.8653H10.4924V21.7332H0.400391ZM9.68039 9.87172C10.4344 9.87172 11.0579 9.6071 11.5509 9.07784C12.0439 8.54859 12.2904 7.87924 12.2904 7.06979C12.2904 6.26034 12.0439 5.59099 11.5509 5.06174C11.0579 4.53248 10.4344 4.26786 9.68039 4.26786C8.92639 4.26786 8.30289 4.53248 7.80989 5.06174C7.31689 5.59099 7.07039 6.26034 7.07039 7.06979C7.07039 7.87924 7.31689 8.54859 7.80989 9.07784C8.30289 9.6071 8.92639 9.87172 9.68039 9.87172Z"
        fill="#0047FF"
      />
    </svg>
  );
}
export function ProjectIcon(props: any) {
  return (
    <svg {...props} width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_244_20974)">
        <path
          d="M8.23294 16.5667L9.69961 15.1L6.59961 12L9.66628 8.93333L8.19961 7.46667L3.66628 12L8.23294 16.5667ZM14.9663 16.5667L19.5329 12L14.9663 7.43333L13.4996 8.9L16.5996 12L13.4996 15.1L14.9663 16.5667ZM1.59961 24C1.06628 24 0.599609 23.8 0.199609 23.4C-0.200391 23 -0.400391 22.5333 -0.400391 22V2C-0.400391 1.46667 -0.200391 1 0.199609 0.6C0.599609 0.2 1.06628 0 1.59961 0H21.5996C22.1329 0 22.5996 0.2 22.9996 0.6C23.3996 1 23.5996 1.46667 23.5996 2V22C23.5996 22.5333 23.3996 23 22.9996 23.4C22.5996 23.8 22.1329 24 21.5996 24H1.59961ZM1.59961 22H21.5996V2H1.59961V22ZM1.59961 2V22V2Z"
          fill="#4BBA24"
        />
      </g>
      <defs>
        <clipPath id="clip0_244_20974">
          <rect width={24} height={24} fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
export function SearchIcon({ className, fill }: any) {
  return (
    <svg
      className={`cursor-pointer ${className}`}
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="13.75" cy="13.75" r="8.75" stroke="white" strokeWidth="1.5" />
      <path
        d="M13.75 10C13.2575 10 12.7699 10.097 12.3149 10.2855C11.86 10.4739 11.4466 10.7501 11.0983 11.0983C10.7501 11.4466 10.4739 11.86 10.2855 12.3149C10.097 12.7699 10 13.2575 10 13.75"
        stroke={fill || "white"}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path d="M25 25L21.25 21.25" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
export function EditIcon({ className, fill }: any) {
  return (
    <svg
      className={`cursor-pointer ${className}`}
      width="19"
      height="19"
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.5363 11.8883C17.2749 11.8883 17.0631 12.1002 17.0631 12.3615L17.0631 16.563C17.0621 17.3468 16.4272 17.9819 15.6435 17.9826L2.36599 17.9826C1.58226 17.9819 0.947321 17.3468 0.946397 16.563L0.946397 4.23196C0.947321 3.44841 1.58226 2.81329 2.36599 2.81236L6.56748 2.81236C6.82885 2.81236 7.04068 2.60053 7.04068 2.33917C7.04068 2.07798 6.82885 1.86597 6.56748 1.86597L2.36599 1.86597C1.05989 1.86745 0.00147875 2.92586 0 4.23196L0 16.5632C0.00147875 17.8693 1.05989 18.9277 2.36599 18.9292L15.6435 18.9292C16.9496 18.9277 18.008 17.8693 18.0095 16.5632L18.0095 12.3615C18.0095 12.1002 17.7976 11.8883 17.5363 11.8883Z"
        fill={fill || "white"}
      />
      <path
        d="M17.8216 0.648365C16.99 -0.183244 15.6418 -0.183244 14.8102 0.648365L6.36802 9.09052C6.31016 9.14838 6.26839 9.2201 6.24658 9.29884L5.13641 13.3068C5.09075 13.4711 5.13715 13.6471 5.25767 13.7678C5.37837 13.8883 5.55434 13.9347 5.71866 13.8892L9.72662 12.7789C9.80536 12.7571 9.87708 12.7153 9.93494 12.6574L18.3769 4.2151C19.2072 3.38293 19.2072 2.0358 18.3769 1.20363L17.8216 0.648365ZM7.39907 9.3981L14.3083 2.48866L16.5366 4.71695L9.62717 11.6264L7.39907 9.3981ZM6.95397 10.2913L8.73419 12.0717L6.27171 12.7539L6.95397 10.2913ZM17.7078 3.54597L17.2059 4.04782L14.9775 1.81935L15.4795 1.3175C15.9414 0.855574 16.6904 0.855574 17.1523 1.3175L17.7078 1.87277C18.169 2.33524 18.169 3.08367 17.7078 3.54597Z"
        fill={fill || "white"}
      />
    </svg>
  );
}

export function StarIcon(props: any) {
  return (
    <svg {...props} width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_1347_43230)">
        <g filter="url(#filter0_d_1347_43230)">
          <path
            d="M7.36799 18.2977L11.6 15.7562L15.832 18.3248L14.6999 13.5122L18.4197 10.2677L13.5138 9.83512L11.6 5.29288L9.68616 9.80808L4.78027 10.2407L8.50012 13.4851L7.36799 18.2977ZM11.6 17.6488L6.58628 20.677C6.44252 20.7671 6.28977 20.8077 6.12804 20.7987C5.96631 20.7897 5.82254 20.7401 5.69675 20.65C5.57096 20.5598 5.47661 20.4427 5.41372 20.2985C5.35082 20.1543 5.33734 19.9921 5.37329 19.8118L6.6941 14.0799L2.27341 10.2136C2.12964 10.0875 2.04428 9.94777 2.01733 9.79456C1.99037 9.64135 1.99487 9.49265 2.03081 9.34845C2.06675 9.20425 2.14761 9.08258 2.27341 8.98345C2.3992 8.88431 2.55195 8.82573 2.73165 8.8077L8.58099 8.294L10.8452 2.88657C10.9171 2.72435 11.025 2.60268 11.1687 2.52157C11.3125 2.44046 11.4562 2.3999 11.6 2.3999C11.7438 2.3999 11.8875 2.44046 12.0313 2.52157C12.1751 2.60268 12.2829 2.72435 12.3548 2.88657L14.619 8.294L20.4684 8.8077C20.6481 8.82573 20.8008 8.88431 20.9266 8.98345C21.0524 9.08258 21.1333 9.20425 21.1692 9.34845C21.2051 9.49265 21.2096 9.64135 21.1827 9.79456C21.1557 9.94777 21.0704 10.0875 20.9266 10.2136L16.5059 14.0799L17.8267 19.8118C17.8627 19.9921 17.8492 20.1543 17.7863 20.2985C17.7234 20.4427 17.629 20.5598 17.5033 20.65C17.3775 20.7401 17.2337 20.7897 17.072 20.7987C16.9102 20.8077 16.7575 20.7671 16.6137 20.677L11.6 17.6488Z"
            fill="url(#paint0_linear_1347_43230)"
          />
          <path
            d="M7.36799 18.2977L11.6 15.7562L15.832 18.3248L14.6999 13.5122L18.4197 10.2677L13.5138 9.83512L11.6 5.29288L9.68616 9.80808L4.78027 10.2407L8.50012 13.4851L7.36799 18.2977Z"
            fill="url(#paint1_linear_1347_43230)"
          />
          <path
            d="M4.88605 19.6995L4.88439 19.7068L4.88294 19.714C4.83048 19.9771 4.84515 20.2456 4.95542 20.4984C5.05374 20.7238 5.20518 20.9129 5.40555 21.0564C5.61225 21.2045 5.84832 21.2839 6.10022 21.2979C6.36875 21.3129 6.62196 21.2437 6.84795 21.1031L11.6 18.233L16.3521 21.1031C16.5781 21.2437 16.8313 21.3129 17.0998 21.2979C17.3517 21.2839 17.5878 21.2045 17.7945 21.0564C17.9948 20.9129 18.1463 20.7238 18.2446 20.4984C18.3549 20.2456 18.3695 19.9771 18.3171 19.714L18.3156 19.7068L18.3139 19.6995L17.0603 14.2593L21.2558 10.59L21.2564 10.5894C21.4655 10.4059 21.6242 10.1704 21.6751 9.8812L21.1827 9.79456L21.6751 9.8812C21.7136 9.66235 21.708 9.44281 21.6544 9.22753C21.5895 8.96718 21.4417 8.75281 21.2361 8.59074C21.0263 8.42537 20.7803 8.33648 20.5183 8.3102L20.5183 8.31016L20.5121 8.30962L14.9636 7.82234L12.816 2.69345L12.8161 2.69341L12.8119 2.68401C12.6999 2.43125 12.5216 2.22413 12.277 2.0861C12.0695 1.96903 11.8419 1.8999 11.6 1.8999C11.3581 1.8999 11.1305 1.96903 10.923 2.0861C10.6784 2.22413 10.5001 2.43125 10.3881 2.68401L10.388 2.68397L10.384 2.69345L8.23642 7.82234L2.68791 8.30962L2.6879 8.30958L2.68175 8.3102C2.41975 8.33648 2.17375 8.42537 1.96392 8.59074C1.75827 8.75281 1.61054 8.96718 1.54565 9.22752C1.49199 9.44281 1.48639 9.66235 1.52489 9.8812C1.57577 10.1704 1.7345 10.4059 1.94359 10.5894L1.94424 10.59L6.13967 14.2593L4.88605 19.6995Z"
            stroke="#E6BE66"
          />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_d_1347_43230"
          x={-4}
          y="-2.6001"
          width="31.1992"
          height="30.3999"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy={1} />
          <feGaussianBlur stdDeviation="2.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.801666 0 0 0 0 0.291667 0 0 0 1 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1347_43230" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1347_43230" result="shape" />
        </filter>
        <linearGradient id="paint0_linear_1347_43230" x1="4.86112" y1="2.21064" x2="17.852" y2="20.5589" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFEE99" />
          <stop offset={1} stopColor="#FED400" />
        </linearGradient>
        <linearGradient id="paint1_linear_1347_43230" x1="4.86112" y1="2.21064" x2="17.852" y2="20.5589" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFEE99" />
          <stop offset={1} stopColor="#FED400" />
        </linearGradient>
        <clipPath id="clip0_1347_43230">
          <rect width={24} height={24} fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export const UploadProjectIcon = (props: any) => {
  return (
    <svg width="16" height="20" {...props} viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7.3 11.925V16.2C7.3 16.4167 7.37083 16.5958 7.5125 16.7375C7.65417 16.8792 7.83334 16.95 8.05 16.95C8.26667 16.95 8.44584 16.8792 8.5875 16.7375C8.72917 16.5958 8.8 16.4167 8.8 16.2V11.925L10.325 13.45C10.375 13.5 10.5 13.4833 10.7 13.4C10.9 13.3167 11.0875 13.2417 11.2625 13.175C11.4375 13.1083 11.5583 13.0792 11.625 13.0875C11.6917 13.0958 11.6083 13.2167 11.375 13.45C11.525 13.3 11.5958 13.125 11.5875 12.925C11.5792 12.725 11.5 12.55 11.35 12.4L8.525 9.65C8.44167 9.56667 8.35833 9.50833 8.275 9.475C8.19167 9.44167 8.1 9.425 8 9.425C7.9 9.425 7.80834 9.44167 7.725 9.475C7.64167 9.50833 7.55834 9.56667 7.475 9.65L4.675 12.45C4.525 12.6 4.45 12.775 4.45 12.975C4.45 13.175 4.525 13.35 4.675 13.5C4.825 13.65 5 13.725 5.2 13.725C5.4 13.725 5.575 13.65 5.725 13.5L7.3 11.925ZM1.5 20C1.1 20 0.75 19.85 0.45 19.55C0.15 19.25 0 18.9 0 18.5V1.5C0 1.1 0.15 0.75 0.45 0.45C0.75 0.15 1.1 0 1.5 0H9.9C10.1 0 10.2958 0.0416667 10.4875 0.125C10.6792 0.208333 10.8417 0.316667 10.975 0.45L15.55 5.025C15.6833 5.15833 15.7917 5.32083 15.875 5.5125C15.9583 5.70417 16 5.9 16 6.1V18.5C16 18.9 15.85 19.25 15.55 19.55C15.25 19.85 14.9 20 14.5 20H1.5ZM9.775 5.4V1.5H1.5V18.5H14.5V6.15H10.525C10.3083 6.15 10.1292 6.07917 9.9875 5.9375C9.84584 5.79583 9.775 5.61667 9.775 5.4Z"
        fill="#4BBA24"
      />
    </svg>
  );
};