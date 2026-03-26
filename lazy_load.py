import os
import glob
import re

html_files = glob.glob('*.html') + glob.glob('assets/partials/*.html')

for file_path in html_files:
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Regex to find <img ...> tags
        def add_lazy(match):
            img_tag = match.group(0)
            # If already has loading= or fetchpriority=high, or is logo, skip
            if 'loading=' in img_tag or 'fetchpriority="high"' in img_tag or 'logo' in img_tag:
                return img_tag
            # Otherwise, insert loading="lazy" right after <img 
            return img_tag.replace('<img ', '<img loading="lazy" ')

        new_content = re.sub(r'<img\s+[^>]+>', add_lazy, content)
        
        if new_content != content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Added lazy loading to images in {file_path}")
    except Exception as e:
        print(f"Failed to update {file_path}: {e}")
