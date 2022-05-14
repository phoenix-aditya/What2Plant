from tensorflow.keras.models import load_model
import pickle
from pickle import load
import numpy as np
from sklearn.preprocessing import MinMaxScaler

def suggestCrop(N, P, K, temp, humidity, ph, rainfall):
    data = [N, P, K, temp, humidity, ph, rainfall]
    X = np.array([data])

    model = load_model('tf_model/cropPredictor.h5')
    encoding = pickle.load(open('tf_model/encoding.pkl', 'rb'))

    scaler = load(open('tf_model/minMaxScaler.pkl', 'rb'))
    X = scaler.transform(X.reshape(1, -1))

    res = model.predict(X)
    label_index = np.argmax(res, axis=1).tolist()

    suggested_crop = encoding[label_index[0]]

    return {'status':'OK','suggested_crop':suggested_crop}

