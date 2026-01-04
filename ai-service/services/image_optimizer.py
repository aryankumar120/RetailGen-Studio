import base64
import io
import requests
from PIL import Image

def optimize_image(image_url, max_size=500000):
    """
    Optimize image to be under specified size (default 500KB)
    """
    try:
        # Handle data URL or regular URL
        if image_url.startswith('data:image'):
            header, encoded = image_url.split(',', 1)
            image_data = base64.b64decode(encoded)
            image = Image.open(io.BytesIO(image_data))
        else:
            response = requests.get(image_url)
            image = Image.open(io.BytesIO(response.content))

        # Start with quality 90
        quality = 90
        output = io.BytesIO()

        while quality > 10:
            output.seek(0)
            output.truncate()

            # Save with current quality
            image.save(output, format='JPEG', quality=quality, optimize=True)

            size = output.tell()

            if size <= max_size:
                break

            # Reduce quality for next iteration
            quality -= 5

        # Convert to base64
        output.seek(0)
        img_str = base64.b64encode(output.getvalue()).decode()
        result_url = f"data:image/jpeg;base64,{img_str}"

        return {
            'success': True,
            'imageUrl': result_url,
            'size': size,
            'quality': quality,
            'message': f'Image optimized to {size} bytes at {quality}% quality'
        }

    except Exception as e:
        raise Exception(f'Failed to optimize image: {str(e)}')
