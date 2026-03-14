from fastapi import FastAPI
import numpy as np
from tensorflow.keras.models import load_model

app = FastAPI()

# Load trained models
lstm_model = load_model("model/lstm_model.h5")
gru_model = load_model("model/gru_model.h5")


def preprocess(readings):
    sequence = []

    for r in readings:
        sequence.append([
            r["temperature"],
            r["vibration"],
            r["pressure"]
        ])

    return np.array([sequence])


@app.post("/predict")
def predict(data: dict):

    readings = data["readings"]

    processed = preprocess(readings)

    lstm_output = lstm_model.predict(processed)[0][0]
    gru_output = gru_model.predict(processed)[0][0]

    failure_probability = float((lstm_output + gru_output) / 2)

    anomaly = True if failure_probability > 0.8 else False

    return {
        "lstm_score": float(lstm_output),
        "gru_score": float(gru_output),
        "failure_probability": failure_probability,
        "anomaly": anomaly
    }