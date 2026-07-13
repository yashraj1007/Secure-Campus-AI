from google import genai
from config import Config

client = genai.Client(api_key=Config.GEMINI_API_KEY)

print("Available Gemini Models:\n")

for model in client.models.list():
    print(model.name)