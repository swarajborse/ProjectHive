/*
 * Smart Door Lock - RFID/NFC Access Control System
 * 
 * Features:
 * - RFID/NFC card authentication
 * - Servo motor door lock control
 * - LCD display for status
 * - Buzzer for audio feedback
 * - LED indicators
 * - Multiple authorized cards
 * - Access logging
 * 
 * Hardware Required:
 * - Arduino Uno/Nano
 * - RC522 RFID Module
 * - Servo Motor (SG90)
 * - 16x2 LCD Display
 * - Buzzer
 * - LEDs (Green, Red)
 * - Resistors
 * - Jumper wires
 * 
 */

#include <SPI.h>
#include <MFRC522.h>
#include <LiquidCrystal_I2C.h>
#include <Servo.h>
#include <EEPROM.h>

// Pin definitions
#define RST_PIN 9
#define SS_PIN 10
#define SERVO_PIN 6
#define BUZZER_PIN 7
#define GREEN_LED 3
#define RED_LED 4
#define BUTTON_PIN 2

// Initialize components
MFRC522 mfrc522(SS_PIN, RST_PIN);
LiquidCrystal_I2C lcd(0x27, 16, 2);
Servo doorServo;

// Door states
bool doorLocked = true;
bool accessGranted = false;

// Authorized card UIDs (replace with your card UIDs)
String authorizedCards[] = {
  "A1B2C3D4",  // Card 1
  "E5F6G7H8",  // Card 2
  "I9J0K1L2"   // Card 3
};
int numAuthorizedCards = 3;

// Timing variables
unsigned long lastAccessTime = 0;
unsigned long doorOpenTime = 0;
const unsigned long DOOR_OPEN_DURATION = 5000; // 5 seconds

// Button debouncing
unsigned long lastButtonPress = 0;
const unsigned long DEBOUNCE_DELAY = 200;

void setup() {
  Serial.begin(9600);
  
  // Initialize SPI and RFID
  SPI.begin();
  mfrc522.PCD_Init();
  
  // Initialize LCD
  lcd.init();
  lcd.backlight();
  
  // Initialize servo
  doorServo.attach(SERVO_PIN);
  doorServo.write(0); // Locked position
  
  // Initialize pins
  pinMode(BUZZER_PIN, OUTPUT);
  pinMode(GREEN_LED, OUTPUT);
  pinMode(RED_LED, OUTPUT);
  pinMode(BUTTON_PIN, INPUT_PULLUP);
  
  // Initial display
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Smart Door Lock");
  lcd.setCursor(0, 1);
  lcd.print("Scan your card");
  
  Serial.println("Smart Door Lock System Started");
  Serial.println("Scan your RFID card...");
  
  // Test sequence
  performStartupTest();
}

void loop() {
  // Check for RFID card
  if (mfrc522.PICC_IsNewCardPresent() && mfrc522.PICC_ReadCardSerial()) {
    handleRFIDCard();
    delay(1000); // Prevent multiple reads
  }
  
  // Check for manual unlock button
  if (digitalRead(BUTTON_PIN) == LOW && millis() - lastButtonPress > DEBOUNCE_DELAY) {
    lastButtonPress = millis();
    handleManualUnlock();
  }
  
  // Auto-lock door after timeout
  if (!doorLocked && millis() - doorOpenTime > DOOR_OPEN_DURATION) {
    lockDoor();
  }
  
  // Update display
  updateDisplay();
  
  delay(100);
}

void handleRFIDCard() {
  String cardUID = getCardUID();
  Serial.println("Card detected: " + cardUID);
  
  // Check if card is authorized
  if (isAuthorizedCard(cardUID)) {
    grantAccess();
    logAccess(cardUID, true);
  } else {
    denyAccess();
    logAccess(cardUID, false);
  }
}

String getCardUID() {
  String cardUID = "";
  for (byte i = 0; i < mfrc522.uid.size; i++) {
    if (mfrc522.uid.uidByte[i] < 0x10) {
      cardUID += "0";
    }
    cardUID += String(mfrc522.uid.uidByte[i], HEX);
  }
  cardUID.toUpperCase();
  return cardUID;
}

bool isAuthorizedCard(String cardUID) {
  for (int i = 0; i < numAuthorizedCards; i++) {
    if (cardUID == authorizedCards[i]) {
      return true;
    }
  }
  return false;
}

void grantAccess() {
  accessGranted = true;
  doorLocked = false;
  doorOpenTime = millis();
  
  // Unlock door
  doorServo.write(90); // Unlocked position
  
  // Visual and audio feedback
  digitalWrite(GREEN_LED, HIGH);
  digitalWrite(RED_LED, LOW);
  playSuccessSound();
  
  // Display success message
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Access Granted!");
  lcd.setCursor(0, 1);
  lcd.print("Door Unlocked");
  
  Serial.println("Access Granted - Door Unlocked");
}

void denyAccess() {
  accessGranted = false;
  
  // Visual and audio feedback
  digitalWrite(GREEN_LED, LOW);
  digitalWrite(RED_LED, HIGH);
  playErrorSound();
  
  // Display error message
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Access Denied!");
  lcd.setCursor(0, 1);
  lcd.print("Unauthorized Card");
  
  Serial.println("Access Denied - Unauthorized Card");
}

void lockDoor() {
  doorLocked = true;
  accessGranted = false;
  
  // Lock door
  doorServo.write(0); // Locked position
  
  // Turn off LEDs
  digitalWrite(GREEN_LED, LOW);
  digitalWrite(RED_LED, LOW);
  
  Serial.println("Door Auto-Locked");
}

void handleManualUnlock() {
  if (doorLocked) {
    grantAccess();
    Serial.println("Manual Unlock Activated");
  } else {
    lockDoor();
    Serial.println("Manual Lock Activated");
  }
}

void playSuccessSound() {
  // Success melody
  tone(BUZZER_PIN, 1000, 200);
  delay(200);
  tone(BUZZER_PIN, 1500, 200);
  delay(200);
  tone(BUZZER_PIN, 2000, 200);
}

void playErrorSound() {
  // Error melody
  tone(BUZZER_PIN, 300, 500);
  delay(100);
  tone(BUZZER_PIN, 200, 500);
}

void updateDisplay() {
  static unsigned long lastDisplayUpdate = 0;
  
  if (millis() - lastDisplayUpdate > 1000) {
    lastDisplayUpdate = millis();
    
    if (doorLocked) {
      lcd.clear();
      lcd.setCursor(0, 0);
      lcd.print("Door: LOCKED");
      lcd.setCursor(0, 1);
      lcd.print("Scan card to open");
    } else {
      lcd.clear();
      lcd.setCursor(0, 0);
      lcd.print("Door: UNLOCKED");
      lcd.setCursor(0, 1);
      lcd.print("Auto-lock in: ");
      int remainingTime = (DOOR_OPEN_DURATION - (millis() - doorOpenTime)) / 1000;
      if (remainingTime > 0) {
        lcd.print(remainingTime);
        lcd.print("s");
      }
    }
  }
}

void logAccess(String cardUID, bool granted) {
  // Simple logging to Serial
  Serial.print("Access Log - ");
  Serial.print(millis());
  Serial.print(" - Card: ");
  Serial.print(cardUID);
  Serial.print(" - ");
  Serial.println(granted ? "GRANTED" : "DENIED");
  
  // You can extend this to save to EEPROM or send to server
}

void performStartupTest() {
  // Test sequence on startup
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("System Test...");
  
  // Test LEDs
  digitalWrite(GREEN_LED, HIGH);
  delay(500);
  digitalWrite(GREEN_LED, LOW);
  digitalWrite(RED_LED, HIGH);
  delay(500);
  digitalWrite(RED_LED, LOW);
  
  // Test servo
  doorServo.write(90);
  delay(500);
  doorServo.write(0);
  
  // Test buzzer
  tone(BUZZER_PIN, 1000, 200);
  delay(200);
  noTone(BUZZER_PIN);
  
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("System Ready!");
  lcd.setCursor(0, 1);
  lcd.print("Scan your card");
  
  Serial.println("System startup test completed");
}
