// import ExportedImage from "next-image-export-optimizer";
import { ArrowRight, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logo from "/public/assets/img/labuca-logo.png";
const contactInfo = [
  {
    name: "Địa chỉ",
    link: "152 Lý Thường Kiệt, P. Thành Công, Tp. Buôn Ma Thuột, tỉnh Đắk Lắk",
    href: "https://maps.app.goo.gl/KjnnaNFcaqDcQWDa7",
    icon: MapPin,
  },
  {
    name: "Số điện thoại",
    link: "0905 075 588",
    href: "https://zalo.me/0905075588",
    icon: Phone,
  },
];

const socialLinks = [
  {
    name: "Facebook",
    link: "https://www.facebook.com/profile.php?id=100063755854074&mibextid=LQQJ4d",
    img: "/assets/img/facebook-icon.png",
  },
  {
    name: "Shopee",
    link: "https://shopee.vn/labuca_bmt",
    img: "/assets/img/shopee.png",
  },
  {
    name: "TikTok",
    link: "https://www.tiktok.com/@labuca7979",
    img: "/assets/img/tiktok.svg",
  },
  {
    name: "Zalo",
    link: "https://zalo.me/0905075588",
    img: "/assets/img/zalo.png",
  },
];

const Footer = () => {
  return (
    <footer className="footer bg-white border-t">
      <div className="mx-auto max-w-screen-xl px-4 pb-6 pt-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Brand Section */}
          <div className="">
            <div className="flex items-center">
              <Image
                src={logo}
                alt="Labuca Logo"
                width={120}
                height={40}
                className="object-contain"
              />
            </div>

            <p className="mt-6 max-w-md text-center leading-relaxed text-gray-600 sm:max-w-xs sm:text-left">
              Chuyên cung cấp các sản phẩm giày dép chất lượng cao với giá cả hợp lý.
            </p>

            <ul className="mt-8 flex justify-center gap-6 sm:justify-start md:gap-8">
              {socialLinks.map((social) => (
                <li key={social.name}>
                  <Link
                    href={social.link}
                    rel="noreferrer"
                    target="_blank"
                    className="text-gray-700 transition hover:text-gray-700/75"
                  >
                    <span className="sr-only">{social.name}</span>
                    <Image src={social.img} width={48} height={48} alt={social.name} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:col-span-2">
            <div className="text-center sm:text-left">
              <p className="text-lg font-medium text-gray-900">Liên Hệ</p>
              <ul className="mt-8 space-y-4 text-sm">
                {contactInfo.map((item) => (
                  <li key={item.name}>
                    <a
                      className="flex items-center justify-center gap-1.5 sm:justify-start"
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <div className="flex flex-row items-center gap-4">
                        <div className="flex items-center justify-center w-6 h-6">
                          <item.icon className="text-gray-900" />
                        </div>
                        <span className="text-gray-700">{item.link}</span>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <p className="text-lg font-medium text-gray-900">Chính Sách</p>
              <ul className="mt-8 space-y-4 text-sm">
                <li>
                  <Link href="/policy" className="text-gray-700 transition hover:text-gray-700/75">
                    Chính sách bảo mật
                  </Link>
                </li>
                <li>
                  <Link href="/policy" className="text-gray-700 transition hover:text-gray-700/75">
                    Điều khoản & Điều kiện
                  </Link>
                </li>
                <li>
                  <Link href="/policy" className="text-gray-700 transition hover:text-gray-700/75">
                    Chính sách đổi trả
                  </Link>
                </li>
                <li>
                  <Link href="/policy" className="text-gray-700 transition hover:text-gray-700/75">
                    Chính sách vận chuyển
                  </Link>
                </li>
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <p className="text-lg font-medium text-gray-900">Đăng Ký</p>
              <div className="mx-auto mt-8 max-w-md sm:ms-0">
                <p className="text-sm leading-relaxed text-gray-500">
                  Đăng ký để nhận thông tin về sản phẩm mới và khuyến mãi
                </p>

                <form className="mt-4">
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <input
                      type="email"
                      placeholder="Nhập email của bạn"
                      className="w-full rounded-md border-gray-200 px-3 py-2 text-sm"
                    />

                    <button
                      type="submit"
                      className="block rounded bg-black px-6 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
                    >
                      <ArrowRight className="h-6 w-6" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-100 pt-6">
          <div className="text-center sm:flex sm:justify-between sm:text-left">
            <p className="text-sm text-gray-500">
              <span className="block sm:inline">© 2025 Labuca. </span>
              <span className="inline-block">Copy right by Labuca</span>
            </p>

            <p className="mt-4 text-sm text-gray-500 sm:order-first sm:mt-0">
              Thiết kế và phát triển bởi Labuca Team
            </p>
          </div>

          {/* Business Information */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="text-center">
              <div className="text-sm text-gray-500 space-y-1">
                <p>
                  <strong>Chủ thể kinh doanh:</strong> Hộ kinh doanh Labuca
                </p>
                <p>
                  <strong>Mã số hộ kinh doanh:</strong> 8333565723-001
                </p>
                <p>
                  <strong>Email:</strong> hoaithuong0500@gmail.com
                </p>
              </div>

              {/* Ministry of Industry and Trade Image - Hidden */}
              {/* <div className="mt-4 flex justify-center">
                <Image
                  src="/images/logo-da-thong-bao-bo-cong-thuong.webp"
                  alt="Đã thông báo Bộ Công Thương"
                  width={150}
                  height={80}
                  className="object-contain filter-none"
                  priority
                />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
