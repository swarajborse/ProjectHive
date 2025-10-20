#include <Servo.h>
int flex0=A0,flex1,flex2;
Servo myservo;
void setup()
{
  myservo.attach(9);
  pinMode(flex0,INPUT);
  Serial.begin(9600);
}
void loop()
{
  flex1=analogRead(flex0);
  flex2=map(flex1,990,1017,0,180);
  Serial.println(flex2);
  if (flex2 > 90){
    myservo.attach(2);
    myservo.write(90);
   
  }
  else{
   myservo.write(0);
  }
  delay(200);
}
