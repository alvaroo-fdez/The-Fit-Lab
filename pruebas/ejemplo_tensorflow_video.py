import cv2
import tensorflow as tf
import numpy as np
import time

def preprocesar_imagen(imagen):
    imagen = cv2.resize(imagen, (100, 100))
    imagen = imagen / 255.0
    imagen_aplanada = imagen.flatten()
    return imagen_aplanada[:14739].reshape((1, -1))

# Cargar el modelo previamente exportado
model_path = "modelo_alvaro-2.2_convertido/modelo_saved_model"
model = tf.saved_model.load(model_path)

# Verificar las firmas disponibles
print(model.signatures)

# Usar la firma adecuada para la inferencia
infer = model.signatures["serving_default"]

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

    input_data = preprocesar_imagen(frame)

    # Realizar la inferencia con el modelo
    predictions = infer(dense_Dense1_input=tf.convert_to_tensor(input_data, dtype=tf.float32))

    # Obtener las probabilidades para cada clase
    class_probabilities = predictions['dense_Dense2'].numpy().flatten()

    # Obtener la clase predicha
    predicted_class = np.argmax(class_probabilities)

    print("Probabilidades del modelo:", class_probabilities)

    # Mostrar el resultado en la pantalla
    cv2.putText(frame, f'Clase: {predicted_class}', (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
    
    # Mostrar las probabilidades para cada clase
    for i, prob in enumerate(class_probabilities):
        cv2.putText(frame, f'Prob {i}: {prob:.2f}', (10, 30 + 30 * (i + 1)), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0), 2)

    cv2.imshow("Inferencias en Tiempo Real", frame)

    # Salir del bucle si se presiona 'q'
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Liberar la cámara y cerrar la ventana
cap.release()
cv2.destroyAllWindows()
