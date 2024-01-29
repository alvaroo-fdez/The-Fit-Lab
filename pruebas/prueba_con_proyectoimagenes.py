from keras.models import load_model
import cv2  
import numpy as np

np.set_printoptions(suppress=True)

model = load_model(r"modelos\modelo_imagenes\keras_model.h5", compile=False)

class_names = open(r"modelos\modelo_imagenes\labels.txt", "r").readlines()

camera = cv2.VideoCapture(0)

while True:
    ret, image = camera.read()

    image = cv2.resize(image, (224, 224), interpolation=cv2.INTER_AREA)

    cv2.imshow("Webcam", image)

    image = np.asarray(image, dtype=np.float32).reshape(1, 224, 224, 3)

    # Normalize the image array
    image = (image / 127.5) - 1

    # Predicts the model
    prediction = model.predict(image)
    index = np.argmax(prediction)
    class_name = class_names[index]
    confidence_score = prediction[0][index]

    # Print prediction and confidence score
    print("Clase:", class_name[2:], end="")
    print("Confiabilidad:", str(np.round(confidence_score * 100))[:-2], "%")

    # Listen to the keyboard for presses.
    keyboard_input = cv2.waitKey(1)

    # Salir del bucle si se presiona 'q'
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

camera.release()
cv2.destroyAllWindows()
