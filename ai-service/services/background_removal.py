import base64
import io
import requests
from PIL import Image
from rembg import remove

def remove_background(image_url):
    """
    Remove background from an image using rembg (U2Net model)
    """
    try:
        # Handle data URL or regular URL
        if image_url.startswith('data:image'):
            # Extract base64 data
            header, encoded = image_url.split(',', 1)
            image_data = base64.b64decode(encoded)
            input_image = Image.open(io.BytesIO(image_data))
        else:
            # Download image from URL
            response = requests.get(image_url)
            input_image = Image.open(io.BytesIO(response.content))

        # Remove background
        output_image = remove(input_image)

        # Convert to base64
        buffered = io.BytesIO()
        output_image.save(buffered, format="PNG")
        img_str = base64.b64encode(buffered.getvalue()).decode()

        result_url = f"data:image/png;base64,{img_str}"

        return {
            'success': True,
            'imageUrl': result_url,
            'message': 'Background removed successfully'
        }

    except Exception as e:
        raise Exception(f'Failed to remove background: {str(e)}')
