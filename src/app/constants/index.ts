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
  color: "",
  size: "",
  imageUrl: "",
  href: "",
  price: 0,
  discount: 0,
};

const listType = [
  { id: 1, name: "Giày Sandal" },
  { id: 2, name: "Giày Đế Xuồng" },
  { id: 3, name: "Dép" },
  { id: 4, name: "Giày Búp Bê" },
];

const listItem = [
  {
    id: "1",
    code: "E144",
    title: "Giày Sandal Nữ 7cm Thời Trang LABUCA",
    subtitle: "Thiết kế năng động, thoải mái",
    type: listType[0].name,
    href: "products/1",
    content:
      "Giày Sandal Nữ 7cm Thời Trang LABUCA Gót Trụ Quai Đính Khóa Vuông Cao Cấp E144  Mã sản phẩm: E144 Kiểu dáng: Giày xăng đan Chất liệu: Da tổng hợp Độ cao: 7cm  Thiết kế sandal trẻ trung với quai ngang ôm phom, gót sơn bền màu và chắc chân, quai hậu chun cực tiện không cần cài, thiết kế quai da bọc phần chun rất là tỉ mỉ và tinh tế.  Chất liệu da tổng hợp cao cấp, bền đẹp dễ vệ sinh Gót vuông cao 7cm cùng rãnh chống trượt cho bước chân thoải mái, tự tin",
    date: "2024-12-01",
    color: "Đen, Nâu Kem",
    size: "35, 36, 37, 38, 39",
    imageUrl:
      "https://res.cloudinary.com/dfgp67riy/image/upload/v1737396380/E140-den1_yvkxyg.jpg",
    link: "#",
    price: 1200000,
    discount: 10,
  },
  {
    id: "2",
    code: "E156",
    title: "Giày xăng đan/sling back",
    subtitle: "Thiết kế năng động, thoải mái",
    type: listType[1].name,
    href: "products/1",
    content:
      "Kiểu dáng: Giày xăng đan/sling back Chất liệu: Da satin Độ cao: 5cm Xuất xứ: Việt Nam Thiết kế sandal trẻ trung với quai đính khóa trẻ trung và chắc chân, quai chun kéo rất tiện Chất liệu da tổng hợp cao cấp, bền đẹp dễ vệ sinh Gót vuông cao 5cm cùng rãnh chống trượt cho bước chân thoải mái, tự tin",
    date: "2024-12-01",
    color: "Đen",
    size: "35, 36, 37, 38, 39",
    imageUrl:
      "https://res.cloudinary.com/dfgp67riy/image/upload/v1737396396/E156-den4_tennym.jpg",
    link: "#",
    price: 1200000,
    discount: 10,
  },
  {
    id: "3",
    code: "E157",
    title: "Dép Nữ Đế Bệt",
    subtitle: "Thiết kế năng động, thoải mái",
    type: listType[2].name,
    href: "products/1",
    content:
      "Dép Nữ Đế Bệt – Siêu Êm, Siêu Phong Cách Chiều Cao : Đế Bệt 🌟 Chất liệu cao cấp: mang lại độ bền vượt trội và vẻ đẹp tự nhiên, sang trọng. Bề mặt da mềm mại, dễ vệ sinh, và càng sử dụng càng bóng đẹp theo thời gian. 🌟 Thiết kế tiện lợi: Kiểu dáng đính khoá quai trẻ trung giúp bạn dễ dàng xỏ vào hoặc tháo ra trong tích tắc, phù hợp với những người bận rộn hoặc ưa thích sự tiện nghi. 🌟 Phong cách đa năng: Phù hợp để đi làm, đi chơi hay dạo phố. Dễ dàng kết hợp với quần jeans, váy midi hoặc trang phục công sở để tạo nên phong cách thanh lịch nhưng không kém phần năng động.",
    date: "2024-12-01",
    color: "Đen, Trắng, Nâu",
    size: "35, 36, 37, 38, 39",
    imageUrl:
      "https://res.cloudinary.com/dfgp67riy/image/upload/v1737396409/E157-T-1_bjpirj.jpg",
    link: "#",
    price: 1200000,
    discount: 10,
  },
  {
    id: "4",
    code: "E121",
    title: listType[3].name,
    subtitle: "Thiết kế năng động, thoải mái",
    type: listType[3].name,
    href: "products/1",
    content:
      "Giày Slip-On Da Bò Thật Đế Bệt – Siêu Êm, Siêu Phong Cách Chiều Cao : Đế Bệt  🌟 Chất liệu cao cấp: mang lại độ bền vượt trội và vẻ đẹp tự nhiên, sang trọng. Bề mặt da mềm mại, dễ vệ sinh, và càng sử dụng càng bóng đẹp theo thời gian.  🌟 Thiết kế tiện lợi: Kiểu dáng slip-on không dây giúp bạn dễ dàng xỏ vào hoặc tháo ra trong tích tắc, phù hợp với những người bận rộn hoặc ưa thích sự tiện nghi.  🌟 Đế bệt siêu êm: Đế giày được làm từ chất liệu cao su mềm, có độ đàn hồi cao, hỗ trợ tốt cho bàn chân. Lót giày êm ái, chống trơn trượt, giúp bạn thoải mái di chuyển cả ngày dài mà không lo đau chân. 🌟 Phong cách đa năng: Phù hợp để đi làm, đi chơi hay dạo phố. Dễ dàng kết hợp với quần jeans, váy midi hoặc trang phục công sở để tạo nên phong cách thanh lịch nhưng không kém phần năng động.",
    date: "2024-12-01",
    color: "Đen, Trắng, Nâu",
    size: "35, 36, 37, 38, 39",
    imageUrl:
      "https://res.cloudinary.com/dfgp67riy/image/upload/v1737396431/E121-tt2_fyoo7y.jpg",
    link: "#",
    price: 1200000,
    discount: 10,
  },
];

export { listItem, listType, sourcesPerPage, emptyProduct };
