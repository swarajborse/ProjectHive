# 🔌 Smart Door Lock - Circuit Diagram & Wiring

## 📋 Components Required

| Component | Quantity | Purpose |
|-----------|----------|---------|
| Arduino Uno/Nano | 1 | Main controller |
| RC522 RFID Module | 1 | Card reading |
| SG90 Servo Motor | 1 | Door lock mechanism |
| 16x2 LCD Display (I2C) | 1 | Status display |
| Buzzer | 1 | Audio feedback |
| Green LED | 1 | Success indicator |
| Red LED | 1 | Error indicator |
| Push Button | 1 | Manual unlock |
| Resistors (220Ω, 10kΩ) | 3 | Current limiting |
| Jumper Wires | - | Connections |
| Breadboard | 1 | Prototyping |

## 🔗 Wiring Connections

### Arduino Pin Connections

| Component | Arduino Pin | Notes |
|-----------|-------------|-------|
| **RC522 RFID Module** | | |
| VCC | 3.3V | Power supply |
| GND | GND | Ground |
| RST | Pin 9 | Reset pin |
| SS | Pin 10 | Slave select |
| MOSI | Pin 11 | SPI communication |
| MISO | Pin 12 | SPI communication |
| SCK | Pin 13 | SPI clock |
| **Servo Motor** | | |
| Signal | Pin 6 | PWM control |
| VCC | 5V | Power supply |
| GND | GND | Ground |
| **LCD Display (I2C)** | | |
| VCC | 5V | Power supply |
| GND | GND | Ground |
| SDA | A4 | I2C data |
| SCL | A5 | I2C clock |
| **Buzzer** | | |
| Positive | Pin 7 | Digital output |
| Negative | GND | Ground |
| **Green LED** | | |
| Anode | Pin 3 | Digital output |
| Cathode | GND (via 220Ω resistor) | Current limiting |
| **Red LED** | | |
| Anode | Pin 4 | Digital output |
| Cathode | GND (via 220Ω resistor) | Current limiting |
| **Push Button** | | |
| One terminal | Pin 2 | Digital input |
| Other terminal | GND | Ground |
| **Pull-up Resistor** | | |
| 10kΩ | Pin 2 to 5V | Internal pull-up used |

## 🔌 Circuit Diagram

```
                    ┌─────────────────┐
                    │   Arduino Uno   │
                    │                 │
    ┌───────────────┤ 3.3V     GND   ├──────────────┐
    │               │                 │              │
    │               │ Pin 9    Pin 10 ├──────────────┤
    │               │                 │              │
    │               │ Pin 11   Pin 12 ├──────────────┤
    │               │                 │              │
    │               │ Pin 13    Pin 6 ├──────────────┤
    │               │                 │              │
    │               │ Pin 7     Pin 3 ├──────────────┤
    │               │                 │              │
    │               │ Pin 4     Pin 2 ├──────────────┤
    │               │                 │              │
    │               │ A4       A5     ├──────────────┤
    │               │                 │              │
    │               │ 5V       GND    ├──────────────┤
    └───────────────┤                 │              │
                    └─────────────────┘              │
                                                     │
    ┌─────────────┐  ┌─────────────┐  ┌─────────────┐ │
    │ RC522 RFID  │  │ SG90 Servo  │  │  16x2 LCD   │ │
    │   Module    │  │   Motor     │  │  (I2C)      │ │
    │             │  │             │  │             │ │
    │ VCC ────────┼──┤ 3.3V        │  │ VCC ────────┼──┤ 5V
    │ GND ────────┼──┤ GND         │  │ GND ────────┼──┤ GND
    │ RST ────────┼──┤ Pin 9       │  │ SDA ────────┼──┤ A4
    │ SS ─────────┼──┤ Pin 10      │  │ SCL ────────┼──┤ A5
    │ MOSI ───────┼──┤ Pin 11      │  └─────────────┘ │
    │ MISO ───────┼──┤ Pin 12      │                   │
    │ SCK ────────┼──┤ Pin 13      │                   │
    └─────────────┘  │             │                   │
                     │ Signal ─────┼──┤ Pin 6         │
                     │ VCC ────────┼──┤ 5V            │
                     │ GND ────────┼──┤ GND           │
                     └─────────────┘                   │
                                                      │
    ┌─────────────┐  ┌─────────────┐  ┌─────────────┐ │
    │   Buzzer    │  │ Green LED   │  │  Red LED    │ │
    │             │  │             │  │             │ │
    │ + ──────────┼──┤ Pin 7       │  │ + ──────────┼──┤ Pin 3
    │ - ──────────┼──┤ GND         │  │ - ──────────┼──┤ GND
    └─────────────┘  │             │  │             │ │
                     │ + ──────────┼──┤ Pin 4       │ │
                     │ - ──────────┼──┤ GND         │ │
                     └─────────────┘  └─────────────┘ │
                                                      │
    ┌─────────────┐                                   │
    │Push Button  │                                   │
    │             │                                   │
    │ ────────────┼──┤ Pin 2                         │
    │ ────────────┼──┤ GND                           │
    └─────────────┘                                   │
                                                      │
    ┌─────────────┐                                   │
    │ 10kΩ Resistor│                                  │
    │             │                                   │
    │ ────────────┼──┤ Pin 2 to 5V (Optional)        │
    └─────────────┘                                   │
                                                      │
    ┌─────────────┐                                   │
    │ 220Ω Resistors│                                 │
    │ (2x)         │                                   │
    │             │                                   │
    │ ────────────┼──┤ LED Anodes                  │
    └─────────────┘                                   │
                                                    │
    ┌─────────────┐                                 │
    │   GND Rail  │                                 │
    │             │                                 │
    │ ────────────┼──────────────────────────────────┘
    └─────────────┘
```

## ⚡ Power Requirements

- **Arduino Uno**: 5V, ~100mA
- **RC522 Module**: 3.3V, ~50mA
- **Servo Motor**: 5V, ~200mA (peak)
- **LCD Display**: 5V, ~20mA
- **Buzzer**: 5V, ~30mA
- **LEDs**: 5V, ~20mA each

**Total Current**: ~420mA (recommend 1A power supply)

## 🔧 Assembly Steps

1. **Power Connections**
   - Connect 5V and GND rails on breadboard
   - Connect Arduino 5V to breadboard 5V rail
   - Connect Arduino GND to breadboard GND rail

2. **RFID Module**
   - Connect RC522 to Arduino as per pin mapping
   - Ensure 3.3V power supply (not 5V!)

3. **Servo Motor**
   - Connect signal wire to Pin 6
   - Connect power to 5V and GND
   - Test servo movement before mounting

4. **LCD Display**
   - Connect I2C pins (SDA to A4, SCL to A5)
   - Connect power (5V, GND)

5. **LEDs and Buzzer**
   - Connect with appropriate resistors
   - Test each component individually

6. **Push Button**
   - Connect to Pin 2 and GND
   - Use internal pull-up resistor

## ⚠️ Safety Notes

- **Power Supply**: Use regulated 5V supply (1A recommended)
- **Servo Motor**: Ensure proper mounting to prevent damage
- **RFID Module**: Use 3.3V only (5V will damage it)
- **Wiring**: Double-check all connections before powering on
- **Testing**: Test each component individually first

## 🔍 Troubleshooting

| Issue | Solution |
|-------|----------|
| RFID not detected | Check 3.3V power, SPI connections |
| Servo not moving | Check 5V power, signal wire |
| LCD not displaying | Check I2C address, power connections |
| LEDs not working | Check resistor values, polarity |
| Buzzer not working | Check power, signal connections |

## 📱 Optional Enhancements

- **WiFi Module (ESP8266)**: Remote monitoring
- **Camera Module**: Security recording
- **PIR Sensor**: Motion detection
- **Keypad**: PIN code backup
- **Bluetooth Module**: Mobile app control
