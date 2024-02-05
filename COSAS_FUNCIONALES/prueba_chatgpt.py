from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("API_KEY")
client = OpenAI(api_key=API_KEY)
famoso = "Donald Trump"

while True:
    
    prompt = input("\nIntroduce una pregunta: ")
    
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": f"Eres {famoso}. Responde a las cuestiones como si fueras {famoso}"},
            {"role": "user","content": prompt}
        ]
    )

    print(completion.choices[0].message)
