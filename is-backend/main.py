from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Configure OpenAI client (New SDK)
client = openai.OpenAI(api_key=os.getenv('OPENAI_API_KEY'))


@app.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        user_message = data.get('message')

        if not user_message:
            return jsonify({'error': 'No message provided'}), 400

        # New SDK usage
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "system",
                    "content": "You are Intelligent-System, a healthcare assistant. "
                               "Provide accurate, helpful medical information while being clear that "
                               "you are not a replacement for professional medical advice."
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


if __name__ == '__main__':
    app.run(debug=True)
