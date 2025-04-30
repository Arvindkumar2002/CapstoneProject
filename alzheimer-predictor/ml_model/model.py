import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
import joblib
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout
from tensorflow.keras.utils import to_categorical
import numpy as np

# Load dataset
df = pd.read_csv('alzheimers_disease_data.csv')  # 🔁 Replace with actual CSV file path

# Selected 5 features
features = ['Age', 'Gender', 'BMI', 'MMSE', 'ADL']
X = df[features].values
y = df['Diagnosis'].values  # Make sure this is your target label column

# Train/Test Split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 1️⃣ Random Forest
rf = RandomForestClassifier(n_estimators=100, random_state=42)
rf.fit(X_train, y_train)
joblib.dump(rf, 'rf_model.pkl')

# 2️⃣ SVM
svm = SVC(probability=True)
svm.fit(X_train, y_train)
joblib.dump(svm, 'svm_model.pkl')

# 3️⃣ CNN (Using Dense layers because input is 1D vector, not image)
# One-hot encode the labels for CNN
y_train_cnn = to_categorical(y_train, num_classes=2)
y_test_cnn = to_categorical(y_test, num_classes=2)

cnn = Sequential()
cnn.add(Dense(64, input_shape=(5,), activation='relu'))
cnn.add(Dropout(0.3))
cnn.add(Dense(32, activation='relu'))
cnn.add(Dense(2, activation='softmax'))  # Output layer for binary classification

cnn.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
cnn.fit(X_train, y_train_cnn, epochs=20, batch_size=16, verbose=1, validation_split=0.1)

cnn.save('cnn_model.h5')

print("✅ All models trained and saved successfully.")
