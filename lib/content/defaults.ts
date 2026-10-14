import type { AllPageContent } from "@/types/content";

export const DEFAULT_PAGE_CONTENT: AllPageContent = {
  header: {
    brandName: "10X Masterminds",
    eventName: "MAKE IT LAUNCH",
    ctaLabel: "Giữ chỗ miễn phí",
  },
  hero: {
    eventName: "MAKE IT LAUNCH",
    badgeText: "🔴 WORKSHOP ONLINE · 17/10 · MAKE IT LAUNCH",
    headline: "Biến người theo dõi thành",
    headlineAccent: "khách hàng trả phí",
    headlineSuffix: "qua webinar",
    subheadline: "",
    ctaPrimary: "Đăng ký miễn phí — giữ chỗ",
    ctaSecondary: "Xem bạn sẽ học được gì",
    urgencyText: "Suất tham dự có giới hạn để đảm bảo tương tác trực tiếp với Coach.",
    trustBullets: [
      "Không cần chạy ads lớn — tập trung chuyển đổi audience sẵn có",
      "Khung áp dụng cho coaching, khóa học, membership",
      "Ra về với dàn ý chiến dịch, không chỉ nghe lý thuyết",
    ],
    eventInfo: [
      { label: "Thời gian", value: "9h sáng · Thứ 6 · 17/10" },
      { label: "Hình thức", value: "Livestream online" },
      { label: "Chi phí", value: "Miễn phí" },
    ],
    stats: [
      { value: "2h", label: "Thời lượng tập trung" },
      { value: "100%", label: "Online — tham dự mọi nơi" },
      { value: "0đ", label: "Gói tham dự cơ bản" },
    ],
    portraitImage: "/hinh1.jpg",
  },
  marquee: {
    phrases: [
      "Webinar MAKE IT LAUNCH · 10X Masterminds",
      "Biến người theo dõi thành khách hàng trả phí",
      "Khung chiến dịch webinar — áp dụng ngay sau buổi học",
      "Bonus tài liệu dành riêng người đăng ký",
      "Livestream online cùng Coach Thảo Trần",
      "Đăng ký miễn phí — suất có hạn",
    ],
  },
  problem: {
    title: "Bạn có audience… nhưng doanh thu vẫn “đi đường vòng”?",
    subtitle:
      "Rất nhiều chuyên gia đăng nội dung đều, tương tác tốt — nhưng khi bán thì thiếu nhịp, thiếu cấu trúc, thiếu niềm tin ở phút chốt.",
    pains: [
      "Follower nhiều nhưng inbox hỏi giá xong… im lặng",
      "Lên live/post bán hàng nhưng conversion thấp, cảm giác “ép” khách",
      "Không biết offer nào nên đưa lên webinar và ai là người nên mời vào phòng",
      "Tốn công làm content mà không có funnel rõ ràng sau buổi live",
    ],
    closingLine:
      "MAKE IT LAUNCH giúp bạn dựng một chiến dịch webinar hoàn chỉnh — để mỗi lần lên sóng là một lần tiến gần hơn tới doanh thu bền vững.",
  },
  benefits: {
    title: "Chỉ 2 giờ học, bạn ra về với “bản thiết kế” chiến dịch",
    subtitle:
      "Workshop thực chiến: làm theo từng bước, có ví dụ, có khung áp dụng ngay cho sản phẩm của bạn.",
    items: [
      {
        title: "Offer rõ — đúng người — đúng thời điểm",
        description:
          "Xác định bạn đang chào bán điều gì, với ai, và vì sao họ nên vào phòng webinar ngay bây giờ (không phải “khi nào rảnh”).",
      },
      {
        title: "Dẫn dắt từ tò mò → tin tưởng → muốn mua",
        description:
          "Cách kể chuyện, đặt câu hỏi và dẫn nhịp để người xem tự thuyết phục mình — tự nhiên, không gượng ép.",
      },
      {
        title: "Công thức chiến dịch webinar đã được kiểm chứng",
        description:
          "Khung chiến dịch đã đưa hàng nghìn học viên đến với hệ sinh thái 10X Masterminds — bạn chỉ việc điền nội dung của mình vào.",
      },
    ],
  },
  audience: {
    title: "Workshop này dành cho ai?",
    subtitle: "Nếu bạn thấy mình trong 1–2 mô tả dưới đây, đây là buổi học nên ưu tiên.",
    items: [
      {
        title: "Coach / tư vấn / chuyên gia dịch vụ",
        description:
          "Bạn có case study và uy tín, cần một buổi webinar để chuyển lead lạnh thành khách trả phí.",
      },
      {
        title: "Creator bán khóa học / membership",
        description:
          "Audience ổn nhưng launch thiếu nhịp — muốn có script và timeline chiến dịch rõ ràng.",
      },
      {
        title: "Doanh nghiệp cá nhân / personal brand",
        description:
          "Muốn gom nhiều kênh social về một sự kiện online có chuyển đổi, thay vì đăng rải rác.",
      },
    ],
  },
  process: {
    title: "Trong buổi workshop, chúng ta sẽ đi cùng nhau",
    subtitle: "4 mốc — mỗi mốc gắn với một phần bạn có thể mang về và triển khai tuần tới.",
    steps: [
      {
        step: "01",
        title: "Chẩn đoán offer & audience",
        description: "Ai nên vào phòng, họ đang đau ở đâu, bạn giải quyết bằng gì trong 2 giờ webinar.",
      },
      {
        step: "02",
        title: "Thiết kế dòng cảm xúc buổi live",
        description: "Mở đầu – giữ chân – chuyển tiếp – chốt: từng đoạn nói gì để tăng tin tưởng.",
      },
      {
        step: "03",
        title: "Lên khung chiến dịch 7–14 ngày",
        description: "Lịch tease, lời mời, nhắc suất, follow-up sau sự kiện — không bỏ sót lead.",
      },
      {
        step: "04",
        title: "Hành động ngay sau buổi học",
        description: "Checklist triển khai tuần đầu tiên để bạn không để slide nằm im trong máy.",
      },
    ],
  },
  socialProof: {
    title: "Case study thực tế từ cộng đồng 10X",
    subtitle:
      "Những câu chuyện có tên, có số — chia sẻ trực tiếp từ thành viên sau khi học, kết nối và triển khai cùng Coach Thảo Trần.",
    testimonials: [
      {
        headline: "85 triệu — bạn có dám offer?",
        highlight: "85 triệu",
        quote:
          "Tháng thứ 4 trong cộng đồng 10X, em chốt đơn 85 triệu với sản phẩm MADE BY ME — tự build từ A đến Z. Trước đó em tự ti, nghi ngờ; nghĩ bán giá cao như điều điên rồ, thế mà em đã tự tạo ra được.",
        insight:
          "Bí quyết là đi kết nối: bootcamp Nha Trang giúp em gặp đúng người, được nâng đỡ và phá giới hạn — rồi mở lòng giúp đỡ mọi người vô điều kiện.",
        author: "Thuy Pham",
        role: "Thành viên cộng đồng 10X",
      },
      {
        headline: "120 triệu từ một lời giới thiệu",
        highlight: "120 triệu",
        quote:
          "Hiền vừa có deal từ lời giới thiệu — vẫn là vị khách đầu tiên. Chỉ từ một người với đơn nhỏ ban đầu, em có thêm 3 khách và 120 triệu doanh thu từ referral.",
        insight:
          "Sức mạnh của điểm chạm, đàm thoại và trải nghiệm: làm tốt việc của mình, chăm khách đang có — họ sẽ mang khách tiếp theo.",
        author: "Hoàng Hiền",
        role: "The Video Game Club",
      },
      {
        headline: "Một tuần trong The Video Game",
        highlight: "Video đều đặn",
        quote:
          "Sau một tuần với chương trình chị Thảo, em tạo video ngắn và dài đều đặn hơn — trước chỉ quay khi vui, giờ vui hay mệt vẫn làm. Cộng đồng của em bắt đầu thấy em làm video dài đều — thứ họ muốn học theo.",
        insight:
          "Môi trường tốt + kỷ luật + công cụ lưu trữ kiến thức: không chỉ năng lượng mà cần luật chơi để đi đường dài.",
        author: "Thanh Tạ",
        role: "The Video Game Club",
      },
    ],
  },
  ctaBand: {
    headline: "Suất miễn phí — nhưng không phải ai cũng vào được phòng",
    subheadline:
      "Giữ chỗ sớm để nhận link Zoom, tài liệu chuẩn bị và hướng dẫn tham gia nhóm cập nhật trước sự kiện.",
    buttonLabel: "Tôi muốn giữ chỗ",
  },
  pricing: {
    title: "Chọn mức tham gia phù hợp",
    subtitle:
      "Tham dự miễn phí hoàn toàn được. Nâng cấp nếu bạn muốn giữ recording, tài liệu và hỗ trợ sau buổi học.",
    tiers: [
      {
        id: "free",
        name: "FREE",
        price: "Miễn phí",
        features: [
          "Tham dự webinar trực tiếp 2 giờ",
          "Tương tác Q&A với Coach trong buổi học",
        ],
      },
      {
        id: "standard",
        name: "STANDARD",
        price: "499.000đ",
        features: [
          "Toàn bộ quyền lợi FREE",
          "Recording buổi học — xem lại không giới hạn",
          "Bộ slide & tài liệu triển khai",
          "Nhóm hỗ trợ giải đáp sau chương trình",
        ],
        highlighted: true,
      },
      {
        id: "vip",
        name: "VIP",
        price: "4.999.000đ",
        features: [
          "Toàn bộ quyền lợi STANDARD",
          "01 buổi tư vấn 1-1 (60 phút) với Coach Thảo Trần",
          "Review chiến dịch webinar của bạn trước khi launch",
        ],
      },
    ],
  },
  event: {
    title: "Lịch & hình thức tham dự",
    date: "Thứ 7, ngày 17/10",
    time: "9h00 – 11h00 (GMT+7)",
    location: "Online qua Zoom",
    note: "Sau khi đăng ký, kiểm tra email (cả hộp thư quảng cáo) để nhận link và checklist chuẩn bị trước 24h.",
  },
  coach: {
    title: "Người dẫn dắt MAKE IT LAUNCH",
    name: "Mrs. Thảo Trần",
    role: "Cố vấn Hệ Thống Nội Dung Chuyển Đổi · 10X Masterminds",
    description:
      "Coach Thảo Trần đồng hành cùng hàng nghìn chuyên gia và creator xây dựng hệ thống nội dung chuyển đổi — từ bài đăng hàng ngày đến sự kiện webinar có doanh thu. Dẫn dắt chương trình MAKE IT LAUNCH với phong cách thẳng thắn, thực chiến, gần gũi.",
    image: "/hinh2.jpg",
  },
  faq: {
    title: "Câu hỏi thường gặp",
    subtitle: "Gửi thêm câu hỏi qua form đăng ký — team sẽ phản hồi qua email hoặc nhóm Zalo.",
    items: [
      {
        question: "Tôi chưa từng làm webinar, có theo được không?",
        answer:
          "Có. Workshop thiết kế cho người mới bắt đầu có audience: bạn sẽ nhận khung từng bước, không cần kinh nghiệm live bán hàng trước đó.",
      },
      {
        question: "Gói miễn phí có bị giới hạn nội dung không?",
        answer:
          "Bạn tham dự đủ 2 giờ nội dung chính và Q&A. Recording và tài liệu chi tiết nằm ở gói STANDARD trở lên.",
      },
      {
        question: "Thanh toán gói STANDARD / VIP thế nào?",
        answer:
          "Đăng ký form trước. STANDARD/VIP: chuyển khoản theo QR cuối trang đăng ký, gửi ảnh bill cho Thảo Trần để xác nhận. FREE không cần thanh toán.",
      },
      {
        question: "Có hoàn tiền nếu tôi bận không tham dự được?",
        answer:
          "Gói FREE không thu phí. Với gói trả phí, vui lòng liên hệ bộ phận hỗ trợ",
      },
    ],
  },
  lead: {
    title: "Giữ chỗ tham dự MAKE IT LAUNCH",
    subtitle:
      "Điền form để giữ chỗ FREE. Chọn STANDARD hoặc VIP thì chuyển khoản ở mục bên dưới.",
    formBadge: "Form đăng ký",
    formHeadline: "Giữ chỗ MAKE IT LAUNCH",
    formHighlight: "",
    trustNote: "",
    qrCodeImage: "/QR-code1.jpg",
    bankAccountName: "CONG TY TNHH METTA LIFE",
    bankAccountNumber: "555738",
    bankName: "MB Bank",
    paymentIntro: "",
    paymentNote:
      "Chuyển khoản theo QR hoặc STK trên, gửi ảnh bill cho Thảo Trần để xác nhận.",
  },
  footer: {
    copyright: "© 10X Masterminds · MAKE IT LAUNCH",
    facebookLabel: "The New Rich",
    facebookUrl: "https://www.facebook.com/thenewrichvn",
  },
};
