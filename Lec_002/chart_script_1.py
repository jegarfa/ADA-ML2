import plotly.graph_objects as go
import plotly.io as pio

# Data
tree_depth = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
training_accuracy = [0.75, 0.82, 0.87, 0.91, 0.94, 0.96, 0.98, 0.99, 1.0, 1.0, 1.0, 1.0]
validation_accuracy = [0.74, 0.80, 0.85, 0.88, 0.89, 0.88, 0.86, 0.83, 0.80, 0.77, 0.75, 0.73]

fig = go.Figure()

# Add training accuracy line
fig.add_trace(go.Scatter(
    x=tree_depth,
    y=training_accuracy,
    mode='lines+markers',
    name='Training',
    line=dict(color='#1FB8CD'),
    cliponaxis=False
))

# Add validation accuracy line
fig.add_trace(go.Scatter(
    x=tree_depth,
    y=validation_accuracy,
    mode='lines+markers',
    name='Validation',
    line=dict(color='#DB4545'),
    cliponaxis=False
))

fig.update_layout(
    title='Decision Tree Overfitting',
    legend=dict(orientation='h', yanchor='bottom', y=1.05, xanchor='center', x=0.5)
)

fig.update_xaxes(title='Tree Depth')
fig.update_yaxes(title='Accuracy')

fig.write_image('overfitting_chart.png')