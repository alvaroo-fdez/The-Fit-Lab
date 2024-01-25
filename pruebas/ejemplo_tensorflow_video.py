import cv2
import tensorflow as tf
import numpy as np

def preprocesar_imagen(imagen):
    # Realizar cualquier preprocesamiento necesario
    # (ajustar tamaño, normalizar píxeles, etc.)
    imagen = cv2.resize(imagen, (100, 100))
    imagen = imagen / 255.0  # Normalizar los píxeles a valores entre 0 y 1
    imagen_aplanada = imagen.flatten()  # Aplanar la imagen
    return imagen_aplanada[:14739].reshape((1, -1))  # Asegurar que tenga la forma correcta

# Cargar el modelo previamente exportado
model_path = "modelo_alvaro-1_convertido\modelo_saved_model"
model = tf.keras.models.load_model(model_path)

model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])

model.summary()

# Inicializar la cámara
cap = cv2.VideoCapture(0)

# Dimensiones para redimensionar la imagen antes de aplanarla
ancho_esperado = 100
alto_esperado = 100

while True:
    # Capturar un cuadro de la cámara
    
    ret, frame = cap.read()
    
    print("Valor de ret:", ret)
    
    frame = cv2.flip(frame, 1)

    input = preprocesar_imagen(frame)

    # Realizar la inferencia con el modelo
    predictions = model.predict(input)

    # Obtener la clase predicha
    predicted_class = np.argmax(predictions)
    
    print("Predicciones del modelo:", predictions)

    # Mostrar el resultado en la pantalla
    cv2.putText(frame, f'Clase: {predicted_class}', (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
    cv2.imshow("Inferencias en Tiempo Real", frame)

    # Salir del bucle si se presiona 'q'
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Liberar la cámara y cerrar la ventana
cap.release()
cv2.destroyAllWindows()