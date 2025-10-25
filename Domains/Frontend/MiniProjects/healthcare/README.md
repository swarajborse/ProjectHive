🏥 Healthcare Analytics Dashboard

This is an interactive, multi-page web application built with Streamlit, Plotly, and Pandas for analyzing synthetic healthcare data. It provides a high-level overview of hospital performance, patient demographics, and cost analysis, all through a clean, tabbed interface.

This dashboard is designed to showcase how to build a modern, interactive analytics tool in Python without requiring a front-end framework.

!

🚀 Features

Multi-Page Navigation: A clean sidebar allows users to navigate between four distinct pages:

Overview & Admissions: Tracks high-level KPIs (Total Patients, Avg. Stay, Recovery Rate) and visualizes admission trends over time.

Cost & Performance Analysis: Explores the financial aspects, including cost distribution by department and a dynamic scatter plot to find correlations.

Patient Demographics: Analyzes patient data by age, gender, and disease.

Patient Deep Dive: Allows the user to select a single patient (from the filtered list) to see their individual record and compare their stats against department averages.

Interactive Filtering: A powerful sidebar filtering system (organized with tabs) allows users to drill down into the data by:

Department

Doctor

Patient Outcome

Gender

Admission Date Range

Dynamic Visualizations: All charts are built with Plotly for interactivity (hover, zoom, pan). Key charts include:

Line charts for admission trends

Interactive pie charts for outcome distribution

Bar charts for department/disease analysis

Box plots to identify cost outliers

A dynamic scatter plot with selectable X/Y axes

A correlation heatmap with value labels

Custom CSS Styling: Injects custom CSS to override default Streamlit styles, providing a more professional and cohesive design (e.g., custom blue multiselect tags instead of the default red).

⚙️ Tech Stack

Python: Core language

Streamlit: For the web app framework, UI, and interactivity

Pandas: For data manipulation and aggregation

NumPy: For data generation and numerical operations

Plotly & Plotly Express: For all interactive data visualizations

🛠️ How to Run Locally

To run this dashboard on your local machine, follow these steps:

1. Prerequisites

Ensure you have Python 3.8+ installed.

2. Clone the Repository (or Download Files)

If you're using Git:

git clone https://your-repo-url/healthcare-analytics-dashboard.git
cd healthcare-analytics-dashboard


Alternatively, just download the healthcare_dashboard.py file.

3. Install Dependencies

You will need to install the required Python libraries.

pip install streamlit pandas numpy plotly


4. Run the App

In your terminal, navigate to the directory containing the healthcare_dashboard.py file and run the following command:

streamlit run healthcare_dashboard.py


Streamlit will automatically open the dashboard in your default web browser.

This dashboard uses synthetically generated data and does not represent any real patient or hospital information.