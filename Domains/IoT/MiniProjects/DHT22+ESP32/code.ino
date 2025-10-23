#include <DHT.h>
#define dataPin  4
#define DHTTYPE DHT22
#include <WiFi.h> 
#define WIFI_SSID "Wokwi-GUEST" 
#define WIFI_PASSWORD "" 
#include "ThingSpeak.h" 
#define myChannelNumber [Give your channel no u created at thing speak]
#define myWriteAPIKey ["Give your API key"] 
unsigned long dataMillis = 0; 
int data1;
WiFiClient client; 
DHT dht(dataPin , DHTTYPE);

void setup() {
  Serial.begin(115200);
  dht.begin();
  // put your setup code here, to run once:
  WiFi.begin (WIFI_SSID,WIFI_PASSWORD); 
  ThingSpeak.begin(client);
  
  
  Serial .print("Connecting to Wi-Fi"); 
  while (WiFi.status() != WL_CONNECTED) {
    delay(500); 
    Serial.print("-"); 
  }
}
  
void loop() {
   data1 = dht.readTemperature(); 
  

  // put your main code here, to run repeatedly:
  ThingSpeak.setField(1, data1); 
   if (millis() - dataMillis > 20000) 
  { 
    Serial.printf("data1 value: %.2f\n", data1); 

    int x = ThingSpeak.writeFields(myChannelNumber, myWriteAPIKey); 
    if ( x == 200){ 
    Serial.println("Channel update successful."); 
    } 
    else{ 
    Serial.println("Problem updating channel. HTTP error code " + String(x)); 
  } 
  } 

 
  delay(200);

}
