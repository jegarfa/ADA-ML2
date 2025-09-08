import plotly.graph_objects as go
import json

# Data from the provided JSON
data = {
    "probabilities": [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
    "entropy": [0.0, 0.469, 0.722, 0.881, 0.971, 1.0, 0.971, 0.881, 0.722, 0.469, 0.0],
    "gini": [0.0, 0.18, 0.32, 0.42, 0.48, 0.5, 0.48, 0.42, 0.32, 0.18, 0.0]
}

# Create the figure
fig = go.Figure()

# Add entropy trace
fig.add_trace(go.Scatter(
    x=data["probabilities"],
    y=data["entropy"],
    mode='lines+markers',
    name='Entropy',
    line=dict(color='#1FB8CD', width=3),
    marker=dict(size=6),
    cliponaxis=False
))

# Add Gini index trace
fig.add_trace(go.Scatter(
    x=data["probabilities"],
    y=data["gini"],
    mode='lines+markers',
    name='Gini Index',
    line=dict(color='#DB4545', width=3),
    marker=dict(size=6),
    cliponaxis=False
))

# Update layout
fig.update_layout(
    title='Entropy vs Gini Index',
    xaxis_title='Probability',
    yaxis_title='Impurity',
    legend=dict(orientation='h', yanchor='bottom', y=1.05, xanchor='center', x=0.5)
)

# Update axes
fig.update_xaxes(range=[0, 1])
fig.update_yaxes(range=[0, 1.1])

# Save the chart
fig.write_image("entropy_gini_comparison.png")