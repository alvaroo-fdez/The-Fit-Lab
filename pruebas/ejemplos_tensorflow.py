# TRANSFORMA UN MODELO TENSORFLOW CON TEACHABLE MACHINE PARA SU USO EN PYTHON:
# !tensorflowjs_converter --input_format=tfjs_layers_model --output_format=keras /content/drive/MyDrive/modelo_moises/model.json modelo_moises/modelo_saved_model

import cv2
import numpy as np
import tensorflow as tf

# Cargar el modelo TensorFlow
modelo = tf.keras.models.load_model('modelos/modelo_moises/modelo_saved_model')

# Función para preprocesar la imagen
def preprocesar_imagen(imagen):
    # Realizar cualquier preprocesamiento necesario
    # (ajustar tamaño, normalizar píxeles, etc.)
    imagen = cv2.resize(imagen, (100, 100))
    imagen = imagen / 255.0  # Normalizar los píxeles a valores entre 0 y 1
    imagen_aplanada = imagen.flatten()  # Aplanar la imagen
    imagen_aplanada = np.concatenate((imagen_aplanada, np.zeros(4739)))  # Rellenar con ceros para obtener la forma (1, 14739)
    imagen_aplanada = imagen_aplanada.reshape((1, -1))  # Añadir una dimensión para batch
    return imagen_aplanada

# Función para realizar la predicción con el modelo
def predecir_brazo(imagen):
    imagen_preprocesada = preprocesar_imagen(imagen)
    prediccion = modelo.predict(imagen_preprocesada)
    return prediccion

# Ejemplo de carga de una imagen y realización de la predicción
ruta_imagen = 'moises_gg.jpeg'
imagen = cv2.imread(ruta_imagen, cv2.IMREAD_GRAYSCALE)

# Realizar la predicción
resultado_prediccion = predecir_brazo(imagen)

# Mostrar el resultado
print(resultado_prediccion)




