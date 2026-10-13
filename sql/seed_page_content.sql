-- Schema: schema_khach_hang_a (theo .cursorrules)
-- Chạy trên Supabase SQL Editor sau khi đã tạo schema và bảng page_content

create table if not exists schema_khach_hang_a.page_content (
  id text primary key,
  content jsonb not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

insert into schema_khach_hang_a.page_content (id, content) values
('header', '{"brandName":"10X Masterminds","ctaLabel":"Đăng ký ngay"}'),
('hero', '{"headline":"Webinar Master","subheadline":"Workshop: Từ người theo dõi đến khách hàng — thiết kế chiến dịch bán hàng bằng webinar cho chương trình coaching, khóa học hoặc membership của bạn.","ctaPrimary":"Nhận suất tham dự","ctaSecondary":"Xem lộ trình học","posterImage":"/poster.jpg","badgeText":"Chỉ 2 giờ — áp dụng ngay sau buổi học"}'),
('benefits', '{"title":"Chỉ 2 giờ học, bạn sẽ nhận được","subtitle":"Không lý thuyết suông — bạn ra về với khung chiến dịch webinar rõ ràng, sẵn sàng triển khai cho sản phẩm của mình.","items":[{"title":"Biết chính xác cần chào bán điều gì","description":"Xác định offer phù hợp, chọn đúng tệp khách hàng đưa vào webinar và tránh lãng phí traffic vô ích."},{"title":"Dẫn dắt người xem thuyết phục, tự nhiên","description":"Cách chuyển hóa từ tò mò → tin tưởng → khao khát mua hàng mà không ép, không gượng."},{"title":"Công thức xây chiến dịch webinar","description":"Nắm khung chiến dịch đã đưa hàng nghìn học viên đến với Coach Thảo Trần — và áp dụng cho chính bạn."}]}'),
('pricing', '{"title":"Chọn gói phù hợp với mục tiêu của bạn","subtitle":"Tham dự miễn phí hoặc nâng cấp để giữ tài liệu, recording và hỗ trợ sau chương trình.","tiers":[{"id":"free","name":"FREE","price":"Miễn phí","features":["Tham dự webinar trực tiếp","Tương tác trực tiếp với Coach trong buổi học"]},{"id":"standard","name":"STANDARD","price":"499.000đ","features":["Toàn bộ quyền lợi gói FREE","Nhận recording buổi học","Nhận toàn bộ tài liệu","Hỗ trợ giải đáp sau chương trình (group coaching)"],"highlighted":true},{"id":"vip","name":"VIP","price":"4.999.000đ","features":["Toàn bộ quyền lợi gói STANDARD","01 buổi tư vấn 1-1 (60 phút) với Coach Thảo Trần"]}]}'),
('event', '{"title":"Thông tin sự kiện","date":"Thứ 7, ngày 17/10","time":"9h00 – 11h00","location":"Online qua Zoom","note":"Link tham dự và hướng dẫn chi tiết sẽ được gửi qua email sau khi bạn đăng ký thành công."}'),
('lead', '{"title":"Đăng ký tham dự Webinar Master","subtitle":"Điền form bên dưới để giữ chỗ. Sau khi đăng ký, bạn sẽ nhận hướng dẫn tham gia nhóm Zalo và cập nhật quan trọng về sự kiện."}'),
('coach', '{"title":"Người dẫn dắt","name":"Mrs. Thảo Trần","role":"Cố vấn Hệ Thống Nội Dung Chuyển Đổi","description":"Coach Thảo Trần đồng hành cùng các chuyên gia, coach và creator xây dựng hệ thống nội dung chuyển đổi — biến lượt theo dõi thành doanh thu bền vững qua webinar và funnel bán hàng có cấu trúc.","image":"/hinh1.jpg"}'),
('footer', '{"copyright":"© 10X Masterminds. Webinar Master Workshop.","facebookLabel":"The New Rich","facebookUrl":"https://www.facebook.com/thenewrichvn"}')
on conflict (id) do update set
  content = excluded.content,
  updated_at = timezone('utc'::text, now());
