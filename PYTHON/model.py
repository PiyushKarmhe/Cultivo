import numpy as np
import os
import pickle
from tensorflow import keras


dirname = os.path.dirname(__file__)

filename = os.path.join(dirname, '../ML/Models/Testing_model1.h5')
model = keras.models.load_model(filename)

filename = os.path.join(dirname, '../ML/scaler.pickle')
with open(filename, 'rb') as handle:
    scaler = pickle.load(handle)

labels = ['rice' ,'maize' ,'chickpea' ,'kidneybeans' ,'pigeonpeas' ,'mothbeans'
 ,'mungbean' ,'blackgram' ,'lentil' ,'pomegranate' ,'banana' ,'mango' ,'grapes'
 ,'watermelon' ,'muskmelon' ,'apple' ,'orange' ,'papaya' ,'coconut' ,'cotton'
 ,'jute' ,'coffee']

test_1 = scaler.transform(np.array([[30,28,30,32,52,5,98]]))
prediction = np.argmax(model.predict(test_1))
print(labels[prediction])

# print(labels)
