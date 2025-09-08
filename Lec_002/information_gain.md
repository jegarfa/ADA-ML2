To perform **decision tree analysis** using **entropy** and **information gain**, we need to:

1. **Compute the overall entropy** of the dataset.

2. **Compute the entropy of each attribute** (Outlook, Temperature, Humidity, Wind) by splitting the data based on each attribute.

3. **Calculate information gain** for each attribute:

---

## ✅ Step 1: Compute the Overall Entropy (Target = Play)

We have 14 instances:

- Yes = 9

- No = 5

---

## ✅ Step 2: Compute Entropy and Information Gain for Each Attribute

---

### 🔹 A. **Outlook** (Sunny, Overcast, Rain)

| Outlook  | Total | Yes | No  | Entropy |
| -------- | ----- | --- | --- | ------- |
| Sunny    | 5     | 2   | 3   |         |
| Overcast | 4     | 4   | 0   | 0.0     |
| Rain     | 5     | 3   | 2   |         |

---

### 🔹 B. **Temperature** (Hot, Mild, Cool)

| Temp | Total | Yes | No  | Entropy |
| ---- | ----- | --- | --- | ------- |
| Hot  | 4     | 2   | 2   | 1.0     |
| Mild | 6     | 4   | 2   |         |
| Cool | 4     | 3   | 1   |         |

---

### 🔹 C. **Humidity** (High, Normal)

| Humidity | Total | Yes | No  | Entropy |
| -------- | ----- | --- | --- | ------- |
| High     | 7     | 3   | 4   |         |
| Normal   | 7     | 6   | 1   |         |

---

### 🔹 D. **Wind** (Weak, Strong)

| Wind   | Total | Yes | No  | Entropy |
| ------ | ----- | --- | --- | ------- |
| Weak   | 8     | 6   | 2   |         |
| Strong | 6     | 3   | 3   | 1.0     |

---

## 📊 Final Results: Information Gain

| Attribute   | Info Gain |
| ----------- | --------- |
| Outlook     | **0.245** |
| Temperature | 0.029     |
| Humidity    | 0.151     |
| Wind        | 0.048     |

---

✅ So the **best attribute to split on** first is **Outlook**, since it has the **highest information gain**.

Would you like to proceed with building the decision tree using this information?
