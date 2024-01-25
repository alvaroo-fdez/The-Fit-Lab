# Importar librerías
import numpy as np
import cv2
import tensorflow.keras as tf   

# Cargar el modelo
model = tf.models.load_model('models\my-pose-model')

# Leer la imagen
img = cv2.imread('img\Camo Snapshot 2024-01-25 - 12-32-45.jpg')

# Preprocesar la imagen
img = cv2.resize(img, (224, 224)) # Redimensionar a 224x224 píxeles
img = img / 255.0 # Normalizar los valores de los píxeles entre 0 y 1
img = np.expand_dims(img, axis=0) # Añadir una dimensión extra para el batch

# Hacer la predicción
pred = model.predict(img) # Devuelve un array con la probabilidad de cada clase
pred_class = np.argmax(pred) # Devuelve el índice de la clase con mayor probabilidad
pred_prob = pred[0][pred_class] # Devuelve la probabilidad de la clase elegida

# Definir las etiquetas de las clases
labels = ['Perro', 'Gato']

# Mostrar el resultado
cv2.putText(img, f'{labels[pred_class]}: {pred_prob:.2f}', (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2) # Escribir el nombre de la clase y la probabilidad en la imagen
cv2.imshow('Imagen', img) # Mostrar la imagen
cv2.waitKey(0) # Esperar a que se pulse una tecla
cv2.destroyAllWindows() # Cerrar todas las ventanas
