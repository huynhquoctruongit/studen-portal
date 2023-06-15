import { ArrowIcon, FbIcon, YoutubeIcon, CallIcon, MailIcon } from "../../../public/images/svg/index";
const Footer = () => {
  return (
    <div>
      <div className="bg-blue text-white rounded-tr-[40px] rounded-tl-[40px]">
        <div className="flex flex-col xl:flex-row xl:flex-nowrap flex-wrap justify-between pt-[100px] pb-[70px] px-5 lg:px-0 mx-1 lg:mx-[140px]">
          <div>
            <img src="/images/footer/logo-footer.svg" className="w-[362px]" />
            <div className="flex items-center mt-[30px] mb-[18px]">
              <p className="mr-[18px] text-[16px] font-bold ">Theo dõi chúng tôi tại: </p>
              <a target="_blank" rel="noreferrer" href="https://www.facebook.com/ICANTECH.DaoTaoCongNgheVaLapTrinh/">
                <FbIcon className="mr-[18px]" />
              </a>
              <a target="_blank" rel="noreferrer" href="https://www.youtube.com/@icantech9757">
                <YoutubeIcon />
              </a>
            </div>
            <p className="text-[13px]">Đăng kí để nhận tin mới nhất từ chúng tôi</p>
            <div className="relative mt-[10px]">
              <input
                type="text"
                className="input-footer focus-visible:outline-none bg-[#2F80ED] px-[12px] py-[9px] rounded-[5px] text-white w-full"
                placeholder="Email của bạn"
              />
              <div className="absolute right-[4px] top-[4px] bg-white px-[13px] py-[10px] rounded-[2px]">
                <ArrowIcon />
              </div>
            </div>
          </div>
          <div className="lg:mx-[127px] mt-[40px]">
            <a href="mailto:icantech.tvts@ican.vn">
              <div className="flex items-center mb-[14px]">
                <div className="bg-white p-[20px] w-fit rounded-full mr-[10px]">
                  <MailIcon />
                </div>
                <p>icantech.tvts@ican.vn</p>
              </div>
            </a>
            <p className="text-title mb-[2px]">Văn phòng Hà Nội</p>
            <p>Tòa nhà 25T2 Hoàng Đạo Thúy, Trung Hòa, Quận Cầu Giấy, Hà Nội</p>
          </div>
          <div className="mt-[40px]">
            <a href="tel:0902 228 562">
              <div className="flex items-center mb-[14px]">
                <div className="bg-pink-light p-[20px] w-fit rounded-full mr-[10px]">
                  <CallIcon />
                </div>
                <p>0902 228 562</p>
              </div>
            </a>
            <p className="text-title mb-[2px]">Văn phòng Hồ Chí Minh</p>
            <p>B0003 C/C Sarina, Khu đô thị Sala, Khu phố 3,</p>
            <p> Đường Hoàng Thế Thiện, phường An Lợi Đông, TP. Thủ Đức</p>
          </div>
        </div>
      </div>
      <div className="w-full h-[50px] bg-pink text-center text-white flex items-center justify-center md:p-0 py-[12px]">
        <p>ICANTECH © 2022, All Rights Reserved</p>
      </div>
    </div>
  );
};
export default Footer;
