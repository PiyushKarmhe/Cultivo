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
import keras

labels = ['rice' ,'maize' ,'chickpea' ,'kidneybeans' ,'pigeonpeas' ,'mothbeans'
 ,'mungbean' ,'blackgram' ,'lentil' ,'pomegranate' ,'banana' ,'mango' ,'grapes'
 ,'watermelon' ,'muskmelon' ,'apple' ,'orange' ,'papaya' ,'coconut' ,'cotton'
 ,'jute' ,'coffee']

label_seasons = {'rice': 'Kharif', 'maize': 'Kharif', 'chickpea': 'Rabi', 'kidneybeans': 'Whole Year', 'pigeonpeas': 'Kharif', 
                 'mothbeans': 'Kharif', 'mungbean': 'Whole year', 'blackgram': 'Whole Year', 'lentil': 'Rabi', 'pomegranate': 'Kharif', 
                 'banana': 'Kharif', 'mango': 'Rabi', 'grapes': 'Rabi', 'watermelon': 'Kharif', 'muskmelon': 'Zaid', 'apple': 'Kharif', 
                 'orange': 'Rabi', 'papaya': 'Kharif', 'coconut': 'Kharif', 'cotton': 'Kharif', 'jute': 'Kharif', 'coffee': 'Kharif'}

dirname = os.path.dirname(__file__)

filename = os.path.join(dirname, '../ML/Models/Testing_model.h5')
model = keras.models.load_model(filename)

filename = os.path.join(dirname, '../ML/scaler.pickle')
with open(filename, 'rb') as handle:
    scaler = pickle.load(handle)

data = json.loads(sys.argv[1])  
data = data['params'] 
# data = [30,28,30,32,52,5,98]

test = scaler.transform(np.array([data]))
probs = model.predict(test)
best_3 = np.argsort(probs, axis=1)[:,-3:]
best_3_val =  np.partition(probs, -3,axis=None)[-3:]
fin_label=[]
for i in best_3:
    for j in i[::-1]:
        fin_label.append(labels[j])
season = [label_seasons[j] for j in fin_label]
prob_season= []
count=1
for i,j in zip(fin_label,season):
    prob_season.append(f"{count}. {i.upper()} - {j}")
    count+=1
enablePrint()

# print(labels[prediction])

newdata = {'result':prob_season}
# print(newdata)
print(json.dumps(newdata))