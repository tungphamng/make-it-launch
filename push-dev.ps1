# Script tự động tạo và push branch dev lên GitHub
# Repository: https://github.com/tungphamng/make-it-launch

$RepoUrl = "https://github.com/tungphamng/make-it-launch"

Write-Host "=== Bắt đầu cấu hình Git Branch 'dev' ===" -ForegroundColor Cyan

# 1. Kiểm tra xem thư mục hiện tại có phải là Git repository không
if (-not (Test-Path ".git")) {
    Write-Host "[1/5] Khởi tạo Git repository..." -ForegroundColor Yellow
    git init
} else {
    Write-Host "[1/5] Đã tìm thấy Git repository trong thư mục." -ForegroundColor Green
}

# 2. Kiểm tra hoặc thêm Remote 'origin'
$currentRemote = git remote get-url origin 2>$null
if (-not $currentRemote) {
    Write-Host "[2/5] Đang thêm remote origin: $RepoUrl" -ForegroundColor Yellow
    git remote add origin $RepoUrl
} else {
    Write-Host "[2/5] Remote origin hiện tại: $currentRemote" -ForegroundColor Green
}

# 3. Chuyển sang (hoặc tạo mới) branch 'dev'
Write-Host "[3/5] Đang chuyển sang branch 'dev'..." -ForegroundColor Yellow
git checkout -b dev 2>$null
if ($LASTEXITCODE -ne 0) {
    # Nếu branch dev đã tồn tại từ trước thì checkout sang dev
    git checkout dev
}

# 4. Kiểm tra xem có thay đổi nào chưa commit không
$status = git status --porcelain
if ($status) {
    Write-Host "[4/5] Phát hiện file mới/thay đổi. Đang commit..." -ForegroundColor Yellow
    git add .
    git commit -m "Chore: Init dev branch for make-it-launch project"
} else {
    Write-Host "[4/5] Không có thay đổi mới cần commit." -ForegroundColor Green
}

# 5. Push branch 'dev' lên GitHub
Write-Host "[5/5] Đang push branch 'dev' lên GitHub..." -ForegroundColor Yellow
git push -u origin dev

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n=== THÀNH CÔNG! Branch 'dev' đã được push lên GitHub thành công! ===" -ForegroundColor Green
} else {
    Write-Host "`n=== THẤT BẠI! Vui lòng kiểm tra lại quyền truy cập hoặc kết nối Git. ===" -ForegroundColor Red
}