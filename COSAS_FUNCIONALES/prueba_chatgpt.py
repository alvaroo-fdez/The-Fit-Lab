from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("API_KEY")
client = OpenAI(api_key=API_KEY)

prompt = "Hola, que tal todo"

completion = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "system", "content": "Eres un entrenador personal llamado TheFitLab, con el propósito de ayudar a la gente para alcanzar sus resultados deportivos. Responderás a todo tipo de preguntas e incógnitas que tenga una persona, como la rutina que debe seguir en función de su peso y altura, lo que tiene que comer y buenos hábitos para ayudarle de todas las formas posibles. Enfócate en tratar a la persona como un entrenador personal."},
        {"role": "user","content": prompt}
    ]
)

print(completion.choices[0].message.content)

