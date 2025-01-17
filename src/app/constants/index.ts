import image1 from "../../../public/assets/img/image1.jpg";
import image2 from "../../../public/assets/img/image2.jpg";
import image3 from "../../../public/assets/img/image3.jpg";
import image4 from "../../../public/assets/img/image4.jpg";
import image5 from "../../../public/assets/img/image5.jpg";
import image6 from "../../../public/assets/img/image6.jpg";
import image7 from "../../../public/assets/img/image7.jpg";
import image8 from "../../../public/assets/img/image8.jpg";
import image9 from "../../../public/assets/img/image9.jpg";
import image10 from "../../../public/assets/img/image10.jpg";
import image11 from "../../../public/assets/img/image11.jpg";
import image12 from "../../../public/assets/img/image12.jpg";
import image13 from "../../../public/assets/img/image13.jpg";
import image14 from "../../../public/assets/img/image14.jpg";
import image15 from "../../../public/assets/img/image15.jpg";
import image16 from "../../../public/assets/img/image16.jpg";
import image17 from "../../../public/assets/img/image17.jpg";
import image18 from "../../../public/assets/img/image18.jpg";
import image19 from "../../../public/assets/img/image19.jpg";
import image20 from "../../../public/assets/img/image20.jpg";
import imgE144 from "../../../public/assets/img/E140-den9.jpg";
import imgE156 from "../../../public/assets/img/E156-den4.jpg";
import imgE157 from "../../../public/assets/img/E157-T-1.jpg";
import imgE121 from "../../../public/assets/img/E121-tt2.jpg";

const sourcesPerPage = 4;

const emptyProduct = {
  id: "",
  code: "",
  title: "",
  subtitle: "",
  content: "",
  type: "",
  date: "",
  image: "",
  href: "",
  price: 0,
  discount: 0,
};

const ListItems = [
  {
    id: 1,
    code: "E144",
    title: "Giày Sandal Nữ 7cm Thời Trang LABUCA",
    subtitle: "Thiết kế năng động, thoải mái",
    type: "Giày Đế Xuồng",
    href: "products/1",
    content:
      "Giày Sandal Nữ 7cm Thời Trang LABUCA Gót Trụ Quai Đính Khóa Vuông Cao Cấp E144  Mã sản phẩm: E144 Kiểu dáng: Giày xăng đan Chất liệu: Da tổng hợp Độ cao: 7cm  Thiết kế sandal trẻ trung với quai ngang ôm phom, gót sơn bền màu và chắc chân, quai hậu chun cực tiện không cần cài, thiết kế quai da bọc phần chun rất là tỉ mỉ và tinh tế.  Chất liệu da tổng hợp cao cấp, bền đẹp dễ vệ sinh Gót vuông cao 7cm cùng rãnh chống trượt cho bước chân thoải mái, tự tin",
    date: "2024-12-01",
    color: "Đen, Nâu Kem",
    size: "35, 36, 37, 38, 39",
    image: imgE144,
    link: "#",
    price: 1200000,
    discount: 10,
  },
  {
    id: 2,
    code: "E156",
    title: "Giày xăng đan/sling back",
    subtitle: "Thiết kế năng động, thoải mái",
    type: "Giày Sandal",
    href: "products/1",
    content:
      "Kiểu dáng: Giày xăng đan/sling back Chất liệu: Da satin Độ cao: 5cm Xuất xứ: Việt Nam Thiết kế sandal trẻ trung với quai đính khóa trẻ trung và chắc chân, quai chun kéo rất tiện Chất liệu da tổng hợp cao cấp, bền đẹp dễ vệ sinh Gót vuông cao 5cm cùng rãnh chống trượt cho bước chân thoải mái, tự tin",
    date: "2024-12-01",
    color: "Đen",
    size: "35, 36, 37, 38, 39",
    image: imgE156,
    link: "#",
    price: 1200000,
    discount: 10,
  },
  {
    id: 3,
    code: "E157",
    title: "Dép Nữ Đế Bệt",
    subtitle: "Thiết kế năng động, thoải mái",
    type: "Dép",
    href: "products/1",
    content:
      "Dép Nữ Đế Bệt – Siêu Êm, Siêu Phong Cách Chiều Cao : Đế Bệt 🌟 Chất liệu cao cấp: mang lại độ bền vượt trội và vẻ đẹp tự nhiên, sang trọng. Bề mặt da mềm mại, dễ vệ sinh, và càng sử dụng càng bóng đẹp theo thời gian. 🌟 Thiết kế tiện lợi: Kiểu dáng đính khoá quai trẻ trung giúp bạn dễ dàng xỏ vào hoặc tháo ra trong tích tắc, phù hợp với những người bận rộn hoặc ưa thích sự tiện nghi. 🌟 Phong cách đa năng: Phù hợp để đi làm, đi chơi hay dạo phố. Dễ dàng kết hợp với quần jeans, váy midi hoặc trang phục công sở để tạo nên phong cách thanh lịch nhưng không kém phần năng động.",
    date: "2024-12-01",
    color: "Đen, Trắng, Nâu",
    size: "35, 36, 37, 38, 39",
    image: imgE157,
    link: "#",
    price: 1200000,
    discount: 10,
  },
  {
    id: 4,
    code: "E121",
    title: "Giày Búp Bê",
    subtitle: "Thiết kế năng động, thoải mái",
    type: "Giày Búp Bê",
    href: "products/1",
    content:
      "Giày Slip-On Da Bò Thật Đế Bệt – Siêu Êm, Siêu Phong Cách Chiều Cao : Đế Bệt  🌟 Chất liệu cao cấp: mang lại độ bền vượt trội và vẻ đẹp tự nhiên, sang trọng. Bề mặt da mềm mại, dễ vệ sinh, và càng sử dụng càng bóng đẹp theo thời gian.  🌟 Thiết kế tiện lợi: Kiểu dáng slip-on không dây giúp bạn dễ dàng xỏ vào hoặc tháo ra trong tích tắc, phù hợp với những người bận rộn hoặc ưa thích sự tiện nghi.  🌟 Đế bệt siêu êm: Đế giày được làm từ chất liệu cao su mềm, có độ đàn hồi cao, hỗ trợ tốt cho bàn chân. Lót giày êm ái, chống trơn trượt, giúp bạn thoải mái di chuyển cả ngày dài mà không lo đau chân. 🌟 Phong cách đa năng: Phù hợp để đi làm, đi chơi hay dạo phố. Dễ dàng kết hợp với quần jeans, váy midi hoặc trang phục công sở để tạo nên phong cách thanh lịch nhưng không kém phần năng động.",
    date: "2024-12-01",
    color: "Đen, Trắng, Nâu",
    size: "35, 36, 37, 38, 39",
    image: imgE121,
    link: "#",
    price: 1200000,
    discount: 10,
  },
];

const listHighHeels = [
  {
    id: 1,
    title: "Giày Cao Gót Da Lộn Màu Đỏ",
    subtitle: "Kiểu dáng thanh thoát, dễ dàng phối đồ",
    type: "HIGH HEEL",
    price: 2500000,
    discount: 10,
    image: image1,
  },
  {
    id: 2,
    title: "Giày Cao Gót Mũi Nhọn Da",
    subtitle: "Cổ điển và sang trọng cho các dịp lễ",
    type: "HIGH HEEL",
    price: 3200000,
    discount: 15,
    image: image2,
  },
  {
    id: 3,
    title: "Giày Cao Gót Đính Đá Swarovski",
    subtitle: "Sự lựa chọn hoàn hảo cho tiệc đêm",
    type: "HIGH HEEL",
    price: 4500000,
    discount: 20,
    image: image3,
  },
  {
    id: 4,
    title: "Giày Cao Gót Đế Bằng Cổ Điển",
    subtitle: "Sang trọng và dễ sử dụng trong mọi hoàn cảnh",
    type: "HIGH HEEL",
    price: 2700000,
    discount: 5,
    image: image4,
  },
  {
    id: 5,
    title: "Giày Cao Gót Quai Mảnh Da Lộn",
    subtitle: "Kiểu dáng tinh tế, phù hợp mọi phong cách",
    type: "HIGH HEEL",
    price: 3500000,
    discount: 25,
    image: image5,
  },
  {
    id: 6,
    title: "Giày Cao Gót Kim Loại Màu Vàng",
    subtitle: "Phong cách mạnh mẽ, nổi bật với chất liệu kim loại",
    type: "HIGH HEEL",
    price: 3900000,
    discount: 12,
    image: image6,
  },
  {
    id: 7,
    title: "Giày Cao Gót Cao Cấp Da Bò",
    subtitle: "Chất liệu da bò mềm mại và bền bỉ",
    type: "HIGH HEEL",
    price: 5000000,
    discount: 15,
    image: image7,
  },
  {
    id: 8,
    title: "Giày Cao Gót Kim Loại Mạ Vàng",
    subtitle: "Phong cách sang trọng với mạ vàng tinh tế",
    type: "HIGH HEEL",
    price: 4500000,
    discount: 10,
    image: image8,
  },
  {
    id: 9,
    title: "Giày Cao Gót Đen Mũi Nhọn",
    subtitle: "Đơn giản, thanh lịch, dễ dàng kết hợp với mọi trang phục",
    type: "HIGH HEEL",
    price: 2800000,
    discount: 18,
    image: image9,
  },
  {
    id: 10,
    title: "Giày Cao Gót Màu Hồng Phấn",
    subtitle: "Dịu dàng và nữ tính với màu sắc nhẹ nhàng",
    type: "HIGH HEEL",
    price: 3200000,
    discount: 10,
    image: image10,
  },
  {
    id: 11,
    title: "Giày Cao Gót Cổ Điển Màu Đen",
    subtitle: "Lựa chọn tuyệt vời cho công sở và sự kiện",
    type: "HIGH HEEL",
    price: 2800000,
    discount: 10,
    image: image11,
  },
  {
    id: 12,
    title: "Giày Cao Gót Mũi Vuông Da Màu Nâu",
    subtitle: "Chắc chắn và thoải mái với thiết kế mũi vuông",
    type: "HIGH HEEL",
    price: 3500000,
    discount: 8,
    image: image12,
  },
  {
    id: 13,
    title: "Giày Cao Gót Thời Trang Màu Xám",
    subtitle: "Dành cho những cô nàng yêu thích sự khác biệt",
    type: "HIGH HEEL",
    price: 4000000,
    discount: 20,
    image: image13,
  },
  {
    id: 14,
    title: "Giày Cao Gót Đính Hoa Vải",
    subtitle: "Thiết kế nhẹ nhàng và tinh tế cho các buổi tiệc",
    type: "HIGH HEEL",
    price: 3800000,
    discount: 12,
    image: image14,
  },
  {
    id: 15,
    title: "Giày Cao Gót Đế Xuồng Màu Đen",
    subtitle: "Đế xuồng giúp tăng thêm sự thoải mái khi di chuyển",
    type: "HIGH HEEL",
    price: 4200000,
    discount: 18,
    image: image15,
  },
  {
    id: 16,
    title: "Giày Cao Gót Màu Vàng Mới Lạ",
    subtitle: "Chất liệu da mềm mại và bóng bẩy",
    type: "HIGH HEEL",
    price: 4500000,
    discount: 10,
    image: image16,
  },
  {
    id: 17,
    title: "Giày Cao Gót Xỏ Ngón Màu Hồng",
    subtitle: "Sự kết hợp hoàn hảo giữa phong cách hiện đại và cổ điển",
    type: "HIGH HEEL",
    price: 4000000,
    discount: 5,
    image: image17,
  },
  {
    id: 18,
    title: "Giày Cao Gót Mũi Nhọn Màu Đỏ Rượu",
    subtitle: "Màu sắc sang trọng cho mọi dịp đặc biệt",
    type: "HIGH HEEL",
    price: 3300000,
    discount: 15,
    image: image18,
  },
  {
    id: 19,
    title: "Giày Cao Gót Cổ Điển Đen Mới",
    subtitle: "Một sự lựa chọn tối giản nhưng không kém phần nổi bật",
    type: "HIGH HEEL",
    price: 2600000,
    discount: 10,
    image: image19,
  },
  {
    id: 20,
    title: "Giày Cao Gót Xinh Xắn Màu Be",
    subtitle: "Dễ dàng kết hợp với nhiều bộ trang phục khác nhau",
    type: "HIGH HEEL",
    price: 2900000,
    discount: 12,
    image: image20,
  },
];

export { ListItems, sourcesPerPage, listHighHeels, emptyProduct };
