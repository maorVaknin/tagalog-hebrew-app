Add-Type -AssemblyName System.Drawing

$srcPath = "C:\Users\USER\.gemini\antigravity-ide\brain\0d75f41b-75f0-494b-9bc1-fb788594cb96\media__1788726655858.jpg"
$destBase = "C:\Users\USER\.gemini\antigravity-ide\scratch\tagalog-hebrew-app"

$img = [System.Drawing.Image]::FromFile($srcPath)

$targets = @(
    "$destBase\public\apple-touch-icon.png",
    "$destBase\public\icon-192.png",
    "$destBase\public\icon-512.png",
    "$destBase\public\app-logo.png",
    "$destBase\src\assets\app-logo.png"
)

foreach ($t in $targets) {
    if (Test-Path $t) { Remove-Item $t -Force }
    $img.Save($t, [System.Drawing.Imaging.ImageFormat]::Png)
    Write-Host "Created true PNG: $t"
}

$img.Dispose()
Write-Host "ALL PNG CONVERSIONS COMPLETED!"
