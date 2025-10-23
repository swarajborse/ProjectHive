# 🔐 Smart Door Lock - RFID/NFC Access Control

**Contributor:** SOHAM-GADEKAR 
**Domain:** IoT  
**Difficulty:** Intermediate  
**Tech Stack:** Arduino, RFID, Servo, LCD, C++

---

## 📝 Description

A comprehensive Smart Door Lock system using RFID/NFC technology for secure access control. Features multiple authorized cards, servo motor door control, LCD status display, audio feedback, and LED indicators. Perfect for learning IoT security concepts and hardware integration!

---

## 🎯 Features

- ✅ **RFID/NFC Authentication** - Secure card-based access control
- ✅ **Multiple Authorized Cards** - Support for up to 3 cards (expandable)
- ✅ **Servo Motor Lock** - Automated door locking mechanism
- ✅ **LCD Status Display** - Real-time system status and feedback
- ✅ **Audio Feedback** - Success/error sound notifications
- ✅ **LED Indicators** - Visual status (Green=Success, Red=Denied)
- ✅ **Manual Override** - Push button for manual unlock/lock
- ✅ **Auto-Lock Timer** - Automatic door locking after timeout
- ✅ **Access Logging** - Serial monitor logging of all access attempts
- ✅ **System Testing** - Startup self-test sequence
- ✅ **Debounced Input** - Reliable button and sensor readings

---

## 🛠️ Tech Stack

- **Arduino Uno/Nano** - Main microcontroller
- **RC522 RFID Module** - Card reading and authentication
- **SG90 Servo Motor** - Door locking mechanism
- **16x2 LCD Display (I2C)** - Status display
- **Buzzer** - Audio feedback system
- **LEDs** - Visual status indicators
- **C++** - Arduino programming language
- **SPI Communication** - RFID module interface
- **I2C Communication** - LCD display interface

---

## 🚀 How to Run

### Method 1: Arduino IDE

1. **Install Arduino IDE** (latest version)
2. **Install Required Libraries**:
   - MFRC522 (RFID)
   - LiquidCrystal_I2C (LCD)
   - Servo (built-in)
3. **Upload Code** to Arduino
4. **Connect Hardware** as per circuit diagram
5. **Power On** and test with RFID cards

### Method 2: PlatformIO

1. **Install PlatformIO** in VS Code
2. **Create New Project** for Arduino
3. **Add Libraries** to platformio.ini
4. **Upload and Monitor**

---

## 📁 Project Structure

```
SmartDoorLock/
├── code.ino              # Main Arduino code
├── circuit_diagram.md    # Wiring instructions
├── README.md             # This documentation
└── libraries/            # Required libraries
    ├── MFRC522/
    └── LiquidCrystal_I2C/
```

---

## 💻 Code Highlights

### RFID Card Authentication
```cpp
void handleRFIDCard() {
  String cardUID = getCardUID();
  Serial.println("Card detected: " + cardUID);
  
  if (isAuthorizedCard(cardUID)) {
    grantAccess();
    logAccess(cardUID, true);
  } else {
    denyAccess();
    logAccess(cardUID, false);
  }
}
```

### Servo Motor Control
```cpp
void grantAccess() {
  doorLocked = false;
  doorServo.write(90); // Unlocked position
  digitalWrite(GREEN_LED, HIGH);
  playSuccessSound();
}
```

### Auto-Lock Timer
```cpp
void loop() {
  // Auto-lock door after timeout
  if (!doorLocked && millis() - doorOpenTime > DOOR_OPEN_DURATION) {
    lockDoor();
  }
}
```

---

## 📚 Learning Outcomes

### Skills Practiced
- ✅ **Hardware Integration** - Multiple sensors and actuators
- ✅ **SPI Communication** - RFID module interface
- ✅ **I2C Communication** - LCD display control
- ✅ **Servo Motor Control** - PWM-based positioning
- ✅ **Input Validation** - Card authentication logic
- ✅ **State Management** - Door lock states
- ✅ **Timing Control** - Auto-lock functionality
- ✅ **Audio/Visual Feedback** - User interface design

### Concepts Learned
- RFID/NFC technology and protocols
- Servo motor control and positioning
- LCD display programming
- Hardware security systems
- Real-time system programming
- Sensor data processing
- Access control systems

---

## 🔧 Hardware Setup

### Required Components
- Arduino Uno/Nano
- RC522 RFID Module
- SG90 Servo Motor
- 16x2 LCD Display (I2C)
- Buzzer
- Green & Red LEDs
- Push Button
- Resistors (220Ω, 10kΩ)
- Jumper Wires
- Breadboard

### Wiring Instructions
See `circuit_diagram.md` for detailed wiring connections and circuit diagram.

---

## 🔑 Card Management

### Adding New Cards
1. **Get Card UID**: Use the serial monitor to read card UIDs
2. **Update Code**: Add new UID to `authorizedCards[]` array
3. **Upload**: Re-upload code to Arduino
4. **Test**: Verify new card works

### Current Authorized Cards
```cpp
String authorizedCards[] = {
  "A1B2C3D4",  // Card 1
  "E5F6G7H8",  // Card 2
  "I9J0K1L2"   // Card 3
};
```

---

## 🎛️ System Controls

### Automatic Features
- **Card Detection**: Automatic RFID scanning
- **Access Validation**: Real-time card verification
- **Auto-Lock**: 5-second timeout after unlock
- **Status Display**: Real-time LCD updates

### Manual Controls
- **Push Button**: Manual unlock/lock toggle
- **Reset**: Power cycle for system reset
- **Serial Monitor**: Debug and logging output

---

## 📊 System States

| State | Description | LED | Sound | LCD Display |
|-------|-------------|-----|-------|-------------|
| **Locked** | Door secured, waiting for card | Red OFF | None | "Scan your card" |
| **Access Granted** | Valid card detected | Green ON | Success tone | "Access Granted!" |
| **Access Denied** | Invalid card detected | Red ON | Error tone | "Access Denied!" |
| **Unlocked** | Door open, auto-lock countdown | Green ON | None | "Door: UNLOCKED" |

---

## 🔧 Troubleshooting

### Common Issues

| Problem | Solution |
|---------|----------|
| **RFID not detected** | Check 3.3V power, SPI connections |
| **Servo not moving** | Verify 5V power, signal wire to Pin 6 |
| **LCD blank** | Check I2C address (0x27), power connections |
| **No sound** | Test buzzer connections, Pin 7 |
| **LEDs not working** | Check resistor values, polarity |
| **Button not responding** | Verify Pin 2 connection, internal pull-up |

### Debug Mode
Enable serial monitoring at 9600 baud to see:
- Card UIDs
- Access attempts
- System status
- Error messages

---

## 🎨 Customization Ideas

Want to enhance this project? Try adding:

1. **WiFi Integration** - Remote monitoring via ESP8266
2. **Mobile App** - Bluetooth control via smartphone
3. **Camera Module** - Security recording on access
4. **PIR Sensor** - Motion detection integration
5. **Keypad Backup** - PIN code authentication
6. **Multiple Doors** - Control multiple locks
7. **Time-based Access** - Scheduled access control
8. **Database Logging** - Store access history
9. **Email Alerts** - Notification system
10. **Voice Commands** - Speech recognition

---

## 🚀 Future Enhancements

- [ ] **Web Dashboard** - Remote monitoring interface
- [ ] **Mobile App** - Smartphone control
- [ ] **Database Integration** - Access history storage
- [ ] **Multi-User Support** - User management system
- [ ] **Time Scheduling** - Time-based access control
- [ ] **Biometric Integration** - Fingerprint authentication
- [ ] **Cloud Connectivity** - IoT platform integration
- [ ] **Advanced Security** - Encryption and secure protocols

---

## ⚠️ Safety Notes

- **Power Supply**: Use regulated 5V supply (1A recommended)
- **Servo Mounting**: Ensure proper mechanical mounting
- **RFID Module**: Use 3.3V only (5V will damage the module)
- **Wiring**: Double-check all connections before powering on
- **Testing**: Test each component individually first
- **Security**: Change default card UIDs for production use

---

## 📄 License

MIT License - Free to use and modify!

---

## 🤝 Contributing

This is a sample project for ProjectHive. Feel free to:
- Fork and enhance
- Report issues
- Suggest improvements
- Use as learning material
- Add new features

---

**Happy Building! 🔐✨**
