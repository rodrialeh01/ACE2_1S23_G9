#include "DHT.h"
#include <Wire.h>    // incluye libreria de bus I2C
#include <Adafruit_Sensor.h>  // incluye librerias para sensor BMP280
#include <Adafruit_BMP280.h>
#define DHTPIN 24
#define DHTTYPE DHT11   // DHT 22  (AM2302), AM2321

int led = 13;
int norte = 52;
int sur = 50;
int este = 51;
int oeste = 53;

const int sensorPin = 9;
int encoder_pin = 2;             //Pin 2, donde se conecta el encoder       
unsigned int rpm = 0;           // Revoluciones por minuto calculadas.
float velocity = 0;                 //Velocidad en [Km/h]
volatile byte pulses = 0;       // Número de pulsos leidos por el Arduino en un segundo
unsigned long timeold = 0;  // Tiempo 
unsigned int pulsesperturn = 20; // Número de muescas que tiene el disco del encoder.
const int wheel_diameter = 25;   // Diámetro de la rueda pequeña[mm]
static volatile unsigned long debounce = 0; // Tiempo del rebote.

DHT dht(DHTPIN, DHTTYPE);
Adafruit_BMP280 bmp;    // crea objeto con nombre bmp

float PRESION, P0;    // variables para almacenar valor de presion atmosferica
        // y presion actual como referencia para altitud

void setup() {
  Serial.begin(9600);
  //Serial.println(F("DHT11 test!"));
    if ( !bmp.begin() ) {       // si falla la comunicacion con el sensor mostrar
    Serial.println("BMP280 no encontrado !"); // texto y detener flujo del programa
    while (1);          // mediante bucle infinito
  }
  pinMode(led, OUTPUT);
  pinMode(norte, INPUT);
  pinMode(sur,INPUT);
  pinMode(encoder_pin, INPUT); // Configuración del pin nº2
  attachInterrupt(0, counter, RISING); // Configuración de la interrupción 0, donde esta conectado. 
  pulses = 0;
  rpm = 0;
  timeold = 0;
  //Serial.println("Velocity[Km/h]");
  digitalWrite(led, 0);
  dht.begin();
}

void loop() {
  if (millis() - timeold >= 1000){  // Se actualiza cada segundo
      noInterrupts(); //Don't process interrupts during calculations // Desconectamos la interrupción para que no actué en esta parte del programa.
      rpm = (60 * 1000 / pulsesperturn )/ (millis() - timeold)* pulses; // Calculamos las revoluciones por minuto
      velocity = rpm * 3.1416 * wheel_diameter * 60 / 1000000; // Cálculo de la velocidad en [Km/h] 
      timeold = millis(); // Almacenamos el tiempo actual.
      Serial.print("V/");
      Serial.println(velocity,2); 
      pulses = 0;  // Inicializamos los pulsos.
      interrupts(); // Restart the interrupt processing // Reiniciamos la interrupción
   }
  PRESION = (bmp.readPressure()/101325)*760;    // almacena en variable el valor de presion divido
            // por 100 para covertirlo a hectopascales
  Serial.print("Pr/");      // muestra texto
  Serial.println(PRESION);      // muestra valor de la variable

  delay(500);

  // Reading temperature or humidity takes about 250 milliseconds!
  // Sensor readings may also be up to 2 seconds 'old' (its a very slow sensor)
  float hr = dht.readHumidity();
  // Read temperature as Celsius (the default)
  float t = dht.readTemperature();
  

  // Check if any reads failed and exit early (to try again).
  if (isnan(hr) || isnan(t)) {
    Serial.println(F("Failed to read from DHT sensor!"));
    return;
  }
  float ha = (6.112*exp((17.67*t)/(t+243.5))*(hr/100)*2.1674)/(273.15+t);
  Serial.print("HR/");
  Serial.println(hr);
  delay(500);
  Serial.print("HA/");
  Serial.println(ha);
  delay(500);
  Serial.print("T/");
  Serial.println(t);
  delay(500);
  if(digitalRead(norte) == 1)
  {
    digitalWrite(led, 1);
    Serial.print("D/");
    Serial.println("Norte");
  }
  else if(digitalRead(sur) == 1)
  {
    digitalWrite(led, 1);
    Serial.print("D/");
    Serial.println("Sur");
  }
  else if(digitalRead(este) == 1)
  {
    digitalWrite(led, 1);
    Serial.print("D/");
    Serial.println("Este");
  }
  else if(digitalRead(oeste) == 1)
  {
    digitalWrite(led, 1);
    Serial.print("D/");
    Serial.println("Oeste");
  }
  else
  {
    digitalWrite(led, 0);
    Serial.println("D/0");
  }
}

void counter(){
  if(  digitalRead (encoder_pin) && (micros()-debounce > 500) && digitalRead (encoder_pin) ) { 
// Vuelve a comprobar que el encoder envia una señal buena y luego comprueba que el tiempo es superior a 1000 microsegundos y vuelve a comprobar que la señal es correcta.
        debounce = micros(); // Almacena el tiempo para comprobar que no contamos el rebote que hay en la señal.
        pulses++;}  // Suma el pulso bueno que entra.
        else ; 
} 
