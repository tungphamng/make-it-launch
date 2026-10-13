# Thiết lập Admin CMS

## 1. Tạo user đăng nhập

**Cách nhanh (local, đã có `.env.local`):**

```bash
node scripts/ensure-admin-user.mjs tutor10xplus@gmail.com "123456@"
```

**Hoặc Supabase Dashboard:** Authentication → Users → Add user, email `tutor10xplus@gmail.com`, bật **Auto Confirm User**.

## 2. Biến môi trường

Copy `.env.example` → `.env.local` và điền URL + keys.

```env
ENABLE_INLINE_CMS=true
ADMIN_EMAILS=tutor10xplus@gmail.com
```

## 3. Storage ảnh (tùy chọn upload từ CMS)

1. **Storage → New bucket** `landing-assets` → Public
2. Policy cho phép service role upload (API dùng `SUPABASE_SERVICE_ROLE_KEY`)

Hoặc chỉ dùng đường dẫn `/ten-file.jpg` trong `public/` (không cần Storage).

## 4. Truy cập

- Đăng nhập: **https://your-domain.com/admin**
- Hoặc **/?cms=1** → redirect `/admin` nếu chưa login
- Sau login: chỉnh trực tiếp trên trang chủ, **Lưu** từng section → `page_content` trên Supabase
