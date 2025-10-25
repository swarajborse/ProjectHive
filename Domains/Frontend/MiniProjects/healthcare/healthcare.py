# =========================================
# 🏥 HEALTHCARE ANALYTICS DASHBOARD (ENHANCED V3 - Custom CSS)
# Built using Streamlit + Plotly + Pandas + NumPy
# =========================================

import streamlit as st
import pandas as pd
import numpy as np
import plotly.express as px
import plotly.graph_objects as go
from datetime import date

# -----------------------------------------
# 🧠 Configuration & Setup
# -----------------------------------------
# Define Plotly styling
PLOTLY_DARK_TEMPLATE = "plotly_dark"
DEFAULT_COLOR = '#4c78a8' # Plotly blue
ACCENT_COLOR = '#f58518'  # Plotly orange

st.set_page_config(
    page_title="Healthcare Analytics Dashboard",
    page_icon="🏥",
    layout="wide",
    initial_sidebar_state="expanded"
)

# --- CUSTOM CSS INJECTION ---
# This CSS overrides the default red multiselect tags and styles the sidebar tabs
st.markdown("""
<style>
/* --- Improve Sidebar Design --- */

/* Style the sidebar tabs container */
div[data-testid="stTabs"] {
    margin-top: -1rem; /* Pull tabs up to align with header */
}

/* Style individual tab buttons */
div[data-testid="stTabs"] button[role="tab"] {
    border-radius: 0.5rem 0.5rem 0 0;
    border-bottom: 2px solid transparent;
    font-weight: 500;
}

/* Style the active tab */
div[data-testid="stTabs"] button[role="tab"][aria-selected="true"] {
    background-color: #333; /* Slightly lighter than sidebar bg */
    border-bottom: 2px solid #f58518; /* Accent color */
    color: #f58518; /* Accent color */
}

/* --- Remove Red Color from MultiSelect --- */

/* Target the multiselect tags */
div[data-baseweb="tag"] {
    background-color: #4c78a8; /* Use the default blue color */
    border-radius: 0.5rem; /* Make it a bit more rounded */
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
}

/* Target the text inside the tag */
div[data-baseweb="tag"] span {
    color: white;
}

/* Target the 'x' close icon's container */
div[data-baseweb="tag"] span[role="button"] {
    background-color: #4c78a8; /* Match the background */
    border-radius: 0 0.5rem 0.5rem 0;
}

/* Style the 'x' (svg) itself */
div[data-baseweb="tag"] span[role="button"] svg {
    fill: white; /* Make the 'x' white */
}

/* Add a hover effect for the 'x' */
div[data-baseweb="tag"] span[role="button"]:hover {
    background-color: #f58518; /* Use accent color on hover */
}
</style>
""", unsafe_allow_html=True)


# -----------------------------------------
# 🧾 Data Generation (Caching for performance)
# -----------------------------------------
@st.cache_data
def generate_data():
    """Generates synthetic hospital data for the dashboard."""
    np.random.seed(42)
    n = 5000 # Increased data size for richer analysis

    departments = ["Cardiology", "Neurology", "Orthopedics", "Pediatrics", "Oncology", "General Medicine"]
    diseases = ["Heart Disease", "Stroke", "Fracture", "Flu", "Cancer", "Infection"]
    doctors = ["Dr. Patel", "Dr. Singh", "Dr. Chen", "Dr. Williams", "Dr. Gupta", "Dr. Rodriguez", "Dr. Lee", "Dr. Brown"]
    
    data = {
        "Patient_ID": [f"P{i:04d}" for i in range(1, n + 1)],
        "Age": np.random.randint(1, 95, n),
        "Gender": np.random.choice(["Male", "Female", "Other"], n, p=[0.48, 0.48, 0.04]),
        "Department": np.random.choice(departments, n, p=[0.2, 0.15, 0.15, 0.1, 0.2, 0.2]),
        "Disease": np.random.choice(diseases, n),
        "Doctor": np.random.choice(doctors, n),
        "Admission_Date": pd.to_datetime(np.random.choice(pd.date_range("2023-01-01", "2024-12-31"), n)),
        "Stay_Duration_Days": np.random.randint(1, 20, n),
        "Treatment_Cost": np.random.randint(5000, 250000, n),
        "Outcome": np.random.choice(["Recovered", "Under Treatment", "Deceased"], n, p=[0.80, 0.15, 0.05])
    }
    df = pd.DataFrame(data)
    df["Discharge_Date"] = df["Admission_Date"] + pd.to_timedelta(df["Stay_Duration_Days"], unit="D")
    
    # Create Age Groups for better demographic analysis
    bins = [0, 18, 45, 65, 100]
    labels = ['Child (0-18)', 'Adult (19-45)', 'Senior (46-65)', 'Elderly (66+)']
    df['Age_Group'] = pd.cut(df['Age'], bins=bins, labels=labels, right=True, include_lowest=True)

    return df

df_raw = generate_data()

# -----------------------------------------
# 🎛️ Sidebar Filters (IMPROVED DESIGN)
# -----------------------------------------
st.sidebar.header("🔍 Data Filters")

# Page Navigation
page = st.sidebar.selectbox(
    "Select Dashboard View",
    ["1. Overview & Admissions", "2. Cost & Performance Analysis", "3. Patient Demographics", "4. Patient Deep Dive"]
)
st.sidebar.markdown("---")

# --- NEW: Filter tabs for better organization ---
tab1, tab2, tab3 = st.sidebar.tabs(["🏥 Hospital Filters", "🧑‍🤝‍🧑 Patient Filters", "📅 Date Filter"])

with tab1:
    # Filter 1: Department
    dept_filter = tab1.multiselect(
        "Select Department", 
        options=df_raw["Department"].unique(), 
        default=df_raw["Department"].unique()
    )

    # Filter 2: Doctor (NEW)
    doctor_filter = tab1.multiselect(
        "Select Doctor", 
        options=df_raw["Doctor"].unique(), 
        default=df_raw["Doctor"].unique()
    )

with tab2:
    # Filter 3: Outcome
    outcome_filter = tab2.multiselect(
        "Select Outcome", 
        options=df_raw["Outcome"].unique(), 
        default=df_raw["Outcome"].unique()
    )

    # Filter 4: Gender
    gender_filter = tab2.multiselect(
        "Select Gender", 
        options=df_raw["Gender"].unique(), 
        default=df_raw["Gender"].unique()
    )

with tab3:
    # Filter 5: Date Range
    tab3.subheader("Admission Date Range")
    min_date = df_raw["Admission_Date"].min().date()
    max_date = df_raw["Admission_Date"].max().date()

    try:
        date_range = tab3.date_input(
            "Start/End Date",
            value=(min_date, max_date),
            min_value=min_date,
            max_value=max_date
        )
        if len(date_range) == 2:
            start_date = pd.to_datetime(date_range[0])
            end_date = pd.to_datetime(date_range[1])
        else:
            st.sidebar.warning("Select a date range.")
            start_date, end_date = min_date, max_date # Default to full range on partial selection
    except Exception:
        start_date, end_date = min_date, max_date

# Apply filters
df_filtered = df_raw[
    (df_raw["Department"].isin(dept_filter)) &
    (df_raw["Doctor"].isin(doctor_filter)) & # Added doctor filter
    (df_raw["Outcome"].isin(outcome_filter)) &
    (df_raw["Gender"].isin(gender_filter)) &
    (df_raw["Admission_Date"].between(start_date, end_date))
]

# Check for empty data after filtering
if df_filtered.empty:
    st.error("No data matches the selected filter criteria. Please adjust your filters.")
    st.stop()
    
# -----------------------------------------
# 📊 KPI Metrics Display
# -----------------------------------------
def display_kpis(df):
    """Calculates and displays Key Performance Indicators."""
    total_patients = len(df)
    avg_stay = round(df["Stay_Duration_Days"].mean(), 2)
    avg_cost = round(df["Treatment_Cost"].mean(), 2)
    total_cost = df["Treatment_Cost"].sum()
    
    # Calculate recovery rate and fatality rate safely
    outcome_counts = df["Outcome"].value_counts(normalize=True)
    recovery_rate = round(outcome_counts.get("Recovered", 0) * 100, 2)
    fatality_rate = round(outcome_counts.get("Deceased", 0) * 100, 2)
    
    col1, col2, col3, col4, col5 = st.columns(5)
    col1.metric("🧍 Total Patients", f"{total_patients:,}")
    col2.metric("💰 Avg Cost (Patient)", f"₹{avg_cost:,.0f}")
    col3.metric("🛌 Avg Stay", f"{avg_stay} days")
    col4.metric("💪 Recovery Rate", f"{recovery_rate}%", delta=f"Fatality: {fatality_rate}%", delta_color="inverse")
    col5.metric("📈 Total Cost (Revenue)", f"₹{total_cost:,.0f}")

    st.markdown("---")

# -----------------------------------------
# 🌐 Page 1: Overview & Admissions
# -----------------------------------------
def page_overview(df):
    st.header("Overview & Admissions Trends")
    display_kpis(df)

    # Use tabs for better organization
    tab1, tab2, tab3 = st.tabs(["📅 Admissions Trend", "🏥 Department Analysis", "❤️ Patient Outcomes"])

    with tab1:
        st.subheader("Monthly Admission Trend")
        # 1. Admissions Over Time (Plotly Line)
        admission_trend = (
            df.groupby(df["Admission_Date"].dt.to_period("M"))
            .size()
            .reset_index(name="Admissions")
        )
        admission_trend["Admission_Date"] = admission_trend["Admission_Date"].astype(str)

        fig1 = px.line(
            admission_trend,
            x="Admission_Date",
            y="Admissions",
            markers=True,
            title="📅 Monthly Admission Trend",
            template=PLOTLY_DARK_TEMPLATE,
            color_discrete_sequence=[DEFAULT_COLOR]
        )
        fig1.update_xaxes(title="Month of Admission")
        fig1.update_yaxes(title="Number of Admissions")
        st.plotly_chart(fig1, use_container_width=True)

    with tab2:
        st.subheader("Department-Wise Admissions")
        # 2. Department-Wise Admissions (Plotly Bar)
        dept_count = df["Department"].value_counts().reset_index()
        dept_count.columns = ["Department", "Count"]

        fig2 = px.bar(
            dept_count,
            x="Department",
            y="Count",
            color="Department",
            title="🏥 Department-Wise Admissions",
            template=PLOTLY_DARK_TEMPLATE
        )
        st.plotly_chart(fig2, use_container_width=True)
    
    with tab3:
        st.subheader("Patient Outcome Distribution")
        # INTERACTIVE: Filter pie chart by department
        st.markdown("Use the selector below to filter the outcome distribution by a specific department.")
        
        # Create a list of departments + 'All'
        dept_list = ['All Departments'] + sorted(df['Department'].unique().tolist())
        dept_pie_filter = st.selectbox("Filter by Department", options=dept_list)

        if dept_pie_filter == 'All Departments':
            df_pie = df
            pie_title = "❤️ Patient Outcome Distribution (All Departments)"
        else:
            df_pie = df[df['Department'] == dept_pie_filter]
            pie_title = f"❤️ Patient Outcome Distribution ({dept_pie_filter})"

        # 3. Outcome Distribution (Plotly Pie)
        fig3 = px.pie(
            df_pie,
            names="Outcome",
            title=pie_title,
            hole=0.4,
            template=PLOTLY_DARK_TEMPLATE,
            color_discrete_sequence=px.colors.qualitative.Set3
        )
        st.plotly_chart(fig3, use_container_width=True)
    
# -----------------------------------------
# 💵 Page 2: Cost & Performance Analysis
# -----------------------------------------
def page_cost_analysis(df):
    st.header("Cost and Hospital Performance Analysis")
    display_kpis(df)

    tab1, tab2, tab3 = st.tabs(["💵 Cost vs. Demographics", "💰 Cost Distribution", "🧩 Correlation Analysis"])

    with tab1:
        st.subheader("Dynamic Relationship Explorer")
        
        # INTERACTIVE: Dynamic Axes for Scatter Plot
        numeric_cols = ['Age', 'Stay_Duration_Days', 'Treatment_Cost']
        
        col_x, col_y = st.columns(2)
        with col_x:
            x_axis = st.selectbox("Select X-Axis", options=numeric_cols, index=0)
        with col_y:
            y_axis = st.selectbox("Select Y-Axis", options=numeric_cols, index=2)

        # 4. Age vs Treatment Cost Analysis (Plotly Scatter)
        fig4 = px.scatter(
            df,
            x=x_axis,
            y=y_axis,
            color="Outcome",
            size="Stay_Duration_Days",
            hover_data=["Department", "Disease", "Patient_ID", "Doctor"],
            title=f"💵 {y_axis} vs {x_axis} (Size = Stay Duration)",
            template=PLOTLY_DARK_TEMPLATE
        )
        fig4.update_yaxes(title=f"{y_axis} (₹)")
        fig4.update_xaxes(title=f"{x_axis}")
        st.plotly_chart(fig4, use_container_width=True)
        
    with tab2:
        st.subheader("Treatment Cost Distribution by Department")
        # 5. Cost Distribution by Department (Plotly Box Plot)
        fig_box = px.box(
            df,
            x="Department",
            y="Treatment_Cost",
            color="Department",
            notched=True, # Add notches to show median confidence interval
            title="💰 Treatment Cost Distribution by Department (Outliers)",
            template=PLOTLY_DARK_TEMPLATE
        )
        fig_box.update_yaxes(title="Treatment Cost (₹)")
        fig_box.update_xaxes(title="Department")
        st.plotly_chart(fig_box, use_container_width=True)

    with tab3:
        st.subheader("Correlation Analysis of Numeric Variables")
        # 6. Correlation Heatmap (Plotly Heatmap) - ENHANCED
        numeric_cols_df = df[numeric_cols].corr()

        fig5 = go.Figure(
            data=go.Heatmap(
                z=numeric_cols_df.values,
                x=numeric_cols_df.columns,
                y=numeric_cols_df.columns,
                colorscale="Viridis",
                zmin=-1, zmax=1,
                text=np.around(numeric_cols_df.values, 2), # Add text labels
                texttemplate="%{text}", # Show text
                textfont={"color":"white"}
            )
        )
        fig5.update_layout(
            title="🧩 Correlation Heatmap of Numeric Variables", 
            template=PLOTLY_DARK_TEMPLATE,
        )
        st.plotly_chart(fig5, use_container_width=True)
    
# -----------------------------------------
# 👨‍👩‍👧‍👦 Page 3: Patient Demographics
# -----------------------------------------
def page_patient_demographics(df):
    st.header("Patient Demographic Analysis")
    display_kpis(df)

    tab1, tab2, tab3 = st.tabs(["📊 Age & Gender", "🩺 Disease Analysis", "🛌 Stay & Cost by Gender"])

    with tab1:
        st.subheader("Age and Gender Distribution")
        # Age Distribution (Plotly Histogram)
        fig_age = px.histogram(
            df, 
            x="Age", 
            color="Gender",
            marginal="box", # Show box plot marginal for distribution details
            nbins=30, 
            title="Age and Gender Distribution",
            template=PLOTLY_DARK_TEMPLATE
        )
        st.plotly_chart(fig_age, use_container_width=True)
        
    with tab2:
        st.subheader("Major Diseases by Age Group")
        # Disease by Age Group (Plotly Grouped Bar Chart)
        disease_by_age = df.groupby(['Age_Group', 'Disease']).size().reset_index(name='Count')
        
        fig_disease = px.bar(
            disease_by_age,
            x="Disease",
            y="Count",
            color="Age_Group",
            title="Major Diseases by Age Group",
            template=PLOTLY_DARK_TEMPLATE
        )
        fig_disease.update_layout(barmode='group')
        st.plotly_chart(fig_disease, use_container_width=True)
        
    with tab3:
        st.subheader("Gender Analysis: Stay Duration and Cost")
        col_gender_stay, col_gender_cost = st.columns(2)
        
        with col_gender_stay:
            # Gender vs Stay Duration (Violin Plot)
            fig_g_stay = px.violin(
                df,
                y="Stay_Duration_Days",
                x="Gender",
                box=True, # Add box plot inside the violin
                title="Stay Duration by Gender",
                template=PLOTLY_DARK_TEMPLATE
            )
            st.plotly_chart(fig_g_stay, use_container_width=True)
            
        with col_gender_cost:
            # Avg Cost by Gender (Bar Plot)
            fig_g_cost = px.bar(
                df.groupby('Gender')['Treatment_Cost'].mean().reset_index(),
                x='Gender',
                y='Treatment_Cost',
                title='Average Treatment Cost by Gender',
                template=PLOTLY_DARK_TEMPLATE,
                color_discrete_sequence=[ACCENT_COLOR]
            )
            st.plotly_chart(fig_g_cost, use_container_width=True)

# -----------------------------------------
# 🧑‍⚕️ NEW Page 4: Patient Deep Dive
# -----------------------------------------
def page_patient_deep_dive(df_raw, df_filtered):
    st.header("🧑‍⚕️ Patient Deep Dive")
    st.markdown("Select a Patient ID from the filtered list to see their detailed record.")

    if df_filtered.empty:
        st.warning("No patients in the filtered selection. Please broaden your filters in the sidebar.")
        st.stop()
        
    # INTERACTIVE: Select a patient ID
    patient_id = st.selectbox(
        "Select Patient ID",
        options=sorted(df_filtered['Patient_ID'].unique())
    )
    
    if patient_id:
        # Get the full raw data for the selected patient
        patient_data = df_raw[df_raw['Patient_ID'] == patient_id].iloc[0]
        
        st.subheader(f"Patient Record: {patient_data['Patient_ID']}")
        
        # Display patient details
        col1, col2, col3, col4 = st.columns(4)
        col1.metric("Age", f"{patient_data['Age']}")
        col2.metric("Gender", patient_data['Gender'])
        col3.metric("Department", patient_data['Department'])
        col4.metric("Attending Doctor", patient_data['Doctor'])
        
        st.markdown("---")
        
        # Cost and Stay Comparison
        st.subheader("Performance Comparison")
        col_cost, col_stay = st.columns(2)
        
        with col_cost:
            # Compare patient cost to department average
            avg_cost_dept = df_raw[df_raw['Department'] == patient_data['Department']]['Treatment_Cost'].mean()
            st.metric(
                label=f"Patient Cost vs. {patient_data['Department']} Avg.",
                value=f"₹{patient_data['Treatment_Cost']:,.0f}",
                delta=f"₹{patient_data['Treatment_Cost'] - avg_cost_dept:,.0f}",
                delta_color="inverse" # Red if higher than avg
            )
            
        with col_stay:
            # Compare patient stay to department average
            avg_stay_dept = df_raw[df_raw['Department'] == patient_data['Department']]['Stay_Duration_Days'].mean()
            st.metric(
                label=f"Patient Stay vs. {patient_data['Department']} Avg.",
                value=f"{patient_data['Stay_Duration_Days']} Days",
                delta=f"{patient_data['Stay_Duration_Days'] - avg_stay_dept:.1f} Days",
                delta_color="inverse" # Red if longer than avg
            )
            
        st.markdown("---")
        
        # Show full record
        with st.expander("View Full Patient Data Record"):
            st.dataframe(patient_data)


# -----------------------------------------
# 🧠 Main Dispatcher
# -----------------------------------------
st.title("🏥 Healthcare Analytics Dashboard")
st.markdown("### Gain insights from hospital and patient data using interactive analytics")
st.markdown("---")

# Dispatch to the selected page function
if page == "1. Overview & Admissions":
    page_overview(df_filtered)
elif page == "2. Cost & Performance Analysis":
    page_cost_analysis(df_filtered)
elif page == "3. Patient Demographics":
    page_patient_demographics(df_filtered)
elif page == "4. Patient Deep Dive":
    # Pass both raw and filtered dataframes
    page_patient_deep_dive(df_raw, df_filtered) 

st.markdown("---")

# Interactive Raw Data Viewer (Detail)
with st.expander("🔬 View Filtered Raw Data Table"):
    st.dataframe(df_filtered, use_container_width=True)

# -----------------------------------------
# 🧠 Insight Summary
# -----------------------------------------
st.markdown("### 🧠 Quick Insights Summary")
st.write(f"- Most Active Department: **{df_filtered['Department'].value_counts().idxmax()}** (Check admissions trend for peak periods.)")
st.write(f"- Highest Average Treatment Cost: **{df_filtered.groupby('Department')['Treatment_Cost'].mean().idxmax()}** (Use the Box Plot to analyze cost variability.)")
st.write(f"- Most Common Disease: **{df_filtered['Disease'].value_counts().idxmax()}** (The 'Patient Demographics' page shows which age groups are most affected.)")
st.write(f"- Busiest Doctor in Filtered Set: **{df_filtered['Doctor'].value_counts().idxmax()}** (with {df_filtered['Doctor'].value_counts().max()} patients).")

st.markdown("---")
st.markdown("© 2025 | Developed by **Healthcare Data Analyst Dashboard** 🩺")


