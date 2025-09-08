import pandas as pd
import numpy as np

# Create example datasets for exercises
# Dataset 1: Weather prediction for playing tennis
weather_data = {
    'Day': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    'Outlook': ['Sunny', 'Sunny', 'Overcast', 'Rain', 'Rain', 'Rain', 'Overcast', 
                'Sunny', 'Sunny', 'Rain', 'Sunny', 'Overcast', 'Overcast', 'Rain'],
    'Temperature': ['Hot', 'Hot', 'Hot', 'Mild', 'Cool', 'Cool', 'Cool',
                   'Mild', 'Cool', 'Mild', 'Mild', 'Mild', 'Hot', 'Mild'],
    'Humidity': ['High', 'High', 'High', 'High', 'Normal', 'Normal', 'Normal',
                'High', 'Normal', 'Normal', 'Normal', 'High', 'Normal', 'High'],
    'Wind': ['Weak', 'Strong', 'Weak', 'Weak', 'Weak', 'Strong', 'Strong',
            'Weak', 'Weak', 'Weak', 'Strong', 'Strong', 'Weak', 'Strong'],
    'Play': ['No', 'No', 'Yes', 'Yes', 'Yes', 'No', 'Yes', 
            'No', 'Yes', 'Yes', 'Yes', 'Yes', 'Yes', 'No']
}

weather_df = pd.DataFrame(weather_data)
print("Dataset 1: Tennis Playing Decision")
print(weather_df)
print("\n" + "="*50 + "\n")

# Dataset 2: Student performance prediction
student_data = {
    'StudyHours': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    'Attendance': [60, 70, 80, 85, 90, 95, 85, 90, 95, 100],
    'PreviousGrade': [65, 70, 75, 80, 82, 85, 88, 90, 92, 95],
    'Pass': ['No', 'No', 'Yes', 'Yes', 'Yes', 'Yes', 'Yes', 'Yes', 'Yes', 'Yes']
}

student_df = pd.DataFrame(student_data)
print("Dataset 2: Student Performance")
print(student_df)
print("\n" + "="*50 + "\n")

# Create mathematical examples for entropy and gini calculations
# Example node with class distribution
def calculate_entropy(class_counts):
    """Calculate entropy for a given class distribution"""
    total = sum(class_counts)
    if total == 0:
        return 0
    
    entropy = 0
    for count in class_counts:
        if count > 0:
            p = count / total
            entropy -= p * np.log2(p)
    return entropy

def calculate_gini(class_counts):
    """Calculate Gini impurity for a given class distribution"""
    total = sum(class_counts)
    if total == 0:
        return 0
    
    gini = 1
    for count in class_counts:
        p = count / total
        gini -= p**2
    return gini

# Example calculations
print("Mathematical Examples:")
print("Example Node: 6 positive, 4 negative samples")
pos, neg = 6, 4
entropy = calculate_entropy([pos, neg])
gini = calculate_gini([pos, neg])
print(f"Entropy = {entropy:.3f}")
print(f"Gini Index = {gini:.3f}")

print("\nPure Node: 10 positive, 0 negative samples")
pos, neg = 10, 0
entropy = calculate_entropy([pos, neg])
gini = calculate_gini([pos, neg])
print(f"Entropy = {entropy:.3f}")
print(f"Gini Index = {gini:.3f}")

print("\nMaximum Impurity: 5 positive, 5 negative samples")
pos, neg = 5, 5
entropy = calculate_entropy([pos, neg])
gini = calculate_gini([pos, neg])
print(f"Entropy = {entropy:.3f}")
print(f"Gini Index = {gini:.3f}")

# Save datasets to CSV files
weather_df.to_csv('tennis_dataset.csv', index=False)
student_df.to_csv('student_dataset.csv', index=False)

print("\n" + "="*50)
print("Datasets saved as CSV files for exercises!")