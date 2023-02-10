#include "DHT.h"

#define DHTPIN 6
#define DHTTYPE DHT11   // DHT 22  (AM2302), AM2321

int led = 13;
int norte = 48;

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(9600);
  //Serial.println(F("DHT11 test!"));
  pinMode(led, OUTPUT);
  pinMode(norte, INPUT);

  digitalWrite(led, 0);
  dht.begin();
}

void loop() {
  
  delay(500);

  // Reading temperature or humidity takes about 250 milliseconds!
  // Sensor readings may also be up to 2 seconds 'old' (its a very slow sensor)
  float h = dht.readHumidity();
  // Read temperature as Celsius (the default)
  float t = dht.readTemperature();

  // Check if any reads failed and exit early (to try again).
  if (isnan(h) || isnan(t)) {
    Serial.println(F("Failed to read from DHT sensor!"));
    return;
  }

  Serial.print("H/");
  Serial.println(h);
  delay(500);
  Serial.print("T/");
  Serial.println(t);
  delay(500);
  if(digitalRead(norte) == 1)
  {
    digitalWrite(led, 1);
    Serial.print("P/");
    Serial.println("n");
  }
  else
  {
    digitalWrite(led, 0);
    Serial.println("P/0");
  }
}
