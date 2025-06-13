from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
from openai import OpenAI

# Load environment variables
load_dotenv()

# Initialize OpenAI client
client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

app = Flask(__name__)
CORS(app)

# Get environment variables with defaults
PORT = int(os.getenv('PORT', 5000))
ENV = os.getenv('FLASK_ENV', 'production')
DEBUG = ENV == 'development'


@app.route('/server-configuration', methods=['GET'])
def server_configuration():
    return jsonify({
        'debug': DEBUG,
        'port': PORT,
        'env': ENV
    })
        

@app.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        user_message = data.get('message')

        if not user_message:
            return jsonify({'error': 'No message provided'}), 400

        # Updated system context for Sales & Marketing
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "system",
                    "content": "You are Intelligent-System, an expert Sales & Marketing assistant. "
                               "You specialize in helping businesses with sales strategies, marketing campaigns, "
                               "lead generation, customer acquisition, conversion optimization, brand building, "
                               "digital marketing, social media marketing, email marketing, content marketing, "
                               "sales funnels, customer retention, market analysis, competitive research, "
                               "pricing strategies, and business growth tactics. "
                               "Provide actionable, data-driven advice and strategies that can help businesses "
                               "increase revenue, improve marketing ROI, and scale their operations effectively. "
                               "Always focus on practical solutions that deliver measurable results."
                },
                {
                    "role": "user",
                    "content": user_message
                }
            ]
        )

        return jsonify({
            'response': response.choices[0].message.content
        })

    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@app.errorhandler(404)
def not_found(e):
    return jsonify({'error': 'Not found'}), 404

@app.errorhandler(500)
def server_error(e):
    return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    app.run(
        host='0.0.0.0',
        port=PORT,
        debug=DEBUG
    )