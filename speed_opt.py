import os
import re
import glob

def optimize_files():
    html_files = glob.glob('*.html')
    
    # 1. Font Link to Add
    font_link = '  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">\n'
    
    # 2. Scripts to Move
    # Patterns for Cookiebot, GTAG, and Clarity
    scripts_to_move = [
        r'<!-- Google tag \(gtag\.js\) -->\s*<script async src="https://www\.googletagmanager\.com/gtag/js\?id=G-0VF90H40XL"></script>\s*<script>.*?</script>',
        r'<!-- Microsoft Clarity -->\s*<script type="text/javascript">.*?</script>',
        r'<!-- Cookiebot Consent Management -->\s*<script id="Cookiebot" src="https://consent\.cookiebot\.com/uc\.js".*?></script>'
    ]

    for fpath in html_files:
        with open(fpath, 'r', encoding='utf-8') as f:
            content = f.read()

        # Extract and Remove Scripts from Head
        extracted_scripts = []
        for pattern in scripts_to_move:
            match = re.search(pattern, content, re.DOTALL | re.IGNORECASE)
            if match:
                extracted_scripts.append(match.group(0))
                content = content.replace(match.group(0), '')

        # Add Font Link if not present
        if 'family=Outfit' not in content:
            # Place it after Geist Mono or Inter
            if 'family=Geist+Mono' in content:
                content = re.sub(r'(<link href="https://fonts\.googleapis\.com/css2\?family=Geist\+Mono:[^>]+>)', r'\1\n' + font_link, content)
            elif 'family=Inter' in content:
                content = re.sub(r'(<link href="https://fonts\.googleapis\.com/css2\?family=Inter:[^>]+>)', r'\1\n' + font_link, content)

        # Append Scripts before </body>
        if extracted_scripts:
            scripts_block = '\n  ' + '\n  '.join(extracted_scripts) + '\n'
            content = content.replace('</body>', scripts_block + '</body>')

        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Optimized {fpath}")

    # 3. Optimize CSS (Remove @import)
    css_files = ['assets/css/main.css', 'assets/css/main.min.css']
    import_pattern = r"@import url\('https://fonts\.googleapis\.com/css2\?family=Outfit:[^']+?@import url\('https://fonts\.googleapis\.com/css2\?family=Outfit:[^']+?'\);"
    # Simple replace for specifically the Outfit import
    target_import = "@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@500;600;700;800;900&display=swap');"
    
    for cpath in css_files:
        if os.path.exists(cpath):
            with open(cpath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            new_content = content.replace(target_import, '')
            
            if new_content != content:
                with open(cpath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Optimized {cpath}")

if __name__ == "__main__":
    optimize_files()
    print("All optimizations complete.")
