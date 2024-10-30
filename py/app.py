from flask import Flask, request, jsonify
from api_color import app as color_app

app = Flask(__name__)

# Montar la API de color
app.register_blueprint(color_app, url_prefix='/color')



if __name__ == '__main__':
    app.run(debug=True)
