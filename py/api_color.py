from flask import Flask, request, jsonify
from flask_cors import CORS  # Importar CORS
from tensorflow.keras.models import load_model
from PIL import Image
import numpy as np
import joblib
import os

app = Flask(__name__)

# Configurar CORS
CORS(app)  # Esto permite todas las solicitudes CORS

# Cargar el modelo y el label encoder
model = load_model('modelo_color.h5')
label_encoder = joblib.load('label_encoder.pkl')

def preprocess_image(file, image_size=(128, 128)):
    # Procesar la imagen
    img = Image.open(file).resize(image_size)
    img_array = np.array(img) / 255.0  # Normalizar la imagen
    img_array = np.expand_dims(img_array, axis=0)  # Agregar una dimensión para el lote
    return img_array

@app.route('/predict', methods=['POST'])
def predict_color():
    if 'file' not in request.files:
        print("No file part")
        return jsonify({'error': 'No file uploaded'}), 400
    
    file = request.files['file']
    if file.filename == '':
        print("No selected file")
        return jsonify({'error': 'No selected file'}), 400
    
    print(f"Received file: {file.filename}") 

    # Preprocesar la imagen
    try:
        img_array = preprocess_image(file)
    except Exception as e:
        print("Error processing the image:", e)
        return jsonify({'error': 'Error processing the image'}), 500
    
    # Hacer la predicción
    try:
        prediction = model.predict(img_array)
        predicted_label = np.argmax(prediction, axis=1)

        if predicted_label[0] in range(len(label_encoder.classes_)):
            predicted_color_name = label_encoder.inverse_transform(predicted_label)
        else:
            predicted_color_name = ["Color desconocido"]

        return jsonify({'predicted_color': predicted_color_name[0]})
    except Exception as e:
        print("Error during prediction:", e)
        return jsonify({'error': 'Error during prediction'}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=os.environ.get('PORT', 5000), debug=True)

