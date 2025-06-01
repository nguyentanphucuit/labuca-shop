const Header = () => {
  return (
    <head>
      <link rel="icon" href="/favicon.ico" sizes="32x32" />
      <title>
        Labuca - Chuyên cung cấp giày dép và túi xách nữ thời trang chất lượng cao với giá cả hợp
        lý.
      </title>
      <meta
        name="description"
        content="Labuca - Chuyên cung cấp giày dép và túi xách nữ thời trang chất lượng cao với giá cả hợp lý."
      />
      <meta
        name="keywords"
        content="Labuca, giày dép, túi xách, nữ thời trang, chất lượng cao, giá cả hợp lý"
      />
      <meta name="author" content="Labuca" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />

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
