from flask import Flask, request, jsonify
import pandas as pd
import joblib
import numpy as np
import time
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split, KFold, cross_val_score
from sklearn.metrics import classification_report, confusion_matrix
from sklearn.tree import DecisionTreeClassifier
import warnings
warnings.filterwarnings("ignore")
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Ana veri okundu
df = pd.read_csv("KullanılacakVeri.csv")


# Veri setini incelemek
df.info()
df.describe()

# Etkisi az olan semptom ve hastalık verilerini çıkarma
grouped = df.groupby("diseases").max()
semptom_sayisi = grouped.sum()
hastalik_sayisi = grouped.sum(axis=1)

filtered_diseases = hastalik_sayisi[hastalik_sayisi <= 3].index
df_filtered = df[~df['diseases'].isin(filtered_diseases)]

filtered_symptoms = semptom_sayisi[semptom_sayisi <= 3].index
df_filtered = df_filtered.drop(columns=filtered_symptoms)

# Benzersiz hastalıkları bulduk
unique_diseases = df_filtered["diseases"].unique()

# Hastalıkları ve semptomlarını sözlük haline getirdik
df_dictionary = {}
for disease in unique_diseases:
    df_dictionary[disease] = df_filtered[df_filtered["diseases"] == disease]

# Tablolardaki semptomların oranını hesaplama
for disease in df_dictionary:  # disease, hastalık adları
    df_new = df_dictionary[disease]  # hastalığa ait DataFrame
    for k in df_new.columns:  # k, hastalıklara ait sütunlar (semptomlar)
        if k != 'diseases':  # 'diseases' sütunu hariç diğer sütunlar (semptomlar)
            oran = df_new[k].sum() / len(df_new)  # semptomun toplamı / satır sayısı
            for index, value in df_new[k].items():  # sütundaki her bir değeri gez
                if value == 1:  # semptom varsa (değer 1 ise)
                    df_new.at[index, k] = oran  # bu değeri oran ile güncelle

df_finaldataset = pd.concat(df_dictionary, ignore_index=True)

# Train Test Dataset
x = df_finaldataset.drop(["diseases"], axis=1)  # Outcome kolonunu çıkarıyoruz başka bir tablo olarak
y = df_finaldataset["diseases"]  # çıkarılan outcome columnunu y tarafına ekliyoruz
x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.25, random_state=42)
scaler = StandardScaler()

x_train_scaled = scaler.fit_transform(x_train)
x_test_scaled = scaler.transform(x_test)

# Modeli eğitme
model = DecisionTreeClassifier()
model.fit(x_train_scaled, y_train)

# Modeli kaydetme
joblib.dump(model, 'disease_predictor_model.pkl')
# Modeli uygulama başlatılırken yükleyin
model = joblib.load('disease_predictor_model.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()  # React'ten gelen veriyi al
    symptoms = data.get("symptoms")  # Gelen semptomları al

    disease_scores = {}

    # Her hastalık için oranların hesaplanması
    for disease in df_filtered["diseases"].unique():
        disease_data = df_filtered[df_filtered["diseases"] == disease]  # Hastalığa ait veriler
        score = 0
        valid_symptoms = 0  # Geçerli semptomları saymak için bir sayaç

        for symptom in symptoms:
            if symptom in disease_data.columns:  # Eğer semptom hastalık verisinde varsa
                score += disease_data[symptom].mean()  # Semptomun ortalama oranını ekle
                valid_symptoms += 1  # Geçerli semptom sayısını artır

        # Normalize edilmiş oran (toplam oranı semptom sayısına böl)
        if valid_symptoms > 0:
            disease_scores[disease] = score / valid_symptoms
        else:
            disease_scores[disease] = 0  # Eğer hiçbir semptom eşleşmezse skor 0 olsun

    # Hastalıkları oranlara göre sıralama
    sorted_diseases = sorted(disease_scores.items(), key=lambda x: x[1], reverse=True)[:5]

    # JSON formatında sonucu döndürme
    return jsonify({'predicted_diseases': sorted_diseases})





if __name__ == '__main__':
    app.run(debug=True)





