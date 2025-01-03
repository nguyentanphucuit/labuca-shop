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

const sourcesPerPage = 4;

const ListItems = [
  {
    id: 1,
    title: "Giày Thể Thao Nam 2024",
    subtitle: "Thiết kế năng động, thoải mái",
    type: "SHOE",
    date: "2024-12-01",
    image: image1,
    link: "#",
    price: 1200000,
    discount: 10,
  },
  {
    id: 2,
    title: "Giày Cao Gót Nữ Sang Trọng",
    subtitle: "Phù hợp cho các buổi dạ tiệc",
    type: "SHOE",
    date: "2024-12-01",
    image: image2,
    link: "#",
    price: 1500000,
    discount: 15,
  },
  {
    id: 3,
    title: "Giày Sneaker Phong Cách Retro",
    subtitle: "Thời trang và bền bỉ",
    type: "SHOE",
    date: "2024-12-01",
    image: image3,
    link: "#",
    price: 1100000,
    discount: 5,
  },
  {
    id: 4,
    title: "Giày Sandal Da Cao Cấp",
    subtitle: "Phù hợp với mùa hè",
    type: "SHOE",
    date: "2024-12-01",
    image: image4,
    link: "#",
    price: 900000,
    discount: 20,
  },
  {
    id: 5,
    title: "Giày Tây Nam Công Sở",
    subtitle: "Lịch lãm và đẳng cấp",
    type: "SHOE",
    date: "2024-12-01",
    image: image5,
    link: "#",
    price: 2000000,
    discount: 10,
  },
  {
    id: 6,
    title: "Giày Lười Da Bò",
    subtitle: "Thoải mái và tiện lợi",
    type: "SHOE",
    date: "2024-12-01",
    image: image6,
    link: "#",
    price: 1400000,
    discount: 12,
  },
  {
    id: 7,
    title: "Giày Chạy Bộ Hiệu Năng Cao",
    subtitle: "Nhẹ, thoáng khí và bền",
    type: "SHOE",
    date: "2024-12-01",
    image: image7,
    link: "#",
    price: 1000000,
    discount: 18,
  },
  {
    id: 8,
    title: "Boots Cổ Cao Phong Cách Streetwear",
    subtitle: "Cá tính và nổi bật",
    type: "SHOE",
    date: "2024-12-01",
    image: image8,
    link: "#",
    price: 2500000,
    discount: 20,
  },
  {
    id: 9,
    title: "Sandal Bệt Phong Cách Bohemian",
    subtitle: "Phong cách và thoải mái",
    type: "SHOE",
    date: "2024-12-01",
    image: image9,
    link: "#",
    price: 700000,
    discount: 10,
  },
  {
    id: 10,
    title: "Giày Đá Bóng Chuyên Nghiệp",
    subtitle: "Tối ưu hiệu suất thi đấu",
    type: "SHOE",
    date: "2024-12-01",
    image: image10,
    link: "#",
    price: 1800000,
    discount: 25,
  },
  {
    id: 11,
    title: "Giày Cao Su Đi Mưa",
    subtitle: "Bền bỉ và chống nước",
    type: "SHOE",
    date: "2024-12-01",
    image: image11,
    link: "#",
    price: 600000,
    discount: 5,
  },
  {
    id: 12,
    title: "Giày Slip-on Unisex",
    subtitle: "Phong cách casual",
    type: "SHOE",
    date: "2024-12-01",
    image: image12,
    link: "#",
    price: 950000,
    discount: 15,
  },
  {
    id: 13,
    title: "Boots Da Nữ Sang Trọng",
    subtitle: "Thích hợp cho mùa đông",
    type: "SHOE",
    date: "2024-12-01",
    image: image13,
    link: "#",
    price: 2200000,
    discount: 10,
  },
  {
    id: 14,
    title: "Giày Moccasin Da Lộn",
    subtitle: "Sang trọng và thoải mái",
    type: "SHOE",
    date: "2024-12-01",
    image: image14,
    link: "#",
    price: 1600000,
    discount: 18,
  },
  {
    id: 15,
    title: "Giày Thể Thao Trẻ Em",
    subtitle: "Êm ái và dễ chịu",
    type: "SHOE",
    date: "2024-12-01",
    image: image15,
    link: "#",
    price: 800000,
    discount: 10,
  },
  {
    id: 16,
    title: "Giày Đi Biển Chống Trượt",
    subtitle: "Nhẹ nhàng và linh hoạt",
    type: "SHOE",
    date: "2024-12-01",
    image: image16,
    link: "#",
    price: 500000,
    discount: 5,
  },
  {
    id: 17,
    title: "Giày Golf Chuyên Dụng",
    subtitle: "Tăng hiệu suất chơi golf",
    type: "SHOE",
    date: "2024-12-01",
    image: image17,
    link: "#",
    price: 3000000,
    discount: 15,
  },
  {
    id: 18,
    title: "Giày Đế Xuồng Nữ",
    subtitle: "Tôn dáng và thoải mái",
    type: "SHOE",
    date: "2024-12-01",
    image: image18,
    link: "#",
    price: 1200000,
    discount: 12,
  },
  {
    id: 19,
    title: "Giày Cổ Thấp Phong Cách Minimalist",
    subtitle: "Đơn giản nhưng tinh tế",
    type: "SHOE",
    date: "2024-12-01",
    image: image19,
    link: "#",
    price: 1100000,
    discount: 8,
  },
  {
    id: 20,
    title: "Boots Cổ Cao Da Lộn",
    subtitle: "Chất lượng cao, bền bỉ",
    type: "SHOE",
    date: "2024-12-01",
    image: image20,
    link: "#",
    price: 2400000,
    discount: 20,
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

export { ListItems, sourcesPerPage, listHighHeels };
