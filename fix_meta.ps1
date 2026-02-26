# Fix index.html meta description using regex
$indexPath = Join-Path $PSScriptRoot 'index.html'
$content = [System.IO.File]::ReadAllText($indexPath, [System.Text.Encoding]::UTF8)

# Replace the bloated meta description with a short one
$pattern = '(?s)<meta name="description"\s+content="[^"]*">'
$replacement = '<meta name="description" content="Ciph Creative Agency - top web design and digital marketing agency in East Africa. High-converting websites for businesses in Uganda, Kenya, Tanzania and Rwanda.">'

if ($content -match $pattern) {
    $newContent = [regex]::Replace($content, $pattern, $replacement, 'Singleline')
    [System.IO.File]::WriteAllText($indexPath, $newContent, [System.Text.Encoding]::UTF8)
    Write-Host "SUCCESS: index.html meta description updated."
} else {
    Write-Host "WARN: Pattern not matched in index.html"
}
