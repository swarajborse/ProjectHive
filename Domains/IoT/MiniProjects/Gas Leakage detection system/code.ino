#include <LiquidCrystal_I2C.h>
int a,a1,d=12,b=27;
LiquidCrystal_I2C lcd(0x27, 16, 2);
void setup() {
  Serial.begin(115200);     
  pinMode(32, INPUT);  
  pinMode(d, OUTPUT);  
  pinMode(b, OUTPUT);      
  lcd.init();
  lcd.backlight();
  lcd.setCursor(0, 0);
  lcd.println("Status :");
}
void loop() {
  a = analogRead(32);  
  a1=map(a,843,4041,0,100);
  lcd.setCursor(0, 1);      
  lcd.print("                ");
  lcd.setCursor(0, 1); 

  if(a1>=65){
   lcd.println ("Gas Detected!!");
   digitalWrite(d,HIGH);
   tone(b,1000);
  }
  else{
    lcd.println ("Normal condition!!");
    digitalWrite(d,LOW);
    noTone(b);}
          
         
  delay(500);                
}
