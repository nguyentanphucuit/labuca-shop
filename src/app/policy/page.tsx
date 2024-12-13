import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export default function policy() {
  const policy = [
    {
      title: "Giới thiệu về Labuca",
      content: (
        <ul className="list-disc">
          <li>
            LABUCA được thành lập vào năm 2024, là thương hiệu Việt chuyên các
            sản phẩm giày thời trang 100% sản xuất tại Việt Nam từ đôi tay những
            người thợ việt. Tuy tuổi đời còn non trẻ, nhưng bằng tâm huyết của
            mình LABUCA đã nhanh chóng chiếm được niềm tin của những người yêu
            giày với mẫu mã đa dạng, thời trang, màu sắc độc đáo, chất lượng
            cao, dịch vụ chăm sóc khách hàng tốt,...
          </li>
          <li>
            Đặc biệt là các dòng giày da của LABUCA rất đang nhận được sự yêu
            mến của khách hàng khắp cả nước nhờ kiểu dáng trẻ trung, thời trang
            và chất liệu cao cấp dù ở mức giá mềm nhưng vẫn toát lên vẻ thanh
            lịch, nhã nhặn.
          </li>
          <li>
            LABUCA đang không ngừng nỗ lực sáng tạo những mẫu giày thời trang,
            chất lượng cao ở mức giá hợp lý, mang đến cho phụ nữ Việt sự duyên
            dáng và tự tin trên mỗi bước chân.
          </li>
          <li>Với LABUCA “Phụ nữ mua sắm là để yêu thương”. ♥️</li>
        </ul>
      ),
    },
    {
      title: "Chính sách bảo hành",
      content: (
        <ul className="list-decimal">
          <li>Điều khoản bảo hành</li>
          <ul className="list-disc py-2">
            <li>
              LABUCA sẽ thực hiện bảo hành miễn phí sản phẩm LABUCA trong suốt
              thời gian khách hàng sử dụng.
            </li>
            <li>Các hạng mục bảo hành bao gồm: keo, đế</li>
          </ul>
          <li>Những trường hợp LABUCA từ chối bảo hành</li>
          <ul className="list-disc py-2">
            <li>
              Sản phẩm đã được sửa chữa, thay đổi không phải do LABUCA thực
              hiện.
            </li>
            <li>
              Sản phẩm bị hư không phải do lỗi sản xuất: trầy xước, mòn đế, nóng
              chảy, cháy, thú vật cắn, cắt...
            </li>
            <li>Sản phẩm bị hao mòn tự nhiên trong quá trình sử dụng.</li>
            <li>
              Sản phẩm PU tự hủy qua thời gian sử dụng, sản phẩm bị biến dạng
              hoặc không có thông tin bảo hành.
            </li>
          </ul>
          <li>Quy trình bảo hành</li>
          <ul className="list-disc py-2">
            <li>
              LABUCA tiếp nhận bảo hành trực tiếp tại các cửa hàng trên toàn
              quốc, hoặc khách hàng có thể gửi sản phẩm về các cửa hàng.
            </li>
            <li>LABUCA tiến hành thực hiện bảo hành sản phẩm</li>
            <li>
              Sau khi bảo hành, nhân viên LABUCA sẽ liên hệ và hẹn trả sản phẩm
              đã bảo hành cho khách hàng.
            </li>
          </ul>
        </ul>
      ),
    },
    {
      title: "Chính sách bảo mật thông tin",
      content: (
        <ul className="list-decimal">
          <li>Chính sách bảo mật thông tin tài khoản khách hàng tại Labuca:</li>
          <ul className="list-disc py-2">
            <li>
              Labuca coi trọng việc bảo mật thông tin và sử dụng các biện pháp
              tốt nhất để bảo vệ thông tin và việc thanh toán của Quý khách
              hàng.
            </li>
          </ul>
          <li> Mục đích thu thập thông tin:</li>
          <ul className="list-disc py-2">
            <li>
              Labuca sẽ chỉ thu thập những thông tin cần thiết và có liên quan
              đến giao dịch giữa Labuca và khách hàng.
            </li>
            <li>
              Khách hàng truy cập và sử dụng dịch vụ mua hàng, giao nhận trên
              trang điện tử của Labuca có thể được yêu cầu cung cấp các thông
              tin cá nhân như: địa chỉ hòm thư, họ tên, số điện thoại liên lạc,
              địa chỉ nhận hàng,…Những thông tin khai báo cần đảm bảo chính xác
              và hợp pháp, Labuca sẽ không chịu mọi trách nhiệm liên quan đến
              tính pháp lý về thông tin khai báo của khách hàng.
            </li>
          </ul>
          <li>Sử dụng thông tin:</li>
          <ul className="list-disc py-2">
            <p>
              Labuca sẽ sử dụng thông tin khách hàng cung cấp để thực hiện các
              hoạt động sau:
            </p>
            <li>Hỗ trợ khách hàng khi mua, giao nhận sản phẩm Labuca</li>
            <li>Giải đáp các thắc mắc khách hàng</li>
            <li>
              Cung cấp cho khách hàng thông tin mới nhất về các hoạt động,
              chương trình của Labuca.
            </li>
            <li>
              Thực hiện các hoạt động quảng bá liên quan đến các sản phẩm và
              dịch vụ của Labuca.
            </li>
          </ul>
          <li>Cam kết bảo mật thông tin:</li>
          <ul className="list-disc py-2">
            <li>
              Labuca cam kết thông tin cá nhân của khách hàng sẽ được bảo mật
              tuyệt đối. Trừ trường hợp theo yêu cầu của cơ quan pháp luật khi
              cần thiết, chúng tôi không sử dụng, chuyển giao, cung cấp hay tiết
              lộ thông tin cho bên thứ 3 khi không có sự cho phép, đồng ý từ
              phía khách hàng.
            </li>
          </ul>
        </ul>
      ),
    },
    {
      title: "Chính sách đổi trả",
      content: (
        <ul className="list-decimal py-2">
          <li>
            <strong>CAM KẾT BÁN HÀNG:</strong>
            <ul className="list-disc py-2">
              <li>
                Labuca cam kết bán hàng nguyên mới, chất lượng, sản phẩm mà
                khách hàng nhận được phải nguyên vẹn và đúng thông tin mô tả
                trên web <em>labuca.vn</em>.
              </li>
              <li>
                Nếu Quý khách nhận được sản phẩm không đúng với cam kết trên, bị
                lỗi kỹ thuật, không vừa size, không ưng ý, Quý khách vui lòng
                liên hệ với Labuca trong vòng 30 ngày kể từ thời điểm nhận hàng
                để được đổi hàng.
              </li>
            </ul>
          </li>
          <li>
            Tất cả các sản phẩm đều được áp dụng chính sách đổi trả{" "}
            <strong className="text-red-600">trong vòng 30 ngày</strong>, kể từ
            khi Labuca nhận hàng, không bao gồm những sản phẩm giảm giá, khuyến
            mãi trừ khi Labuca có quy định khác.
          </li>
          <li>
            <strong>ĐIỀU KIỆN ĐỔI TRẢ:</strong>
            <ul className="list-disc py-2">
              <li>
                Sản phẩm vẫn còn nguyên tem, nhãn mác của nhà sản xuất, không dơ
                bẩn, trầy xước và chưa qua sử dụng.
              </li>
              <li>
                Sản phẩm còn đầy đủ hộp cũng như các phụ kiện đi kèm (nếu có).
              </li>
              <li>
                Sản phẩm đổi phải có giá trị bằng hoặc cao hơn giá trị sản phẩm
                trước.
              </li>
              <li>
                Sản phẩm còn trong thời hạn hiệu lực cho phép đổi hàng (30 ngày
                kể từ thời điểm nhận hàng).
              </li>
            </ul>
          </li>
          <li>
            <strong>CÁC TRƯỜNG HỢP ĐƯỢC ĐỔI TRẢ:</strong>
            <ul className="list-disc py-2">
              <li>
                Sản phẩm lỗi do nhà sản xuất hoặc Labuca gửi sai đơn hàng (sai
                sản phẩm, màu sắc, kích cỡ…). Trong trường hợp này, Labuca sẽ
                chịu toàn bộ chi phí vận chuyển đổi trả.
              </li>
              <li>
                Nếu đã gửi đúng đơn đặt hàng của khách hàng, Labuca sẽ không
                chịu chi phí vận chuyển này.
              </li>
              <li>
                Riêng trường hợp khách trả hàng, Labuca sẽ hoàn tiền lại cho quý
                khách (không bao gồm phí vận chuyển và các khoản giảm giá, chiết
                khấu, nếu có) qua tài khoản ngân hàng trong vòng 7 ngày kể từ
                khi Labuca nhận được hàng đổi trả.
              </li>
            </ul>
          </li>

          <i>*Lưu ý:</i>
          <ul className="list-disc py-2">
            <li>Mỗi đơn hàng chỉ được đổi trả 01 lần.</li>
            <li>
              Các sản phẩm đang trong chương trình sale, khuyến mãi sẽ không
              được phép đổi trả, trừ khi Labuca có quy định khác.
            </li>
          </ul>

          <li>
            Trong trường hợp muốn đổi một sản phẩm cùng loại, Quý khách nên liên
            hệ trước với Labuca qua:
            <ul className="list-disc py-2">
              <li>Hotline: 0905075588</li>
              <li>
                Fanpage Labuca:{" "}
                <a href="https://m.me/labucavietnam" target="_blank">
                  m.me/labucavietnam
                </a>
              </li>
            </ul>
          </li>
        </ul>
      ),
    },
    {
      title: "Điều khoản mua bán",
      content: (
        <>
          <h3>Chào mừng quý khách đến với LABUCA.</h3>
          <p>
            * Khi quý khách truy cập vào trang web của chúng tôi có nghĩa là quý
            khách đồng ý với tất cả các điều khoản này. Trang web có quyền thay
            đổi, chỉnh sửa, thêm hoặc loại bỏ bất kì phần nào trong Qui định và
            Điều kiện được đăng tải, có nghĩa là quý khách chấp nhận với những
            thay đổi đó.
          </p>
          <strong>* Xin vui lòng đọc kĩ trước khi quyết định mua hàng.</strong>

          <ul className="list-decimal py-2">
            <li>
              <strong>Hướng dẫn sử dụng web</strong>
              <ul className="list-disc py-2">
                <li>
                  Quý khách phải cung cấp thông tin xác thực về bản thân và phải
                  cập nhật nếu có bất kì thay đổi nào.
                </li>
                <li>
                  Nghiêm cấm sử dụng bất kì phần nào của web này với mục đích
                  thương mại hoặc nhân danh bất kì đối tác thứ 3 nào nếu không
                  được chúng tôi cho phép bằng văn bản.
                </li>
              </ul>
            </li>
            <li>
              <strong>Hình thức thanh toán</strong>
              <ul className="list-disc py-2">
                <li>
                  LABUCA cung cấp các hình thức thanh toán: tiền mặt khi nhận
                  hàng, thẻ Thanh toán Quốc tế hoặc thẻ Thanh toán Nội địa.
                </li>
                <li>
                  Trừ một số trường hợp có ghi chú riêng, thông thường quý khách
                  có thể lựa chọn một trong ba hình thức thanh toán trên khi
                  tiến hành đặt hàng. Tuy nhiên, đối với những đơn hàng có giá
                  trị cao từ 50 triệu trở lên, LABUCA chỉ chấp nhận hình thức
                  thanh toán trước bằng thẻ Thanh toán quốc tế hoặc thẻ Thanh
                  toán Nội địa.
                </li>
              </ul>
            </li>
            <li>
              <strong>Quy định về bảo mật</strong>
              <ul className="list-disc py-2">
                <li>
                  Trang web của chúng tôi coi trọng việc bảo mật thông tin và sử
                  dụng các biện pháp tốt nhất bảo vệ thông tin và việc thanh
                  toán của quý khách. Thông tin của quý khách trong quá trình
                  thanh toán sẽ được mã hóa để đảm bảo an toàn. Sau khi quý
                  khách hoàn thành quá trình đặt hàng, quý khách sẽ thoát khỏi
                  chế độ an toàn.
                </li>
                <li>
                  Quý khách không được sử dụng bất kì chương trình, công cụ hay
                  hình thức nào khác để can thiệp vào hệ thống hay làm thay đổi
                  cấu trúc dữ liệu. Trang web nghiêm cấm việc phát tán, truyền
                  bá hay cổ vũ cho bất kì hoạt động nào nhằm can thiệp, phá hoại
                  hay xâm nhập vào dữ liệu của hệ thống. Cá nhân hay tổ chức vi
                  phạm sẽ bị tước bỏ mọi quyền lợi cũng như sẽ bị truy tố trước
                  pháp luật nếu cần thiết.
                </li>
                <li>
                  Mọi thông tin giao dịch sẽ được bảo mật nhưng trong trường hợp
                  cơ quan pháp luật yêu cầu, chúng tôi buộc phải cung cấp những
                  thông tin này cho các cơ quan pháp luật nếu cần thiết.
                </li>
              </ul>
            </li>
          </ul>
        </>
      ),
    },
    {
      title: "Hướng dẫn mua hàng online",
      content: (
        <>
          <p>
            Khi mua hàng online, quý khách có thể đặt hàng bằng các cách như
            sau:
          </p>

          <ul className="list-decimal py-2">
            <li>
              <strong>Cách 1:</strong>
              <p>
                Gọi điện đến <strong>0905075588</strong> từ 8h đến 21h00 tất cả
                các ngày trong tuần. Nhân viên bán hàng Online sẽ ghi nhận thông
                tin đặt hàng của bạn.
              </p>
            </li>
            <li>
              <strong>Cách 2:</strong>
              <p>
                Chat với nhân viên kinh doanh ở khung chat phía bên tay phải của
                website. Nhân viên kinh doanh sẽ lập tức cung cấp thông tin đầy
                đủ về sản phẩm bạn muốn mua và hỗ trợ đặt hàng cho khách.
              </p>
            </li>
            <li>
              <strong>Cách 3:</strong>
              <p>
                Truy cập và mua sắm trực tiếp trên website{" "}
                <a href="https://labuca.vn" target="_blank">
                  labuca.vn
                </a>
                .
              </p>
              <ul>
                <li>
                  <strong>Bước 1:</strong>
                  <ul className="list-disc py-2 pl-3">
                    <li>
                      Nhập tên sản phẩm cần tìm kiếm vào ô tìm kiếm phía trên
                      đầu góc trái của website, kết quả sẽ lập tức hiện ra cho
                      bạn dễ dàng lựa chọn.
                    </li>
                    <li>
                      Hoặc click vào từng danh mục để tìm kiếm sản phẩm của
                      mình.
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>Bước 2:</strong> Tìm được sản phẩm cần mua
                  <ul className="list-disc py-2 pl-3">
                    <li>
                      Click vào sản phẩm cần mua, sau đó chọn màu, chọn size và
                      số lượng phù hợp.
                    </li>
                    <li>
                      Nhấn vào nút <strong>MUA HÀNG</strong>. Điền thông tin như
                      điện thoại, email và họ tên vào ô trống.
                    </li>
                    <li>
                      Chọn một trong hai nút: <strong>GỌI LẠI CHO TÔI</strong>{" "}
                      hoặc <strong>THÊM VÀO GIỎ HÀNG</strong>.
                    </li>
                    <li>
                      Điền đầy đủ thông tin địa chỉ giao hàng và chọn phương
                      thức thanh toán phù hợp.
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>Bước 3:</strong> Hoàn tất
                  <ul className="list-disc py-2 pl-3">
                    <li>
                      Nhấn vào nút <strong>hoàn thành đơn hàng</strong> để đặt
                      hàng hoặc <strong>chọn sản phẩm khác</strong> để tiếp tục
                      mua hàng.
                    </li>
                    <li>
                      Labuca sẽ gửi email hoặc gọi điện thoại để xác nhận đơn
                      hàng và thông tin giao hàng.
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </>
      ),
    },
    {
      title: "Hướng dẫn thanh toán",
      content: (
        <>
          <p>
            Labuca hiện đang cung cấp cho khách hàng của mình những phương thức
            thanh toán sau:
          </p>
          <ul className="list-decimal py-2">
            <li>
              <strong>Thanh toán khi nhận hàng (COD):</strong>
              <p>
                COD (dịch vụ giao hàng nhận tiền): Nhân viên vận chuyển thu tiền
                mặt khi giao hàng cho khách.
              </p>
            </li>
            <li>
              <strong>Chuyển khoản trực tiếp vào số tài khoản Labuca:</strong>
              <p>
                CHỦ TÀI KHOẢN: <strong>NGUYỄN THỊ HOÀI THƯƠNG</strong>
              </p>
              <p>
                <strong>6312797979 – BIDV CN ĐẮK LẮK – ĐẮK LẮK</strong>
              </p>
            </li>
            <li>
              <strong>
                Thanh toán online bằng thẻ quốc tế Visa/MasterCard/JCB:
              </strong>
              <p>Chấp nhận thanh toán qua các loại thẻ quốc tế phổ biến.</p>
            </li>
            <li>
              <strong>
                Thanh toán online bằng thẻ ngân hàng nội địa (ATM):
              </strong>
              <p>
                * Lưu ý: Tài khoản ngân hàng của quý khách cần đăng ký dịch vụ
                Internet Banking với ngân hàng để thanh toán online.
              </p>
            </li>
          </ul>
        </>
      ),
    },
  ];
  return (
    <div className="max-h-max w-full pt-12 px-4">
      <h5 className="flex justify-center text-center p-6 text-xl font-semibold ">
        CHÍNH SÁCH TẠI CỬA HÀNG LABUCA
      </h5>
      <div className="mx-auto w-full max-w-lg divide-y divide-white/5 rounded-xl bg-black/75 whitespace-pre-line">
        {policy.map((item) => (
          <div key={item.title}>
            <Disclosure as="div" className="p-6" defaultOpen={false}>
              <DisclosureButton className="group flex w-full items-center justify-between">
                <span className="text-sm/6 font-medium text-white group-data-[hover]:text-white/80">
                  {item.title}
                </span>
                <ChevronDownIcon className="size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180" />
              </DisclosureButton>
              <DisclosurePanel className="mt-2 text-sm/5 text-white/50 ">
                {item.content}
              </DisclosurePanel>
            </Disclosure>
          </div>
        ))}
      </div>
    </div>
  );
}
