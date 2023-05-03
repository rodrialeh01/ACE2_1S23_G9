#include "WiFiEsp.h"
#include "DHT.h"
#include <Wire.h>
#include <Adafruit_Sensor.h>  // incluye librerias para sensor BMP280
#include <Adafruit_BMP280.h>
#include <ArduinoJson.h> //para manejar el json

//PARA ESP
#ifndef HAVE_HWSERIAL1
#include "SoftwareSerial.h"
SoftwareSerial Serial1(18, 19); // RX, TX
#endif

//PINES A UTILIZAR
#define sensor_tierra A0
#define Trigger 2
#define Echo 3
#define DHTPIN 52
#define bomba 12
#define DHTTYPE DHT11

//INICIALIZACIONES
// ------------------------- PARA ESP
char ssid[] = "TIGO-A923";
char password[] = "2D9657302612";
IPAddress server(192, 168, 0, 3);
int port = 4001;
int status = WL_IDLE_STATUS;
WiFiEspClient client;
// ------------------------- PARA DHT
DHT dht(DHTPIN, DHTTYPE);
// ------------------------- PARA BMP
Adafruit_BMP280 bmp;

//VARIABLES QUE HAY QUE IR ACTUALIZANDO
float humedad = 0.0; //
float tmp_int = 0.0; //
float tmp_ext = 0.0; //
float pr_agua = 0.0; //
int estado_bomba = 0; //SE HARÁ POR MEDIO DE UN GET.

int tiempo_trabajando = 0;

// Constante velocidad sonido en cm/s
const float VelSon = 34000.0;
//obtener response:
int c;

//PARA MANEJAR ESTADOS:
enum Manejo {
  Apagado,
  Encendido,
  Unknown
};

enum Estado {
  S0,
  S1
};

Estado estadoActual;
Manejo manejoActual;

void estadoS0() {
  if (manejoActual == Manejo::Apagado) {
    cambio(Estado::S0);
  }
  if (manejoActual == Manejo::Encendido) {
    cambio(Estado::S1);
  }
}

void estadoS1() {
  if (manejoActual == Manejo::Apagado) {
    cambio(Estado::S0);
  }

  if (manejoActual == Manejo::Encendido) {
    cambio(Estado::S1);
  }
}

void updateState() {
  switch (estadoActual) {
    case S0: estadoS0(); break;
    case S1: estadoS1(); break;
  }
}

void readState() {
  manejoActual = Manejo::Apagado;

  if (estado_bomba == 1 || estado_bomba == 0) {
    int inc = estado_bomba;
    switch (inc) {
      case 0: manejoActual = Manejo::Apagado; break;
      case 1: manejoActual = Manejo::Encendido; break;
      default: break;
    }
  }
}

void cambio(int nuevoEstado) {
  estadoActual = nuevoEstado;

  switch (estadoActual) {
    case Estado::S0: PumpOff(); break;
    case Estado::S1: PumpWork(tiempo_trabajando); break;
    default: break;
  }
}

//SETUP INICIAL
void setup() {
  //pinmodes:
  pinMode(Trigger, OUTPUT); //pin como salida
  pinMode(Echo, INPUT);  //pin como entrada
  pinMode(12, OUTPUT);
  //DEBUG:
  Serial.begin(115200);//iniciailzamos la comunicación
  //ESP:
  Serial1.begin(115200);
  WiFi.init(&Serial1);
  status = WiFi.begin(ssid, password);
  while (status != WL_CONNECTED) {
    delay(500);
  }
  Serial.println("CONEXIÓN A WIFI CORRECTA");
  //inicializando el dht11
  dht.begin();

  //inicializando el bmp280:
  if ( !bmp.begin() ) {       // si falla la comunicacion con el sensor mostrar
    Serial.println("BMP280 no encontrado !"); // texto y detener flujo del programa
    while (1);          // mediante bucle infinito
  }

  estadoActual = S0;
  PumpOff();
}

//LOOP
void loop() {
  POSTDatos();
  GETDatos();

  readState();
  updateState();
}

//SI SE ENCIENDE:
void PumpWork(int seconds) {
  unsigned long startTime = millis();
  if (seconds > 0 && estado_bomba == 1) {
    digitalWrite(bomba, HIGH);
  }
  while (millis() - startTime < seconds*1000 && estado_bomba == 1) {
    GETDatos();
    POSTDatos();
    if (estado_bomba == 0) {
      break;
    }

    startUS();
    obtDistancia();
    obtTempInterna();
    obtTempExterna();
    humedadSuelo();
    /*Funcionamiento Bomba*/
    delay(200);
  }
  estado_bomba = 0;
  digitalWrite(bomba, LOW);
  POSTDatos();
  POSTDatos2();
}

//SI ESTÁ APAGADA:
void PumpOff() {
  startUS();
  obtDistancia();
  obtTempInterna();
  obtTempExterna();
  humedadSuelo();
}

//OBTENER EL JSON CON LOS DATOS
String postJSON() {
  String exit = "{";
  exit += "\"humedad\":" + String(humedad) + ",";
  exit += "\"tmp_int\":" + String(tmp_int) + ",";
  exit += "\"tmp_ext\":" + String(tmp_ext) + ",";
  exit += "\"pr_agua\":" + String(pr_agua) + ",";
  exit += "\"est_bomba\":" + String(estado_bomba);
  exit += "}";
  return exit;
}

String postJSONControl() {
  String exit = "{";
  exit += "\"est_bomba\":" + String(estado_bomba);
  exit += "}";
  return exit;
}

//POST PARA API
void POSTDatos() {
  String json = postJSON();
delay(100);
  if (client.connect(server, port)) {
    client.print("POST /setValues HTTP/1.1\r\n");
    client.print("Host: ");
    client.print(String(server));
    client.print("\r\n");
    client.print("Content-Type: application/json\r\n");
    client.print("Content-Length: ");
    client.print(json.length());
    client.print("\r\n\r\n");
    client.print(json);
    client.stop();
    delay(100);

    Serial.println(json);
  }

}

//POST PARA API
void POSTDatos2() {
  String json = postJSONControl();
  delay(100);
  Serial.println("HOLA----------------------");
  if (client.connect(server, port)) {
    client.print("POST /onOffBomba HTTP/1.1\r\n");
    client.print("Host: ");
    client.print(String(server));
    client.print("\r\n");
    client.print("Content-Type: application/json\r\n");
    client.print("Content-Length: ");
    client.print(json.length());
    client.print("\r\n\r\n");
    client.print(json);
    client.stop();
    delay(100);
  }

}

void GETDatos() {
  delay(100);
  client.stop();

  if (client.connect(server, port)) {
    String env = "GET /getControlArduino HTTP/1.1";
    client.println(env);
    client.println(F("Host: 192.168.0.3:4001"));
    client.println("Connection: close");
    client.println();

    String response = "[";
    bool f = client.find("[");
    if (f) {
      while ( (c = client.read()) > 0) {

        if ((char)c == '\n' || (char)c == ']') {
          break;
        }
        response += (char)c;
      }
    }

    response += ']';
    Serial.println(response);
    const char* jsonString = response.c_str();;
    DynamicJsonDocument doc(1024);
    DeserializationError error = deserializeJson(doc, jsonString);
    if (error) {
      Serial.print("Error parsing JSON string: ");
      Serial.println(error.c_str());
      return;
    }

    if (int(doc[0]["est_bomba"]) != estado_bomba) {
        estado_bomba = int(doc[0]["est_bomba"]); 
    }
    
    tiempo_trabajando = int(doc[0]["tmp_conf"]);
    int tmp_act = int(doc[0]["tmp_act"]);
    delay(100);
  } else {
    client.println("Failed to connect to server");
  }
}

void humedadSuelo() {
  int valor = map(analogRead(sensor_tierra), 0, 1023, 100, 0);
  //se hace un mapeo de la lectura del sensor a porcentual
  humedad = valor;

}

void startUS() {
  digitalWrite(Trigger, LOW);
  delayMicroseconds(2);

  digitalWrite(Trigger, HIGH);
  delayMicroseconds(10);

  digitalWrite(Trigger, LOW);
}

void obtTempInterna() {
  float h = dht.readTemperature();
  if (isnan(h)) {
    Serial.println(F("Failed to read from DHT sensor!"));
    return;
  }
  tmp_int = h;
}

void obtTempExterna() {
  float temp = bmp.readTemperature();
  tmp_ext = temp;
}

void obtDistancia() {
  unsigned  long tiempo = pulseIn(Echo, HIGH);
  float distance = tiempo * 0.000001 * VelSon / 2.0;

  if (distance <= 4.00) {
    distance = 4;
  } else if (distance >= 23.56) {
    distance = 23.56;
  }
  float porcentaje = getPor(distance);
  pr_agua = porcentaje;
}

float getPor(float dis) {
  float vol = (3785 / 19.56) * (dis - 4);
  float porcentaje = (vol * 100) / 3785;
  porcentaje = 100.00 - porcentaje;
  return porcentaje;
}
