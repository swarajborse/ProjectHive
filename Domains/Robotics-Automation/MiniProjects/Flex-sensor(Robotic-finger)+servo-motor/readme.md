# 🤖 Flex Sensor Controlled Servo Motor using Arduino

This project demonstrates how to control a **servo motor** using a **flex sensor** with an **Arduino**. The servo motor moves according to the bending of the flex sensor — making it great for projects like robotic fingers, gloves, or motion-controlled devices.

---

## 🧠 Project Overview

The **flex sensor** changes its resistance when bent. This change is read as an analog input by the Arduino, which maps the sensor value to a servo motor angle (0° to 180°).  
As the sensor bends, the servo motor moves proportionally.

---

## ⚙️ Components Required

- Arduino UNO (or any compatible board)  
- Flex Sensor  
- Servo Motor (e.g., SG90 or MG995)  
- 10kΩ Resistor  
- Breadboard and Jumper Wires  

---

## 🔌 Circuit Connections

| Component | Arduino Pin | Description |
|------------|-------------|-------------|
| Flex Sensor | A0 | Analog input to read sensor values |
| Servo Motor Signal | D9 | PWM pin to control servo |
| VCC (Servo + Flex Sensor) | 5V | Power supply |
| GND (Servo + Flex Sensor) | GND | Common ground |

**Note:** Connect a 10kΩ resistor in a voltage divider setup with the flex sensor for stable readings.

---

Author 

Shirsha Nag

Contributor
