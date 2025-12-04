# =========================================
# START TODO APP (Backend + Frontend)
# =========================================

try {
    # Save current directory
    $rootDir = Get-Location

    # ================================
    # 1️⃣ Backend setup
    # ================================
    Write-Host "`n=== INSTALLING BACKEND DEPENDENCIES ===" -ForegroundColor Cyan
    Set-Location -Path "$rootDir\backend"
    npm install

    # Create .env if missing
    if (-not (Test-Path ".\.env")) {
        Write-Host "Creating .env for backend..." -ForegroundColor Yellow
        @"
DB_URL="mysql://app_user:app_password@localhost:3306/db_todoapp"
MONGO_URI="mongodb://root:admin@localhost:27017"
REDIS_URL="redis://:admin@localhost:6379"
"@ | Out-File -FilePath ".\.env" -Encoding utf8
    }

    # ================================
    # 2️⃣ Start backend
    # ================================
    Write-Host "`n=== STARTING BACKEND ===" -ForegroundColor Cyan
    # Open backend in a new PowerShell window, keep it alive
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd `"$rootDir\backend`"; npm start"
	
	    # Optional: wait a few seconds for backend to be ready
    Write-Host "Waiting 5 seconds for backend to initialize..." -ForegroundColor Yellow
    Start-Sleep -Seconds 5

    # ================================
    # 3️⃣ Seed database
    # ================================
	Write-Host "`n=== WAITING FOR BACKEND TO BE READY ===" -ForegroundColor Yellow
	while (-not (Test-NetConnection -ComputerName localhost -Port 3000).TcpTestSucceeded) {
		Write-Host "Waiting for backend to be ready..."
		Start-Sleep -Seconds 2
	}
	
	Set-Location -Path "$rootDir\backend\seeders"
    node seed.js
    Write-Host "✅ Database seeded successfully!" -ForegroundColor Green

    # ================================
    # 4️⃣ Frontend setup
    # ================================
    Write-Host "`n=== INSTALLING FRONTEND DEPENDENCIES ===" -ForegroundColor Cyan
    Set-Location -Path "$rootDir\frontend"
    npm install

    Write-Host "`n=== STARTING FRONTEND ===" -ForegroundColor Cyan
    # Open frontend in a new PowerShell window
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd `"$rootDir\frontend`"; npm run dev"

    # ================================
    # 5️⃣ Summary
    # ================================
    Write-Host "`n✅ APPLICATION LAUNCHED SUCCESSFULLY!" -ForegroundColor Green
    Write-Host "Backend: http://localhost:3000" -ForegroundColor Yellow
    Write-Host "Frontend: http://localhost:5173" -ForegroundColor Yellow

    Write-Host "`nPress Ctrl+C in the windows to stop servers." -ForegroundColor DarkYellow
}
catch {
    Write-Host "`n❌ ERROR: $_" -ForegroundColor Red
    exit 1
}
finally {
    # Go back to root
    Set-Location -Path $rootDir
}
