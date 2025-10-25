🔥 Gas Detection System using ESP32 & MQ Sensor

This project detects the presence of gas or smoke using an analog gas sensor (e.g., MQ-2/MQ-135) connected to an ESP32 microcontroller. When the gas concentration exceeds a threshold, the system triggers a buzzer and displays a warning message on an I2C LCD display.

🧠 Features

🚨 Detects harmful gas concentrations in the environment

💡 LCD display for real-time status updates

🔔 Buzzer alert for high gas levels

💾 Serial monitor for debugging

⚙️ Adjustable threshold for sensitivity

⚙️ Components Used

| Component                       | Description                        |
| ------------------------------- | ---------------------------------- |
| **ESP32**                       | Main controller                    |
| **MQ Gas Sensor (e.g., MQ-2)**  | Detects gas levels                 |
| **16x2 I2C LCD Display (0x27)** | Displays gas status                |
| **Buzzer**                      | Sounds alarm when gas detected     |
| **LED (optional)**              | Visual indicator for gas detection |
| **Connecting Wires**            | For circuit connections            |

🧩 Circuit Connections

| ESP32 Pin | Component        | Description     |
| --------- | ---------------- | --------------- |
| 32        | MQ Sensor Output | Analog input    |
| 12        | LED              | Alert indicator |
| 27        | Buzzer           | Alarm output    |
| SDA       | LCD SDA          | I2C data        |
| SCL       | LCD SCL          | I2C clock       |

💡 Note: Ensure correct LCD I2C address (commonly 0x27 or 0x3F).

💻 Code Explanation

🔸 Setup

Initializes the LCD and Serial Monitor.

Configures pins for sensor input, buzzer, and LED output.

🔸 Loop

Reads analog value from the gas sensor.

Maps it to a percentage scale (0–100).

Displays “Normal Condition” or “Gas Detected!!” on the LCD.

Turns on the buzzer and LED if gas level ≥ 65%.

🧪 Sample Output

LCD Display:

Status :

Gas Detected!!

Serial Output:

Gas value: 3250 → Gas Detected!!

🚀 Future Enhancements

🌐 Send alerts to ThingSpeak or Blynk IoT Dashboard

📱 Integrate mobile notifications (via Wi-Fi)

📊 Add data logging and visualization

🧰 Dependencies

Install the following libraries in the Arduino IDE:

LiquidCrystal_I2C

Wire

🏗️ How to Run

Connect all components as per the circuit table.

Upload the code to ESP32 using Arduino IDE.

Open the Serial Monitor at 115200 baud rate.

Observe LCD and buzzer behavior when exposed to gas.

✨ Author

Developed by: Shirsha Nag

Language: Arduino C

Board: ESP32
