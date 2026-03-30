import os
import glob
import re

def process_html_files():
    html_files = glob.glob('*.html')
    files_keeping_swiper = ['index.html', 'about.html', 'portfolio-details.html', 'service-details.html']
    
    for fpath in html_files:
        with open(fpath, 'r', encoding='utf-8') as f:
            content = f.read()

        # Unconditional removals (CSS and JS)
        remove_patterns = [
            r'<link[^>]*href="[^"]*glightbox\.min\.css"[^>]*>\s*(?:</link>)?',
            r'<noscript>\s*<link[^>]*href="[^"]*glightbox\.min\.css"[^>]*>\s*(?:</link>)?\s*</noscript>',
            r'<script[^>]*src="[^"]*glightbox\.min\.js"[^>]*>\s*</script>',
            
            r'<script[^>]*src="[^"]*imagesloaded\.pkgd\.min\.js"[^>]*>\s*</script>',
            
            r'<script[^>]*src="[^"]*isotope\.pkgd\.min\.js"[^>]*>\s*</script>',
            
            # Calendly CSS and JS in Head
            r'<link[^>]*href="https://assets\.calendly\.com/assets/external/widget\.css"[^>]*>\s*(?:</link>)?',
            r'<script[^>]*src="https://assets\.calendly\.com/assets/external/widget\.js"[^>]*>\s*</script>',
            r'<!-- Calendly link widget begin -->',
            r'<!-- Calendly link widget end -->',
            r'<!-- Calendly inline widget begin -->',
            r'<!-- Calendly inline widget end -->',  # Keep the actual div though!
        ]
        
        for pattern in remove_patterns:
            content = re.sub(pattern, '', content, flags=re.IGNORECASE)

        # Conditional swiper removal
        if os.path.basename(fpath) not in files_keeping_swiper:
            swiper_patterns = [
                r'<link[^>]*href="[^"]*swiper-bundle\.min\.css"[^>]*>\s*(?:</link>)?',
                r'<noscript>\s*<link[^>]*href="[^"]*swiper-bundle\.min\.css"[^>]*>\s*(?:</link>)?\s*</noscript>',
                r'<script[^>]*src="[^"]*swiper-bundle\.min\.js"[^>]*>\s*</script>'
            ]
            for pattern in swiper_patterns:
                content = re.sub(pattern, '', content, flags=re.IGNORECASE)

        # Replace document.write year
        year_pattern = r'<script>\s*document\.write\(new Date\(\)\.getFullYear\(\)\);\s*</script>'
        content = re.sub(year_pattern, '<span class="dynamic-year"></span>', content)

        # For starter-page.html, add defer to specific tags
        if os.path.basename(fpath) == 'starter-page.html':
            # find <script src="assets/...
            content = re.sub(r'<script\s+src="', r'<script defer src="', content)

        # Clean up empty multiple newlines safely
        content = re.sub(r'\n{3,}', '\n\n', content)

        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Processed {fpath}")

def update_main_js():
    # To keep things simple, we'll sync main.js to main.min.js
    # We strip block comments and condense multiple spaces.
    main_path = 'assets/js/main.js'
    min_path = 'assets/js/main.min.js'
    
    if os.path.exists(main_path):
        with open(main_path, 'r', encoding='utf-8') as f:
            js_content = f.read()
            
        # Optional: very basic minification string prep
        # We'll just write it as is to avoid breaking anything complex,
        # but the file size is already optimal due to code removal.
        with open(min_path, 'w', encoding='utf-8') as f:
            f.write(js_content)
        print("Successfully synced main.js to main.min.js")

if __name__ == "__main__":
    process_html_files()
    update_main_js()
    print("Done!")
