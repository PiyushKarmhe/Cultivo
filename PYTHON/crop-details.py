import pandas as pd
import numpy as np
import sys
import json

# Picking the recommended conditions for the asked crop
df = pd.read_csv("ML/Data/Crop_recommendation.csv")

data = json.loads(sys.argv[1])
data = data["crop"]
data = data.lower().strip()
dfMean = df[df['label'] == data].describe().loc['mean']

nValue = round(dfMean.loc['N'], 2)
pValue = round(dfMean.loc['P'], 2)
kValue = round(dfMean.loc['K'], 2)
temp = round(dfMean.loc['temperature'], 2)
humid = round(dfMean.loc['humidity'], 2)
phValue = round(dfMean.loc['ph'], 2)
rain = round(dfMean.loc['rainfall'], 2)


result = {
    'N': nValue,
    'P': pValue,
    'K': kValue,
    'Temperature': temp,
    'Humidity': humid,
    'pH': phValue,
    'Rainfall': rain,
}

validation = np.isnan([x for x in result.values()])
if (any(validation)):
    result = {
        'N': "NaN",
        'P': "NaN",
        'K': "NaN",
        'Temperature': "NaN",
        'Humidity': "NaN",
        'pH': "NaN",
        'Rainfall': "NaN",
    }

print(json.dumps(result))
