const Header = () => {
  return (
    <head>
      <link rel="icon" href="/favicon.ico" sizes="32x32" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FashionStore",
            name: "Labuca",
            alternateName: ["Labuca Shop", "Labuca BMT", "labuca.vn"],
            url: "https://labuca.vn",
            logo: "https://labuca.vn/assets/img/labuca-logo.png",
            description:
              "Labuca - Chuyên cung cấp giày dép và túi xách nữ thời trang chất lượng cao với giá cả hợp lý.",
            address: {
              "@type": "PostalAddress",
              streetAddress: "152 Lý Thường Kiệt",
              addressLocality: "Buôn Ma Thuột",
              addressRegion: "Đắk Lắk",
              postalCode: "630000",
              addressCountry: "VN",
            },
            telephone: "0905075588",
            sameAs: [
              "https://www.facebook.com/profile.php?id=100063755854074",
              "https://shopee.vn/labuca_bmt",
              "https://www.tiktok.com/@labuca7979",
            ],
            openingHoursSpecification: {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ],
              opens: "08:00",
              closes: "22:00",
            },
            priceRange: "$$",
          }),
        }}
      />
    </head>
  );
};

export default Header;
