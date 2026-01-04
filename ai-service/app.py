from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
import sys

# Load .env from root directory
root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
load_dotenv(os.path.join(root_dir, '.env'))

from services.background_removal import remove_background
from services.layout_engine import generate_layout_suggestions
from services.compliance_checker import check_compliance
from services.image_optimizer import optimize_image

app = Flask(__name__)
CORS(app)

# Ensure temp directory exists
os.makedirs(os.getenv('TEMP_DIR', './temp'), exist_ok=True)

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok', 'service': 'RetailGen AI Service'})

@app.route('/remove-background', methods=['POST'])
def remove_bg():
    try:
        data = request.json
        image_url = data.get('imageUrl')

        if not image_url:
            return jsonify({'error': 'imageUrl is required'}), 400

        result = remove_background(image_url)
        return jsonify(result)

    except Exception as e:
        print(f'Error in remove-background: {e}')
        return jsonify({'error': str(e)}), 500

@app.route('/generate-layouts', methods=['POST'])
def generate_layouts():
    try:
        data = request.json
        canvas_data = data.get('canvas')

        if not canvas_data:
            return jsonify({'error': 'canvas data is required'}), 400

        result = generate_layout_suggestions(canvas_data)
        return jsonify(result)

    except Exception as e:
        print(f'Error in generate-layouts: {e}')
        return jsonify({'error': str(e)}), 500

@app.route('/check-compliance', methods=['POST'])
def check_comp():
    try:
        data = request.json
        canvas_data = data.get('canvas')

        if not canvas_data:
            return jsonify({'error': 'canvas data is required'}), 400

        result = check_compliance(canvas_data)
        return jsonify(result)

    except Exception as e:
        print(f'Error in check-compliance: {e}')
        return jsonify({'error': str(e)}), 500

@app.route('/optimize-image', methods=['POST'])
def optimize_img():
    try:
        data = request.json
        image_url = data.get('imageUrl')
        max_size = data.get('maxSize', 500000)

        if not image_url:
            return jsonify({'error': 'imageUrl is required'}), 400

        result = optimize_image(image_url, max_size)
        return jsonify(result)

    except Exception as e:
        print(f'Error in optimize-image: {e}')
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    port = int(os.getenv('AI_SERVICE_PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
