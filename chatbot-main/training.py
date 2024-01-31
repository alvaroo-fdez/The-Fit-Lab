import random
import json
import pickle
import numpy as np
import spacy
import nltk
from nltk.stem import WordNetLemmatizer
from keras.models import Sequential
from keras.layers import Embedding, LSTM, Dense, Dropout, Bidirectional
from keras.optimizers import Adam
from keras.regularizers import l2
from keras.utils import to_categorical

# Cargar el modelo de spacy con embeddings preentrenados (GloVe)
nlp = spacy.load('en_core_web_md')

intents = json.loads(open('chatbot-main\intents.json').read())

# nltk.download('punkt')
# nltk.download('wordnet')
# nltk.download('omw-1.4')

lemmatizer = WordNetLemmatizer()

words = []
classes = []
documents = []
ignore_letters = ['?', '!', '¿', '.', ',']

# Clasifica los patrones y las categorías
for intent in intents['intents']:
    for pattern in intent['patterns']:
        word_list = nltk.word_tokenize(pattern)
        words.extend(word_list)
        documents.append((word_list, intent["tag"]))
        if intent["tag"] not in classes:
            classes.append(intent["tag"])

words = [lemmatizer.lemmatize(word.lower()) for word in words if word not in ignore_letters]
words = sorted(set(words))

# Crear una matriz de embeddings para tus palabras
embedding_matrix = np.zeros((len(words), nlp.vocab.vectors_length))

for i, word in enumerate(words):
    embedding_matrix[i] = nlp(word).vector

pickle.dump(words, open('words.pkl', 'wb'))
pickle.dump(classes, open('classes.pkl', 'wb'))

# Pasa la información a unos y ceros según las palabras presentes en cada categoría para hacer el entrenamiento
training = []
output_empty = [0] * len(classes)
for document in documents:
    bag = []
    word_patterns = document[0]
    word_patterns = [lemmatizer.lemmatize(word.lower()) for word in word_patterns]
    for word in words:
        bag.append(1) if word in word_patterns else bag.append(0)
    output_row = list(output_empty)
    output_row[classes.index(document[1])] = 1
    training.append([bag, classes.index(document[1])])

random.shuffle(training)

# Reparte los datos para pasarlos a la red
train_x = np.array([i[0] for i in training])
train_y = np.array([i[1] for i in training])

# Imprimir las dimensiones para verificar
print("train_x shape:", train_x.shape)
print("train_y shape:", train_y.shape)

# Creamos la red neuronal
model = Sequential()
model.add(Embedding(input_dim=len(words), output_dim=nlp.vocab.vectors_length, input_length=len(train_x[0]), weights=[embedding_matrix], trainable=False))
model.add(Bidirectional(LSTM(128, return_sequences=True)))
model.add(Dropout(0.5))
model.add(Bidirectional(LSTM(64)))
model.add(Dropout(0.5))
model.add(Dense(len(classes), activation='softmax', kernel_regularizer=l2(0.01)))

# Creamos el optimizador y lo compilamos
adam = Adam(learning_rate=0.01)
model.compile(loss='sparse_categorical_crossentropy', optimizer=adam, metrics=['accuracy'])

# Entrenamos el modelo y lo guardamos
train_process = model.fit(np.array(train_x), np.array(train_y), epochs=150, batch_size=5, verbose=1)
model.save("chatbot_model.h5", train_process)
