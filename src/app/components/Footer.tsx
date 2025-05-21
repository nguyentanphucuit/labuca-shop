// import ExportedImage from "next-image-export-optimizer";
import React from "react";
// import logo from "/public/assets/img/labuca-logo.png";
const contactInfo = [
  {
    name: "Địa chỉ",
    link: "152 Lý Thường Kiệt, P. Thành Công, Tp. Buôn Ma Thuột, tỉnh Đắk Lắk",
    href: "https://maps.app.goo.gl/KjnnaNFcaqDcQWDa7",
  },
  {
    name: "Số điện thoại",
    link: "0905 075 588",
    href: "https://zalo.me/0905075588",
  },
];
const contactInfo1 = [
  {
    name: "facebook",
    link: "https://www.facebook.com/profile.php?id=100063755854074&mibextid=LQQJ4d",
  },
  {
    name: "shopee",
    link: "https://shopee.vn/labuca_bmt",
  },
  {
    name: "tiktok",
    link: "https://www.tiktok.com/@labuca7979",
  },
  {
    name: "zalo",
    link: "https://zalo.me/0905075588",
  },
];

const Footer = () => {
  return (
    <footer className=" bottom-0 left-0 right-0 bg-white dark:bg-gray-900">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            {/* <a href="https://flowbite.com/" className="flex items-center">
                <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 me-3" alt="FlowBite Logo" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
            </a> */}
            {/* <ExportedImage
              className="h-12 w-24"
              alt="labuca button"
              src={logo}></ExportedImage> */}
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-4">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Thông tin liên hệ
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                {contactInfo.map((item, index) => (
                  <li key={index} className="mb-4">
                    <a
                      target="_blank"
                      href={item.href}
                      className="hover:underline">
                      {item.name} : {item.link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Thông tin về chúng tôi
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                {contactInfo1.map((item, index) => (
                  <li key={index} className="mb-4 capitalize">
                    <a
                      target="_blank"
                      href={item.link}
                      className="hover:underline">
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Chính sách
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <a href="/policy" className="hover:underline">
                    Chính sách bảo mật
                  </a>
                </li>
                <li>
                  <a href="/policy" className="hover:underline">
                    Điều khoản & Điều kiện
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2025{" "}
            <a href="https://labuca.vn" className="hover:underline">
              Labuca
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
