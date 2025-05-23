import React from "react";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Về Chúng Tôi | Labuca - Giày Dép và Túi xách nữ thời trang",
  description: "Labuca - Chuyên cung cấp giày dép và túi xách nữ thời trang chất lượng cao với giá cả hợp lý. Địa chỉ: 152 Lý Thường Kiệt, P. Thành Công, Tp. Buôn Ma Thuột.",
  openGraph: {
    title: "Về Chúng Tôi | Labuca - Giày Dép và Túi xách nữ thời trang",
    description: "Labuca - Chuyên cung cấp giày dép và túi xách nữ thời trang chất lượng cao với giá cả hợp lý. Địa chỉ: 152 Lý Thường Kiệt, P. Thành Công, Tp. Buôn Ma Thuột.",
    url: "https://labuca.vn/aboutUs",
    siteName: "Labuca",
    locale: "vi_VN",
    type: "website",
  },
  alternates: {
    canonical: "https://labuca.vn/aboutUs",
  },
};

const AboutUs = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative w-full aspect-[16/8]">
        <Image
          src="/assets/img/labuca-summer.jpg"
          alt="Labuca - Về Chúng Tôi"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          quality={100}
          className="object-cover brightness-50"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">Về Chúng Tôi</h1>
            <p className="text-lg lg:text-xl max-w-2xl mx-auto px-4">
              Chuyên cung cấp các sản phẩm giày dép chất lượng cao với giá cả hợp lý
            </p>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl font-bold mb-6 relative inline-block after:content-[''] after:absolute after:w-1/2 after:h-1 after:bg-black after:bottom-0 after:left-0 pb-4">
                Câu Chuyện Của Chúng Tôi
              </h2>
              <div className="space-y-6">
                <p className="text-gray-600 leading-relaxed">
                  Labuca được thành lập với sứ mệnh mang đến những sản phẩm giày dép chất lượng cao với giá cả phải chăng cho người tiêu dùng Việt Nam.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Chúng tôi tin rằng mỗi bước chân đều xứng đáng được nâng niu và chăm sóc với những sản phẩm tốt nhất.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Với hơn nhiều năm kinh nghiệm trong ngành, chúng tôi tự hào là đối tác tin cậy của hàng nghìn khách hàng.
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/3] w-full max-w-[600px] mx-auto order-1 lg:order-2 transform hover:scale-105 transition-transform duration-300">
              <Image
                src="/assets/img/about-story.jpg"
                alt="Labuca - Câu Chuyện Của Chúng Tôi"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={100}
                className="object-cover rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 bg-neutral-50">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16 relative inline-block after:content-[''] after:absolute after:w-24 after:h-1 after:bg-black after:bottom-0 after:left-1/2 after:-translate-x-1/2 pb-4 mx-auto block">
            Giá Trị Cốt Lõi Của Labuca
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-500 rounded-full flex items-center justify-center mb-6 mx-auto transform hover:rotate-12 transition-all duration-300 hover:scale-110">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-center">Chất Lượng</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Cam kết mang đến những sản phẩm chất lượng cao, được chọn lọc kỹ lưỡng từ Labuca.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-6 mx-auto transform hover:rotate-12 transition-all duration-300 hover:scale-110">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-center">Giá Cả Hợp Lý</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Mang đến những sản phẩm với mức giá tốt nhất cho khách hàng.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-500 rounded-full flex items-center justify-center mb-6 mx-auto transform hover:rotate-12 transition-all duration-300 hover:scale-110">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-center">Dịch Vụ Tận Tâm</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Luôn lắng nghe và hỗ trợ khách hàng một cách nhiệt tình nhất.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Liên Hệ Với Labuca</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <MapPin className="w-8 h-8 mx-auto mb-4 text-black" />
              <h3 className="font-semibold mb-2">Địa Chỉ</h3>
              <p className="text-gray-600">152 Lý Thường Kiệt, P. Thành Công, Tp. Buôn Ma Thuột, tỉnh Đắk Lắk</p>
            </div>
            <div className="text-center">
              <Phone className="w-8 h-8 mx-auto mb-4 text-black" />
              <h3 className="font-semibold mb-2">Điện Thoại</h3>
              <p className="text-gray-600">0905 075 588</p>
            </div>
            <div className="text-center">
              <Mail className="w-8 h-8 mx-auto mb-4 text-black" />
              <h3 className="font-semibold mb-2">Email</h3>
              <p className="text-gray-600">contact@labuca.vn</p>
            </div>
            <div className="text-center">
              <Clock className="w-8 h-8 mx-auto mb-4 text-black" />
              <h3 className="font-semibold mb-2">Giờ Làm Việc</h3>
              <p className="text-gray-600">T2 - CN: 8:00 - 22:00</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
