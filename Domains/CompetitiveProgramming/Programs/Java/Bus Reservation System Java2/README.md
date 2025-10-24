# 🚌 Bus Reservation System

**Contributor:** snehal492006  

---

## 📘 Overview
**Bus Reservation System** is a **Java-based desktop application** developed using **Swing** for the graphical interface and **Oracle Database** for backend data storage.  
It allows users to **reserve, view, and cancel bus reservations** through an interactive, user-friendly GUI.  

This project demonstrates:
- Java GUI design with Swing  
- JDBC database connectivity  
- SQL CRUD operations  
Perfect for **practical learning** and **academic submission**.

---

## ⚙️ Features
- 📝 **Seat Reservation:** Book seats with passenger details.  
- 🔍 **View Reservations:** Display all existing bookings in a clear table.  
- ❌ **Cancel Reservation:** Delete a booking using a mobile number.  
- 🔄 **Reset Form:** Quickly clear all input fields.  
- 💾 **Database Connectivity:** Integrated with Oracle Database via JDBC.

---

## 🧰 Technologies Used

| Component | Description |
|------------|-------------|
| **Language** | Java (Swing + JDBC) |
| **Database** | Oracle 11g / 10g |
| **IDE** | Dev C++, Eclipse, IntelliJ, or NetBeans |
| **JDBC Driver** | ojdbc8.jar |
| **GUI Library** | Java Swing (AWT + JFrame Components) |

---

## 🗂️ Database Setup

### 1️⃣ Create Table

```sql
CREATE TABLE bus_reservations (
    id NUMBER PRIMARY KEY,
    name VARCHAR2(50),
    mobile VARCHAR2(15),
    bus_number VARCHAR2(10),
    route VARCHAR2(50),
    seat_number NUMBER,
    travel_date DATE
);

## 2️⃣ Create Sequence
CREATE SEQUENCE bus_reservations_seq START WITH 1 INCREMENT BY 1;

## ▶️ How to Run

Ensure Oracle Database is running.

Add ojdbc8.jar to your project classpath.

Update the database credentials if required:

private static final String URL = "jdbc:oracle:thin:@localhost:1521:xe";
private static final String USER = "system";
private static final String PASSWORD = "system";


Compile the program:

javac BusReservationSystem.java


Run the program:

java BusReservationSystem


The GUI window will open, allowing you to:

Reserve seats

View all reservations

Cancel reservations

Reset input fields


## 🧪 Example Flow

Enter passenger details and click Reserve.

Click View Reservations to see stored records.

Enter a mobile number to Cancel Reservation.

Use Reset to clear the form instantly.

## 👨‍💻 Contributor

👩‍💻 Snehal Baramade
GitHub: @snehal492006

💻 Java Developer | 🎨 Creative Coder | 📚 Tech Enthusiast