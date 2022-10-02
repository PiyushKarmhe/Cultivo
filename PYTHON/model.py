import sys, json
import os
# Disable
def blockPrint():
    sys.stdout = open(os.devnull, 'w')

# Restore
def enablePrint():
    sys.stdout = sys.__stdout__

blockPrint()

import numpy as np
import pickle
from tensorflow import keras

labels = ['rice' ,'maize' ,'chickpea' ,'kidneybeans' ,'pigeonpeas' ,'mothbeans'
 ,'mungbean' ,'blackgram' ,'lentil' ,'pomegranate' ,'banana' ,'mango' ,'grapes'
 ,'watermelon' ,'muskmelon' ,'apple' ,'orange' ,'papaya' ,'coconut' ,'cotton'
 ,'jute' ,'coffee']

dirname = os.path.dirname(__file__)

filename = os.path.join(dirname, '../ML/Models/Testing_model1.h5')
model = keras.models.load_model(filename)

filename = os.path.join(dirname, '../ML/scaler.pickle')
with open(filename, 'rb') as handle:
    scaler = pickle.load(handle)

# data = json.loads(sys.argv[1])  
# data = data['params'] 
data = [30,28,30,32,52,5,98]

test = scaler.transform(np.array([data]))
prediction = np.argmax(model.predict(test))
enablePrint()

print(labels[prediction])