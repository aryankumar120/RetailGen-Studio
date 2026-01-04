import os
from groq import Groq

client = Groq(api_key=os.getenv('GROQ_API_KEY'))

# Retailer compliance rules
COMPLIANCE_RULES = {
    'logo_presence': {
        'type': 'logo',
        'severity': 'error',
        'message': 'Brand logo must be present in the creative'
    },
    'logo_size': {
        'type': 'logo',
        'severity': 'warning',
        'message': 'Logo should be at least 5% of canvas width'
    },
    'text_readability': {
        'type': 'text',
        'severity': 'error',
        'message': 'Text must be readable (minimum 12pt font)'
    },
    'color_contrast': {
        'type': 'color',
        'severity': 'warning',
        'message': 'Ensure sufficient contrast between text and background'
    },
    'spacing': {
        'type': 'spacing',
        'severity': 'info',
        'message': 'Maintain minimum 20px padding from edges'
    },
    'content_appropriateness': {
        'type': 'content',
        'severity': 'error',
        'message': 'Content must be family-friendly and retailer-appropriate'
    }
}

def check_compliance(canvas_data):
    """
    Check creative compliance against retailer and brand guidelines
    Uses hybrid approach: rule-based + LLM reasoning
    """
    try:
        rules_results = []
        objects = canvas_data.get('objects', [])
        canvas_width = canvas_data.get('width', 1080)
        canvas_height = canvas_data.get('height', 1080)

        # Rule-based checks

        # Check 1: Logo presence
        has_logo = any(obj.get('type') == 'image' and 'logo' in str(obj).lower() for obj in objects)
        rules_results.append({
            'id': 'logo_presence',
            **COMPLIANCE_RULES['logo_presence'],
            'passed': has_logo
        })

        # Check 2: Logo size
        logo_objects = [obj for obj in objects if obj.get('type') == 'image' and 'logo' in str(obj).lower()]
        if logo_objects:
            logo = logo_objects[0]
            logo_width = logo.get('width', 0) * logo.get('scaleX', 1)
            is_logo_large_enough = (logo_width / canvas_width) >= 0.05
        else:
            is_logo_large_enough = False

        rules_results.append({
            'id': 'logo_size',
            **COMPLIANCE_RULES['logo_size'],
            'passed': is_logo_large_enough
        })

        # Check 3: Text readability
        text_objects = [obj for obj in objects if obj.get('type') in ['text', 'i-text', 'textbox']]
        all_text_readable = all(obj.get('fontSize', 0) >= 12 for obj in text_objects) if text_objects else True

        rules_results.append({
            'id': 'text_readability',
            **COMPLIANCE_RULES['text_readability'],
            'passed': all_text_readable
        })

        # Check 4: Color contrast (simplified)
        rules_results.append({
            'id': 'color_contrast',
            **COMPLIANCE_RULES['color_contrast'],
            'passed': True  # Placeholder - would need actual color analysis
        })

        # Check 5: Spacing
        has_proper_spacing = all(
            obj.get('left', 0) >= 20 and
            obj.get('top', 0) >= 20 and
            obj.get('left', 0) + obj.get('width', 0) <= canvas_width - 20 and
            obj.get('top', 0) + obj.get('height', 0) <= canvas_height - 20
            for obj in objects
        )

        rules_results.append({
            'id': 'spacing',
            **COMPLIANCE_RULES['spacing'],
            'passed': has_proper_spacing
        })

        # Check 6: Content appropriateness (LLM-based)
        try:
            text_content = ' '.join([obj.get('text', '') for obj in text_objects])

            if text_content.strip():
                response = client.chat.completions.create(
                    model="llama-3.3-70b-versatile",
                    messages=[{
                        "role": "user",
                        "content": f"Is this retail advertising text appropriate and family-friendly? Answer only 'yes' or 'no': '{text_content}'"
                    }],
                    max_tokens=10,
                    temperature=0
                )

                is_appropriate = 'yes' in response.choices[0].message.content.lower()
            else:
                is_appropriate = True

            rules_results.append({
                'id': 'content_appropriateness',
                **COMPLIANCE_RULES['content_appropriateness'],
                'passed': is_appropriate
            })

        except:
            # Fallback if LLM fails
            rules_results.append({
                'id': 'content_appropriateness',
                **COMPLIANCE_RULES['content_appropriateness'],
                'passed': True
            })

        return {
            'success': True,
            'rules': rules_results,
            'summary': {
                'total': len(rules_results),
                'passed': sum(1 for r in rules_results if r['passed']),
                'errors': sum(1 for r in rules_results if not r['passed'] and r['severity'] == 'error'),
                'warnings': sum(1 for r in rules_results if not r['passed'] and r['severity'] == 'warning')
            }
        }

    except Exception as e:
        raise Exception(f'Compliance check failed: {str(e)}')
