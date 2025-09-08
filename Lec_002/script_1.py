# Create comprehensive exercise problems and solutions
exercises_content = """
# Decision Trees Exercises for Mathematics and Data Science Students

## Exercise 1: Information Gain Calculation

Given the following dataset for predicting whether a person will buy a computer:

Age: ≤30, >30-40, >40
Income: High, Medium, Low  
Student: Yes, No
Credit: Fair, Excellent
Buys Computer: Yes, No

Dataset:
| Age    | Income | Student | Credit    | Buys Computer |
|--------|--------|---------|-----------|---------------|
| ≤30    | High   | No      | Fair      | No           |
| ≤30    | High   | No      | Excellent | No           |
| 30-40  | High   | No      | Fair      | Yes          |
| >40    | Medium | No      | Fair      | Yes          |
| >40    | Low    | Yes     | Fair      | Yes          |
| >40    | Low    | Yes     | Excellent | No           |
| 30-40  | Low    | Yes     | Excellent | Yes          |
| ≤30    | Medium | No      | Fair      | No           |
| ≤30    | Low    | Yes     | Fair      | Yes          |
| >40    | Medium | Yes     | Fair      | Yes          |
| ≤30    | Medium | Yes     | Excellent | Yes          |
| 30-40  | Medium | No      | Excellent | Yes          |
| 30-40  | High   | Yes     | Fair      | Yes          |
| >40    | Medium | No      | Excellent | No           |

**Tasks:**
1. Calculate the initial entropy of the dataset
2. Calculate the information gain for each attribute
3. Determine which attribute should be the root node
4. Build the first level of the decision tree

## Exercise 2: Gini Index Calculation

Using the same dataset from Exercise 1:

**Tasks:**
1. Calculate the initial Gini index of the dataset
2. Calculate the Gini gain for each attribute
3. Compare results with information gain method
4. Discuss differences between entropy and Gini approaches

## Exercise 3: Decision Tree Construction

Build a complete decision tree for the tennis dataset:

**Tasks:**
1. Manually construct the tree using information gain
2. Identify all leaf nodes and their classifications
3. Convert the tree to if-then rules
4. Calculate the accuracy on training data

## Exercise 4: Regression Tree Mathematics

Given points: (1,2), (2,3), (3,7), (4,8), (5,4), (6,6)

**Tasks:**
1. Calculate variance reduction for splitting at x=3.5
2. Determine the best split point
3. Calculate predictions for leaf nodes
4. Build the complete regression tree (max depth = 2)

## Exercise 5: Overfitting Analysis

Consider a decision tree with the following performance:
- Training accuracy: 95%
- Test accuracy: 72%
- Tree depth: 15 levels
- Number of leaf nodes: 128

**Tasks:**
1. Identify signs of overfitting
2. Suggest pruning strategies
3. Calculate optimal tree depth using validation
4. Discuss bias-variance tradeoff

## Exercise 6: Mathematical Proofs

**Tasks:**
1. Prove that entropy reaches maximum when classes are equally distributed
2. Show that Gini index ∈ [0, 0.5] for binary classification
3. Derive the relationship between entropy and information gain
4. Prove that both measures always decrease or stay same after splitting

## Solutions Available in Instructor Notes

### Exercise 1 Solution:
Initial entropy = 0.940
Information gains: Age=0.246, Income=0.029, Student=0.151, Credit=0.048
Root node: Age (highest information gain)

### Exercise 2 Solution:
Initial Gini = 0.459
Gini gains will be calculated similarly, typically giving same ranking as entropy.

*Detailed solutions with step-by-step calculations available in instructor materials.*
"""

print(exercises_content)

# Save exercises to a text file
with open('decision_trees_exercises.txt', 'w') as f:
    f.write(exercises_content)

print("\nExercises saved to decision_trees_exercises.txt")