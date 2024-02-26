import cv2
import os
import numpy as np

def video_a_fotos(video_path, output_path, target_size=(1080, 1080), frame_interval=1):
    # Abre el video
    cap = cv2.VideoCapture(video_path)
    
    # Verifica si el video se abrió correctamente
    if not cap.isOpened():
        print("Error al abrir el video.")
        return
    
    # Obtiene la información del video
    fps = cap.get(cv2.CAP_PROP_FPS)
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    
    # Calcula el intervalo de frames
    intervalo = int(fps * frame_interval)
    
    # Crea la carpeta de salida si no existe
    os.makedirs(output_path, exist_ok=True)
    
    # Itera sobre los frames y guarda las imágenes
    for i in range(0, total_frames, intervalo):
        cap.set(cv2.CAP_PROP_POS_FRAMES, i)
        ret, frame = cap.read()
        if ret:
            # Resize de la imagen con relleno negro
            height, width = frame.shape[:2]
            new_frame = np.zeros((target_size[1], target_size[0], 3), dtype=np.uint8)
            scale = min(target_size[0] / width, target_size[1] / height)
            new_width = int(width * scale)
            new_height = int(height * scale)
            resized_frame = cv2.resize(frame, (new_width, new_height))
            
            # Calcula las coordenadas para centrar la imagen en el fondo negro
            x_offset = (target_size[0] - new_width) // 2
            y_offset = (target_size[1] - new_height) // 2
            
            # Copia la imagen redimensionada en el fondo negro
            new_frame[y_offset:y_offset+new_height, x_offset:x_offset+new_width] = resized_frame
            
            # Guarda la imagen
            nombre_archivo = os.path.join(output_path, f"frame_{i}.png")
            cv2.imwrite(nombre_archivo, new_frame)
            print(f"Guardado: {nombre_archivo}")
    
    # Libera los recursos
    cap.release()

# Especifica la ruta del video de entrada y la carpeta de salida para las imágenes
video_path = 'C:\\Users\\Moises-pc\\Desktop\\fotos_modelos\\VID_20240224_170143.mp4'
output_folder = 'C:\\Users\\Moises-pc\\Desktop\\fotos_modelos\\sentadilla_100'

# Llama a la función para convertir el video a imágenes
video_a_fotos(video_path, output_folder, frame_interval=0.25)
