import os
import json
import base64
import copy
from openai import OpenAI

client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

def generate_template_preview_svg(template_name, bg_color, accent_color):
    """Generate visual preview of template design"""
    if template_name == "Vibrant Splash":
        svg = f'''<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#FF6B6B;stop-opacity:1" />
                    <stop offset="50%" style="stop-color:#4ECDC4;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#45B7D1;stop-opacity:1" />
                </linearGradient>
                <filter id="shadow">
                    <feDropShadow dx="0" dy="4" stdDeviation="8" flood-opacity="0.3"/>
                </filter>
            </defs>
            <rect width="400" height="400" fill="url(#grad1)"/>
            <circle cx="200" cy="200" r="80" fill="white" opacity="0.2"/>
            <circle cx="200" cy="200" r="60" fill="white" opacity="0.3"/>
            <rect x="140" y="180" width="120" height="140" fill="white" opacity="0.95" rx="12" filter="url(#shadow)"/>
            <text x="200" y="60" font-family="Arial, sans-serif" font-size="32" font-weight="bold" fill="white" text-anchor="middle" letter-spacing="2">NEW DROP</text>
            <text x="200" y="365" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#FFD93D" text-anchor="middle">GET IT NOW</text>
        </svg>'''
    elif template_name == "Premium Dark":
        svg = f'''<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="grad2" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style="stop-color:#1a1a2e;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#16213e;stop-opacity:1" />
                </linearGradient>
                <filter id="glow">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                    <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
            </defs>
            <rect width="400" height="400" fill="url(#grad2)"/>
            <line x1="50" y1="100" x2="350" y2="100" stroke="#FFD700" stroke-width="3"/>
            <rect x="230" y="120" width="130" height="160" fill="white" opacity="0.1" rx="8"/>
            <text x="80" y="260" font-family="Georgia, serif" font-size="48" font-weight="bold" fill="white" filter="url(#glow)">SALE</text>
            <text x="80" y="310" font-family="Arial, sans-serif" font-size="38" font-weight="bold" fill="#FFD700">-50%</text>
            <text x="80" y="345" font-family="Arial, sans-serif" font-size="16" fill="#ccc">Premium Quality</text>
        </svg>'''
    else:  # Pastel Dream
        svg = f'''<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#ffecd2;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#fcb69f;stop-opacity:1" />
                </linearGradient>
            </defs>
            <rect width="400" height="400" fill="url(#grad3)"/>
            <circle cx="320" cy="80" r="40" fill="white" opacity="0.5"/>
            <circle cx="80" cy="320" r="60" fill="white" opacity="0.4"/>
            <rect x="130" y="160" width="140" height="170" fill="white" opacity="0.9" rx="16"/>
            <text x="200" y="370" font-family="Georgia, serif" font-size="28" font-style="italic" fill="#8B4513" text-anchor="middle">Artisan Collection</text>
        </svg>'''

    return 'data:image/svg+xml;base64,' + base64.b64encode(svg.encode()).decode()

def create_template_1(existing_images=[]):
    """Vibrant Splash - Colorful gradient with energetic design"""
    objects = [
        {
            "type": "rect",
            "left": 0,
            "top": 0,
            "width": 1080,
            "height": 1080,
            "fill": {
                "type": "linear",
                "coords": {
                    "x1": 0,
                    "y1": 0,
                    "x2": 1080,
                    "y2": 1080
                },
                "colorStops": [
                    {"offset": 0, "color": "#FF6B6B"},
                    {"offset": 0.5, "color": "#4ECDC4"},
                    {"offset": 1, "color": "#45B7D1"}
                ]
            },
            "selectable": True,
            "evented": True
        },
        {
            "type": "textbox",
            "left": 540,
            "top": 120,
            "width": 700,
            "fontSize": 80,
            "fontFamily": "Arial",
            "fontWeight": "bold",
            "fill": "#ffffff",
            "text": "NEW DROP",
            "textAlign": "center",
            "originX": "center",
            "originY": "top",
            "selectable": True,
            "evented": True
        }
    ]

    # Add existing images in the center
    for img in existing_images:
        img_copy = copy.deepcopy(img)
        img_copy['left'] = 540
        img_copy['top'] = 480
        img_copy['originX'] = 'center'
        img_copy['originY'] = 'center'
        if 'scaleX' not in img_copy:
            img_copy['scaleX'] = 0.65
            img_copy['scaleY'] = 0.65
        objects.append(img_copy)

    objects.append({
        "type": "textbox",
        "left": 540,
        "top": 900,
        "width": 500,
        "fontSize": 56,
        "fontFamily": "Arial",
        "fontWeight": "bold",
        "fill": "#FFD93D",
        "text": "GET IT NOW",
        "textAlign": "center",
        "originX": "center",
        "originY": "top",
        "selectable": True,
        "evented": True
    })

    return {
        "version": "5.3.0",
        "objects": objects
    }

def create_template_2(existing_images=[]):
    """Premium Dark - Luxury dark theme with gold accents"""
    objects = [
        {
            "type": "rect",
            "left": 0,
            "top": 0,
            "width": 1080,
            "height": 1080,
            "fill": {
                "type": "linear",
                "coords": {
                    "x1": 0,
                    "y1": 0,
                    "x2": 0,
                    "y2": 1080
                },
                "colorStops": [
                    {"offset": 0, "color": "#1a1a2e"},
                    {"offset": 1, "color": "#16213e"}
                ]
            },
            "selectable": True,
            "evented": True
        },
        {
            "type": "line",
            "x1": 100,
            "y1": 200,
            "x2": 980,
            "y2": 200,
            "stroke": "#FFD700",
            "strokeWidth": 4,
            "selectable": True,
            "evented": True
        }
    ]

    # Add existing images on the right side
    for img in existing_images:
        img_copy = copy.deepcopy(img)
        img_copy['left'] = 720
        img_copy['top'] = 480
        img_copy['originX'] = 'center'
        img_copy['originY'] = 'center'
        if 'scaleX' not in img_copy:
            img_copy['scaleX'] = 0.55
            img_copy['scaleY'] = 0.55
        objects.append(img_copy)

    objects.extend([
        {
            "type": "textbox",
            "left": 100,
            "top": 580,
            "width": 450,
            "fontSize": 110,
            "fontFamily": "Georgia",
            "fontWeight": "bold",
            "fill": "#ffffff",
            "text": "SALE",
            "originX": "left",
            "originY": "top",
            "selectable": True,
            "evented": True
        },
        {
            "type": "textbox",
            "left": 100,
            "top": 720,
            "width": 450,
            "fontSize": 90,
            "fontFamily": "Arial",
            "fontWeight": "bold",
            "fill": "#FFD700",
            "text": "-50%",
            "originX": "left",
            "originY": "top",
            "selectable": True,
            "evented": True
        },
        {
            "type": "textbox",
            "left": 100,
            "top": 840,
            "width": 450,
            "fontSize": 32,
            "fontFamily": "Arial",
            "fill": "#cccccc",
            "text": "Premium Quality",
            "originX": "left",
            "originY": "top",
            "selectable": True,
            "evented": True
        }
    ])

    return {
        "version": "5.3.0",
        "objects": objects
    }

def create_template_3(existing_images=[]):
    """Pastel Dream - Soft pastel gradient with elegant design"""
    objects = [
        {
            "type": "rect",
            "left": 0,
            "top": 0,
            "width": 1080,
            "height": 1080,
            "fill": {
                "type": "linear",
                "coords": {
                    "x1": 0,
                    "y1": 0,
                    "x2": 1080,
                    "y2": 1080
                },
                "colorStops": [
                    {"offset": 0, "color": "#ffecd2"},
                    {"offset": 1, "color": "#fcb69f"}
                ]
            },
            "selectable": True,
            "evented": True
        },
        {
            "type": "circle",
            "left": 850,
            "top": 100,
            "radius": 90,
            "fill": "#ffffff",
            "opacity": 0.5,
            "selectable": True,
            "evented": True
        },
        {
            "type": "circle",
            "left": 150,
            "top": 850,
            "radius": 130,
            "fill": "#ffffff",
            "opacity": 0.4,
            "selectable": True,
            "evented": True
        }
    ]

    # Add existing images in the center
    for img in existing_images:
        img_copy = copy.deepcopy(img)
        img_copy['left'] = 540
        img_copy['top'] = 420
        img_copy['originX'] = 'center'
        img_copy['originY'] = 'center'
        if 'scaleX' not in img_copy:
            img_copy['scaleX'] = 0.6
            img_copy['scaleY'] = 0.6
        objects.append(img_copy)

    objects.append({
        "type": "textbox",
        "left": 540,
        "top": 900,
        "width": 700,
        "fontSize": 64,
        "fontFamily": "Georgia",
        "fontStyle": "italic",
        "fill": "#8B4513",
        "text": "Artisan Collection",
        "textAlign": "center",
        "originX": "center",
        "originY": "top",
        "selectable": True,
        "evented": True
    })

    return {
        "version": "5.3.0",
        "objects": objects
    }

def generate_layout_suggestions(canvas_data):
    """
    Return pre-designed template options with visual previews
    """
    try:
        # Extract existing images from canvas (deep copy to avoid mutation)
        existing_images = []
        if canvas_data and 'objects' in canvas_data:
            for obj in canvas_data['objects']:
                if obj.get('type') == 'image':
                    existing_images.append(copy.deepcopy(obj))

        suggestions = [
            {
                'id': '1',
                'name': 'Vibrant Splash',
                'description': 'Colorful gradient with energetic vibes - perfect for new launches',
                'thumbnail': generate_template_preview_svg('Vibrant Splash', '#FF6B6B', '#FFD93D'),
                'layout': create_template_1(existing_images)
            },
            {
                'id': '2',
                'name': 'Premium Dark',
                'description': 'Luxury dark theme with gold accents - ideal for high-end sales',
                'thumbnail': generate_template_preview_svg('Premium Dark', '#1a1a2e', '#FFD700'),
                'layout': create_template_2(existing_images)
            },
            {
                'id': '3',
                'name': 'Pastel Dream',
                'description': 'Soft pastel gradient with elegant design - great for artisan products',
                'thumbnail': generate_template_preview_svg('Pastel Dream', '#ffecd2', '#8B4513'),
                'layout': create_template_3(existing_images)
            }
        ]

        return {
            'success': True,
            'suggestions': suggestions
        }

    except Exception as e:
        print(f'Error generating template suggestions: {e}')
        import traceback
        traceback.print_exc()
        return {
            'success': False,
            'suggestions': []
        }
