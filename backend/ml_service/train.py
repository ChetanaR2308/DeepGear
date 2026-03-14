import numpy as np
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, GRU, Dense

X = np.random.rand(1000, 30, 3)
y = np.random.rand(1000, 1)

model = Sequential([
    LSTM(64, input_shape=(30, 3)),
    Dense(1, activation="sigmoid")
])

model.compile(optimizer="adam", loss="binary_crossentropy")
model.fit(X, y, epochs=5)

model.save("model/lstm_model.h5")