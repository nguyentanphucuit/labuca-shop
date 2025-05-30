import { classNames, formatPriceVND } from "@/app/constants/common";
import { ProductTypes } from "@/app/types/common";
import { Check, Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { PRODUCT_COLORS, isLightColor } from "../constants";
import { useCart } from "../context/CartContext";

const ProductDetailTemplate = ({ ...props }: ProductTypes) => {
  // Create fake images based on the main image by adding different angles
  const thumbnails = [props.imageUrl, props.imageUrl, props.imageUrl];

  // Use centralized color constants
  const availableColors = PRODUCT_COLORS;

  const [selectedColor, setSelectedColor] = useState(availableColors[0]);
  const [selectedSize, setSelectedSize] = useState(props.size.split(",")[0]);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(thumbnails[0]);
  const [activeTab, setActiveTab] = useState("details");

  const { addItem } = useCart();

  const sizes = props.size.split(",").map((s) => s.trim());
  const discountedPrice = (props.price * (100 - props.discount)) / 100;

  // Sample reviews data
  const reviews = [
    {
      id: 1,
      author: "Lê Thị Hồng",
      rating: 5,
      date: "15/03/2025",
      comment: "Sản phẩm rất tốt, đúng như mô tả. Giao hàng nhanh.",
    },
    {
      id: 2,
      author: "Đặng Thị Huyền",
      rating: 4,
      date: "14/05/2025",
      comment: "Chất lượng tốt, giá cả hợp lý.",
    },
  ];

  // Sample FAQs
  const faqs = [
    {
      question: "Làm thế nào để chọn size giày phù hợp?",
      answer:
        "Bạn có thể đo chiều dài bàn chân và tham khảo bảng size của chúng tôi. Nếu bạn đang phân vân giữa hai size, nên chọn size lớn hơn.",
    },
    {
      question: "Chính sách đổi trả như thế nào?",
      answer:
        "Chúng tôi chấp nhận đổi trả trong vòng 30 ngày kể từ ngày mua hàng, với điều kiện sản phẩm còn nguyên tem mác và chưa qua sử dụng.",
    },
  ];

  const handleAddToCart = () => {
    addItem({
      id: props.id,
      quantity: quantity,
      color: selectedColor,
      size: selectedSize,
    });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "details":
        return (
          <div className="space-y-8">
            {/* Product Specifications */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Thông số sản phẩm</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="font-medium min-w-32">Mã sản phẩm:</span>
                    <span>{props.code}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="font-medium min-w-32">Chiều cao:</span>
                    <span>7 cm</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="font-medium min-w-32">Size:</span>
                    <span>{props.size}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="font-medium min-w-32">Màu sắc:</span>
                    {availableColors.map((color) => (
                      <span
                        key={color.name}
                        className={classNames(
                          "px-2 py-1 text-sm font-semibold rounded",
                          isLightColor(color.name)
                            ? "text-gray-900 border border-gray-200"
                            : "text-white"
                        )}
                        style={{ backgroundColor: color.value }}
                      >
                        {color.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Key Features */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Đặc điểm nổi bật</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  {[
                    "Kiểu dáng cổ điển thoáng, mềm, nhẹ chân",
                    "Chất liệu da mờ sang trọng",
                    "Phù hợp đi làm, đi chơi, dự tiệc",
                    "Mix-match được với nhiều loại trang phục",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-gray-600">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Care Instructions */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Hướng dẫn bảo quản</h3>
              <div className="space-y-4 text-gray-600">
                <div className="space-y-2">
                  <p className="flex items-start gap-2">
                    <span className="text-black font-medium">•</span>
                    Bạn nên thường xuyên vệ sinh giày để giúp đôi giày luôn mới và kéo dài thời gian
                    sử dụng.
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-black font-medium">•</span>
                    Khi giày bị bẩn chỉ cần dùng vải ẩm mềm lau nhẹ nhàng bề mặt da, không nên rửa
                    bằng nước và dùng vật cứng.
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-black font-medium">•</span>
                    Đối với giày bị thấm nước mưa, chỉ cần dùng vải ướt lau hết bùn đất, sau đó dùng
                    vải khô lau lại một lượt.
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-black font-medium">•</span>
                    Giày phải để ở nơi thoáng mát, có không khí lưu thông.
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-black font-medium">•</span>
                    Nếu bạn ít sử dụng giày, có thể để vào hộp có túi hút ẩm, thỉnh thoảng lấy ra
                    mang để giày có hơi chân không bị bong keo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      case "reviews":
        return (
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="border-b pb-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">bởi {review.author}</span>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                <p className="text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        );
      case "faqs":
        return (
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b pb-4">
                <h3 className="font-medium mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-8 py-8">
      {/* Product Header - Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <span>Trang chủ</span>
        <span>{">"}</span>
        <span>Giày</span>
        <span>{">"}</span>
        <span>{props.title}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column - Image Gallery */}
        <div className="flex flex-col gap-4">
          <div className="aspect-square relative rounded-lg overflow-hidden bg-gray-100">
            <Image src={mainImage} alt={props.title} fill className="object-cover" priority />
          </div>
          <div className="flex gap-4">
            {thumbnails.map((thumb, idx) => (
              <button
                key={idx}
                className={`aspect-square w-20 relative rounded-lg overflow-hidden bg-gray-100 ${
                  mainImage === thumb ? "ring-2 ring-black" : "border border-gray-200"
                }`}
                onClick={() => setMainImage(thumb)}
              >
                <Image
                  src={thumb}
                  alt={`${props.title} thumbnail ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column - Product Info */}
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl font-bold tracking-tight">{props.title}</h1>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex">
              {[1, 2, 3, 4].map((star) => (
                <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" strokeWidth={1} />
            </div>
            <span className="text-sm text-gray-600">4.5/5</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold">{formatPriceVND(discountedPrice)}</span>
            {props.discount > 0 && (
              <>
                <span className="text-xl text-gray-500 line-through">
                  {formatPriceVND(props.price)}
                </span>
                <span className="px-2 py-1 text-sm font-semibold text-red-600 bg-red-100 rounded">
                  -{props.discount}%
                </span>
              </>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-600">{props.subtitle}</p>

          {/* Color Selection */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Lựa chọn màu</span>
              <span className="text-sm text-gray-500">{selectedColor.name}</span>
            </div>
            <div className="flex gap-3">
              {availableColors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color)}
                  className={`w-10 h-10 rounded-full border-2 ${
                    selectedColor.name === color.name ? "border-black" : "border-gray-200"
                  } ${color.name === "White" ? "bg-white" : ""}`}
                  style={{ backgroundColor: color.value }}
                  aria-label={`Select ${color.name} color`}
                >
                  {selectedColor.name === color.name && (
                    <span className="flex items-center justify-center h-full">
                      <svg
                        className={`w-6 h-6 ${color.name === "White" ? "text-black" : "text-white"}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Choose Size</span>
              <span className="text-sm text-gray-500">{selectedSize}</span>
            </div>
            <div className="flex gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg ${
                    selectedSize === size
                      ? "bg-black text-white"
                      : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="flex gap-4">
            <div className="flex items-center border rounded-lg">
              <button
                className="px-4 py-2 text-gray-600 hover:text-black disabled:opacity-50"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="px-4 py-2 text-center min-w-[3rem]">{quantity}</span>
              <button
                className="px-4 py-2 text-gray-600 hover:text-black"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className="flex-1 px-6 py-3 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-900"
            >
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-12">
        <div className="border-b border-gray-200">
          <nav className="flex gap-8">
            <button
              onClick={() => setActiveTab("details")}
              className={`px-1 py-4 text-sm font-medium border-b-2 ${
                activeTab === "details"
                  ? "border-black text-black"
                  : "border-transparent text-gray-500 hover:text-black"
              }`}
            >
              Chi tiết sản phẩm
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`px-1 py-4 text-sm font-medium border-b-2 ${
                activeTab === "reviews"
                  ? "border-black text-black"
                  : "border-transparent text-gray-500 hover:text-black"
              }`}
            >
              Đánh giá
            </button>
            <button
              onClick={() => setActiveTab("faqs")}
              className={`px-1 py-4 text-sm font-medium border-b-2 ${
                activeTab === "faqs"
                  ? "border-black text-black"
                  : "border-transparent text-gray-500 hover:text-black"
              }`}
            >
              FAQs
            </button>
          </nav>
        </div>
        <div className="py-6">{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default ProductDetailTemplate;
