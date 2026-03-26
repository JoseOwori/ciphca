import os
import glob

# Get all html files
html_files = glob.glob('*.html') + glob.glob('assets/partials/*.html')

for file_path in html_files:
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Replace CSS
        content = content.replace('"assets/css/main.css"', '"assets/css/main.min.css"')
        content = content.replace('"assets/css/chatbot.css"', '"assets/css/chatbot.min.css"')
        content = content.replace('"assets/css/calendly-custom.css"', '"assets/css/calendly-custom.min.css"')
        
        # Replace JS
        content = content.replace('"assets/js/main.js"', '"assets/js/main.min.js"')
        content = content.replace('"assets/js/chatbot.js"', '"assets/js/chatbot.min.js"')
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {file_path}")
    except Exception as e:
        print(f"Failed to update {file_path}: {e}")
