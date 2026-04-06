from PIL import Image
import os

img_path = r'c:\Users\User\ciphca\assets\img\abstract\abstract-1.webp'
out_path = r'c:\Users\User\ciphca\assets\img\abstract\abstract-1_opt.webp'

if os.path.exists(img_path):
    try:
        with Image.open(img_path) as img:
            img.save(out_path, 'WEBP', quality=80, method=6)
        print(f"Compressed {img_path} to {out_path}")
        # Get sizes
        orig_size = os.path.getsize(img_path)
        opt_size = os.path.getsize(out_path)
        print(f"Original size: {orig_size} bytes")
        print(f"Optimized size: {opt_size} bytes")
    except Exception as e:
        print(f"Error: {e}")
else:
    print(f"File {img_path} not found.")
