import streamlit as st
import pandas as pd
import numpy as np
import plotly.express as px
import plotly.graph_objects as go
from datetime import datetime, timedelta

# --- Configuration and Setup ---

# Initialize session state for custom locations and their base data
if 'available_locations' not in st.session_state:
    st.session_state['available_locations'] = ["New York, USA", "Mumbai, India", "London, UK", "Sydney, Australia"]
if 'custom_city_bases' not in st.session_state:
    st.session_state['custom_city_bases'] = {}


# Set Streamlit page config (using default light theme)
st.set_page_config(
    page_title="Climate Change Forecasting Dashboard",
    page_icon="🌍",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Define a set of colors optimized for the default light theme
COLOR_PRIMARY = '#1f77b4'   # Streamlit default blue
COLOR_SECONDARY = '#ff7f0e' # Streamlit default orange (Good for temperature)
COLOR_TERTIARY = '#2ca02c'  # Streamlit default green (Good for humidity/rainfall)
COLOR_WIND = '#d62728'      # Streamlit default red (Good for wind speed)

# Custom CSS for light mode look (primarily for font size and structure)
st.markdown(f"""
    <style>
        /* Main page title font */
        .big-font {{
            font-size: 36px !important;
            font-weight: bold;
            color: {COLOR_PRIMARY}; 
        }}
        /* Minimal styling for metric cards in light mode for structure */
        div[data-testid="stMetric"] {{
            border-radius: 10px;
            padding: 10px 15px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1); /* Subtle shadow for lift */
            border-left: 5px solid {COLOR_PRIMARY};
        }}
        /* User Profile Box */
        .user-profile-box {{
            padding: 10px; 
            border: 1px solid #ccc; /* Light border */
            border-radius: 8px; 
            background-color: #f0f2f6; /* Very light gray background */
            margin-bottom: 20px;
        }}
        .user-profile-box p, .user-profile-box small {{
            color: #333333; /* Dark text for contrast */
        }}
    </style>
    """, unsafe_allow_html=True)


# --- Dummy Data Generation Functions ---

def generate_kpi_data(location):
    """Generates dummy KPI data based on location, dynamically checking custom city bases."""
    # Base data for hardcoded cities
    base_data = {
        'New York, USA': {'temp': 25, 'rain': 10}, 
        'Mumbai, India': {'temp': 30, 'rain': 50}, 
        'London, UK': {'temp': 18, 'rain': 5}, 
        'Sydney, Australia': {'temp': 22, 'rain': 15}
    }

    # Determine base temperature and rainfall
    if location in st.session_state['custom_city_bases']:
        custom_bases = st.session_state['custom_city_bases'][location]
        base_temp = custom_bases['base_temp']
        base_rain = custom_bases['base_rain']
    else:
        # Use hardcoded base or a safe default if not found
        temp_data = base_data.get(location, {'temp': 20, 'rain': 15})
        base_temp = temp_data['temp']
        base_rain = temp_data['rain']
    
    return {
        'Current Temp (°C)': np.round(base_temp + np.random.uniform(-3, 3), 1),
        'Air Quality Index (AQI)': np.random.randint(40, 120),
        '24h Rainfall (mm)': np.round(base_rain + np.random.uniform(-5, 5), 1),
        'Humidity (%)': np.random.randint(50, 90),
        'Location': location
    }

def generate_time_series_data(days=365):
    """Generates dummy time-series data for trend charts."""
    dates = [datetime.now() - timedelta(days=days - i) for i in range(days)]
    df = pd.DataFrame({
        'Date': dates,
        'Temperature (°C)': np.round(20 + 5 * np.sin(np.arange(days) * 2 * np.pi / 365) + np.random.normal(0, 1.5, days), 1),
        'Rainfall (mm)': np.round(np.abs(5 + 10 * np.sin(np.arange(days) * 2 * np.pi / 365 * 2) + np.random.normal(0, 5, days)), 1),
        'Humidity (%)': np.round(60 + 15 * np.cos(np.arange(days) * 2 * np.pi / 365) + np.random.normal(0, 5, days), 1),
        'Wind Speed (km/h)': np.round(5 + 10 * np.random.rand(days), 1)
    })
    df.set_index('Date', inplace=True)
    return df


# --- Plotly Chart Functions ---

def create_mini_line_chart(df, column, color):
    """Creates a small Plotly line chart for KPI trends."""
    fig = px.line(df, y=column, height=80)
    fig.update_traces(line_color=color, line_width=2)
    fig.update_layout(
        margin=dict(l=0, r=0, t=5, b=5),
        plot_bgcolor='rgba(0,0,0,0)',
        paper_bgcolor='rgba(0,0,0,0)',
        showlegend=False,
        yaxis={'visible': False},
        xaxis={'visible': False},
        hovermode="x unified"
    )
    return fig

def create_comparison_chart(df_comp):
    """Creates a grouped bar chart for regional comparison."""
    df_melt = df_comp.melt(id_vars='Location', var_name='Metric', value_name='Value')
    
    fig = px.bar(
        df_melt,
        x='Location',
        y='Value',
        color='Metric',
        barmode='group',
        title='Regional KPI Comparison',
        template='plotly_white',
        height=550,
        color_discrete_map={
            'Current Temp (°C)': COLOR_SECONDARY, 
            '24h Rainfall (mm)': COLOR_PRIMARY,
            'Humidity (%)': COLOR_TERTIARY
        }
    )
    fig.update_layout(
        xaxis_title="Region",
        yaxis_title="Value",
        legend_title="Metric"
    )
    return fig

def create_residual_chart(df_residuals):
    """Creates a placeholder scatter plot for residuals."""
    fig = px.scatter(
        df_residuals,
        x=df_residuals.index,
        y='Residuals',
        title='Model Residuals Scatter Plot (Placeholder)',
        height=400,
        template='plotly_white'
    )
    fig.update_traces(marker=dict(size=8, color=COLOR_SECONDARY, opacity=0.8))
    fig.update_layout(
        xaxis_title="Observation Index",
        yaxis_title="Residual Value",
        hovermode="closest"
    )
    return fig


# --- Page Definitions ---

def page_overview():
    """Page 1: Overview Dashboard"""
    st.markdown('<p class="big-font">🌿 Real-time Overview Dashboard</p>', unsafe_allow_html=True)
    st.markdown("Monitor real-time conditions and 7-day trends for the selected location.")
    st.info("💡 **NOTE:** All data is randomly generated for this prototype, but values are adjusted per location for demonstration.")

    # Use dynamically updated list of locations
    available_locations = st.session_state['available_locations']
    col_loc, col_empty = st.columns([1, 3])
    with col_loc:
        location = st.selectbox("🌍 Select/Enter Location", available_locations)

    kpi_data = generate_kpi_data(location)
    df_trend = generate_time_series_data(days=7)

    st.markdown("---")

    st.subheader(f"Current Status in **{location}**")
    col1, col2, col3, col4 = st.columns(4)

    kpi_map = {
        col1: {"label": "Current Temp (°C)", "value": kpi_data['Current Temp (°C)'], "icon": "🌡️", "trend_col": "Temperature (°C)", "color": COLOR_SECONDARY},
        col2: {"label": "Air Quality Index (AQI)", "value": kpi_data['Air Quality Index (AQI)'], "icon": "💨", "trend_col": "Wind Speed (km/h)", "color": COLOR_WIND},
        col3: {"label": "24h Rainfall (mm)", "value": kpi_data['24h Rainfall (mm)'], "icon": "💧", "trend_col": "Rainfall (mm)", "color": COLOR_PRIMARY},
        col4: {"label": "Humidity (%)", "value": kpi_data['Humidity (%)'], "icon": "💧", "trend_col": "Humidity (%)", "color": COLOR_TERTIARY},
    }

    for col, data in kpi_map.items():
        with col:
            st.metric(label=f"{data['icon']} {data['label']}", value=data['value'])
            st.caption("Last 7-Day Trend")
            st.plotly_chart(create_mini_line_chart(df_trend, data['trend_col'], data['color']), use_container_width=True)

    st.markdown("---")


def page_comparison():
    """Page 2: Regional Comparison"""
    st.markdown('<p class="big-font">🌐 Regional Comparison</p>', unsafe_allow_html=True)
    st.markdown("Compare current climate metrics across different geographical locations.")
    
    # Use dynamically updated list of locations
    available_locations = st.session_state['available_locations']
    
    selected_locations = st.multiselect(
        "Select Locations for Comparison",
        options=available_locations,
        default=available_locations
    )
    
    if not selected_locations:
        st.warning("Please select at least one location for comparison.")
        return

    st.markdown("---")

    comparison_data = [generate_kpi_data(loc) for loc in selected_locations]
    df_comparison = pd.DataFrame(comparison_data).drop(columns=['Air Quality Index (AQI)'])
    
    st.subheader("Current Condition Metrics by Region")
    st.plotly_chart(create_comparison_chart(df_comparison), use_container_width=True)

    st.markdown("---")
    
    st.subheader("Comparison Table")
    st.dataframe(df_comparison.set_index('Location'), use_container_width=True)


def page_model_performance():
    """Page 3: Model Performance (Placeholder)"""
    st.markdown('<p class="big-font">📊 Model Performance Metrics</p>', unsafe_allow_html=True)
    st.markdown("An overview of the forecasting model's accuracy and performance indicators.")
    
    mae = round(np.random.uniform(1.5, 3.5), 2)
    rmse = round(np.random.uniform(2.0, 4.5), 2)
    r2 = round(np.random.uniform(0.85, 0.95), 2)

    st.markdown("---")

    st.subheader("Key Accuracy Metrics")
    col1, col2, col3 = st.columns(3)
    
    col1.metric("Mean Absolute Error (MAE)", f"{mae} °C", delta=f"-{round(mae*0.1, 2)}", delta_color="inverse")
    col2.metric("Root Mean Square Error (RMSE)", f"{rmse} °C", delta=f"-{round(rmse*0.15, 2)}", delta_color="inverse")
    col3.metric("R-squared ($R^2$)", f"{r2}", delta=f"+{round(r2*0.01, 2)}", delta_color="normal")

    st.markdown("---")

    st.subheader("Model Residuals Analysis")
    df_residuals = pd.DataFrame({
        'Residuals': np.random.normal(0, 2, 100),
        'Index': np.arange(100)
    }).set_index('Index')
    
    st.plotly_chart(create_residual_chart(df_residuals), use_container_width=True)


def page_customization():
    """Page 4: Customization - Add New City"""
    st.markdown('<p class="big-font">✨ Custom City Configuration</p>', unsafe_allow_html=True)
    st.markdown("Add a new city to the dashboard for real-time monitoring and comparison.")

    st.markdown("---")
    st.subheader("Add New City")

    new_city = st.text_input("Enter City Name and Country (e.g., Tokyo, Japan)")
    
    # Simple input fields for dummy base data
    st.subheader("Define Base Climate Profile (For Dummy Data Generation)")
    st.caption("These values set the average conditions the dashboard will generate data around.")
    col1, col2 = st.columns(2)
    with col1:
        base_temp = st.number_input("Base Average Temperature (°C)", min_value=-50, max_value=50, value=25)
    with col2:
        base_rain = st.number_input("Base 24h Rainfall (mm)", min_value=0, max_value=100, value=15)

    if st.button("Add City to Dashboard", use_container_width=True, key="add_city_btn"):
        city_name = new_city.strip()
        if city_name and city_name not in st.session_state['available_locations']:
            
            # Store base data for the new city
            st.session_state['custom_city_bases'][city_name] = {
                'base_temp': base_temp,
                'base_rain': base_rain
            }

            st.session_state['available_locations'].append(city_name)
            st.success(f"City **{city_name}** added successfully! Check the Overview and Comparison tabs.")
        elif city_name and city_name in st.session_state['available_locations']:
            st.warning(f"City **{city_name}** is already on the list.")
        else:
            st.error("Please enter a valid city name.")
    
    st.markdown("---")

    st.subheader("Currently Monitored Locations")
    st.info(", ".join(st.session_state['available_locations']))


def page_settings():
    """Page 5: Settings (Kept simple)"""
    st.markdown('<p class="big-font">⚙️ Settings</p>', unsafe_allow_html=True)
    st.markdown("Customize your dashboard experience here.")
    
    st.markdown("---")

    st.subheader("Data & Units")
    unit_choice = st.radio("🌡️ **Temperature Units**", ('°C (Celsius)', '°F (Fahrenheit)'))
    st.info(f"The dashboard is currently displaying data in **{unit_choice.split(' ')[0]}**.")

    st.markdown("---")
    
    st.subheader("Data Management")
    st.button("📦 **Download Configuration File** (Placeholder)")
    st.button("🔄 **Reset Dashboard to Default** (Placeholder)")


# --- Main Application Logic ---

# 1. Sidebar Navigation & User Profile
with st.sidebar:
    st.image("https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Globe_icon_-_blue.svg/512px-Globe_icon_-_blue.svg.png", width=50) 
    st.markdown("# 🌍 Climate Forecaster")
    st.markdown("---")
    
    # 👤 User Information Details Sidebar (Light Mode Styling)
    st.markdown("## 👤 User Profile")
    st.markdown(f"""
        <div class="user-profile-box">
            <p style="color: #333333; font-weight: bold;">John Doe</p>
            <small style="color: #666666;">Analyst @ Global Climate Init.</small><br>
            <small style="color: #666666;">ID: JDOE-4903A</small>
        </div>
    """, unsafe_allow_html=True)
    st.slider("Notification Level", 0, 10, 5, help="Set the sensitivity for anomaly alerts.")
    st.button("⚙️ Manage Account Settings", use_container_width=True)

    st.markdown("---")

    # 🧭 Navigation
    st.markdown("## 🧭 Navigation")
    pages = {
        "🌿 Overview Dashboard": page_overview,
        "🌐 Regional Comparison": page_comparison, 
        "📊 Model Performance": page_model_performance,
        "✨ Customization": page_customization, # Added new page
        "⚙️ Settings": page_settings,
    }

    # Ensure selection defaults to the first available page if the old one was selected
    default_index = 0
    if "selection" in st.session_state and st.session_state.selection not in pages.keys():
        st.session_state.selection = list(pages.keys())[default_index]
        
    selection = st.radio("Select View", list(pages.keys()), index=default_index, key="selection")
    st.markdown("---")
    st.caption("Prototype built with Streamlit & Plotly.")


# 2. Execute selected page function
pages[selection]()
