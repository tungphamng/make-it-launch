param (
    [string]$msg = "test: update features on dev"
)

Write-Host "🧪 Dang push code len nhanh TEST (dev)..." -ForegroundColor Yellow

# Dam bao dang o nhanh dev
git checkout dev

# Stage & Commit
git add .
git commit -m "$msg"

# Push len dev
git push origin dev

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Da push thành cong len nhanh dev! Sir co the kiem tra test." -ForegroundColor Green
} else {
    Write-Host "❌ Khong the push code. Vui long kiem tra lai!" -ForegroundColor Red
}