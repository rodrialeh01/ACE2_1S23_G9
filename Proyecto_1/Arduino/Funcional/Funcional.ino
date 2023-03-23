//IMPORTACIONES
#include "TM1637Display.h"

#include "WiFiEsp.h"
#ifndef HAVE_HWSERIAL1
#include "SoftwareSerial.h"
SoftwareSerial Serial1(18, 19); // RX, TX
#endif

char ssid[] = "TIGO-A923";
char password[] = "2D9657302612";

IPAddress server(192, 168, 0, 7);
int port = 4000;
int status = WL_IDLE_STATUS;

WiFiEspClient client;

//Definiciones:
#define CLK 2
#define DIO 3
#define RESET 47
#define buzzPin 7


//VARIABLES GLOBALES:
int verificacion_actual = 1;
int tiempoTrabajo = 25 * 60;
int tiempoDescanso = 5 * 60;
int anteriorConfig = 0;

int tiempoIngresado;
int descansoIngresado;

String logueado;

int cicloPomodoro = 0;
int c;
int paso = 0;

TM1637Display display(CLK, DIO);
uint8_t position[] = { 0, 0, 0, 0 };

const uint8_t ErrL[] = {
  SEG_A | SEG_D | SEG_E | SEG_G | SEG_F, //E
  SEG_E | SEG_G , //r
  SEG_E | SEG_G , //r
  SEG_D | SEG_E | SEG_F, //L
};

//get usuario
// [4] = {1,2,3,4}
// [x] != 0
// [4] = {0,2,3,4}
//global Pomodoro_actual = 1;
//posteando
//[4] = {}
//[4] = {-1,-1,-1,-1}
//al iniciar siempre hacer el primer GET
//Si el usuario retorna NULL
//no empieza loop
//si, se configura


void setup() {
  display.setBrightness(10);
  pinMode(45, OUTPUT);
  pinMode(47, INPUT);
  //pinMode(46,INPUT);
  pinMode(7, OUTPUT);
  pinMode(22, INPUT);

  //pinMode(42,OUTPUT);
  pinMode(A0, INPUT);
  int temp_reloj = ((tiempoTrabajo / 60) / 10) * 1000;
  temp_reloj += ((tiempoTrabajo / 60) % 10) * 100;
  temp_reloj += ((tiempoTrabajo % 60) / 10) * 10;
  temp_reloj += ((tiempoTrabajo % 60) % 10);
  display.showNumberDecEx(temp_reloj, 0x40, true);
  //  display.setSegments(position);
  Serial.begin(115200);

  // debug:
  Serial2.begin(115200);
  // serial  ESP modulo
  Serial1.begin(115200);

  WiFi.init(&Serial1);
  // Connect to WiFi network
  status = WiFi.begin(ssid, password);
  while (status != WL_CONNECTED) {
    delay(500);
    //Serial.println("Connecting to WiFi...");
  }

  Serial.println("Connected to WiFi");

}

void loop() {
  //Serial.println(digitalRead(47));
  logueado = GETlogin();
  // logueado = "1";
  //Serial.println(logueado);
  while (logueado == "1") {

    // Serial.println(analogRead(A0));
    // Serial.println(digitalRead(47));
    if (digitalRead(22) != verificacion_actual) { //significa que manda un 0, es decir, está en ciclo
      if (verificacion_actual == 0) {
        paso++;
        //if [0] != 0 {se agarra el primer pomodoro -> se actualiza la variable inicial (Pomodoro_actual)}

        String descanso = GETDescanso();
        String trabajar = GETTrabajo();

        tiempoTrabajo = trabajar.toInt()*60;
        tiempoDescanso = descanso.toInt()*60;
        
        ciclo();
        //ZzZzZzZzZzZzZzZzZzZzz
        //ciclo();
        verificacion_actual = 1;
      }
      else {
        //Serial.println("config");
        config_pomododo();
        //verificacion_actual = 0;
      }
    }
  }

  //delay(10000);
  /* String x = "";
    while (client.available()) {
     char c = client.read();
     Serial.write(c);
     x += c;
     // Serial.println(c);
    }
    Serial.println("XD");
    Serial.println(x);
    Serial.println("XD2");*/


  //}
  //else {}

}

void ciclo() {
  cicloPomodoro++;
  while (tiempoTrabajo >= 0) {
    //agarra el que le toca.
    //[x]
    POSTdataPomodoro(digitalRead(22));
    //Serial2.println(digitalRead(22));
    digitalWrite(46, HIGH);
    if (digitalRead(47) == LOW) {
      verificacion_actual = 3;
      digitalWrite(46, LOW);
      intermitencia();
      break;
      verificacion_actual = 1;
    }
    tiempoTrabajo--;
    delay(1000);
    int temp_reloj = ((tiempoTrabajo / 60) / 10) * 1000;
    temp_reloj += ((tiempoTrabajo / 60) % 10) * 100;
    temp_reloj += ((tiempoTrabajo % 60) / 10) * 10;
    temp_reloj += ((tiempoTrabajo % 60) % 10);
    display.showNumberDecEx(temp_reloj, 0x40, true);

    if (tiempoTrabajo == 0) {
      digitalWrite(46, LOW);
      for (int i = 0; i < 5; i++) {
        digitalWrite(buzzPin, HIGH);
        delay(500);
        digitalWrite(buzzPin, LOW);
        delay(500);
      }

      if (cicloPomodoro < 4) {
        descanso();
      }
      break;
    }
  }
  if (cicloPomodoro == 4) {
    cicloPomodoro = 0;
    return;
  }
  tiempoTrabajo = tiempoIngresado;
  ciclo();
}

void descanso() {
  while (tiempoDescanso >= 0) {
    //agarra el que le toca.
    //[x]
    POSTdataPomodoro(digitalRead(22));
    // Serial2.println(digitalRead(22));
    digitalWrite(38, HIGH);
    if (digitalRead(47) == LOW) {
      verificacion_actual = 3;
      digitalWrite(38, LOW);
      intermitencia();
      verificacion_actual = 1;
      break;
    }
    tiempoDescanso--;
    delay(1000);
    int temp_desc = ((tiempoDescanso / 60) / 10) * 1000;
    temp_desc += ((tiempoDescanso / 60) % 10) * 100;
    temp_desc += ((tiempoDescanso % 60) / 10) * 10;
    temp_desc += ((tiempoDescanso % 60) % 10);
    display.showNumberDecEx(temp_desc, 0x40, true);

    if (tiempoDescanso == 0) {
      digitalWrite(38, LOW); //LED DE DESCANSO
      for (int i = 0; i < 5; i++) {
        digitalWrite(buzzPin, HIGH);
        delay(100);
        digitalWrite(buzzPin, LOW);
        delay(100);
      }
      tiempoDescanso = descansoIngresado;
      break;
    }
  }


}

void config_pomododo() {
  //Para el display:

  int x = analogRead(A0);
  //int temp = (2 * (x)) / 45;
  tiempoTrabajo =  map(x, 0, 1023, 1, 45);
  tiempoTrabajo = tiempoTrabajo * 60;
  tiempoIngresado = tiempoTrabajo;
  descansoIngresado = tiempoDescanso;
  if (tiempoIngresado != anteriorConfig) {
    GETupdateConfig(int(tiempoIngresado / 60));
    delay(10);
  }
  anteriorConfig = tiempoIngresado;

  int temp_reloj = ((tiempoTrabajo / 60) / 10) * 1000;
  temp_reloj += ((tiempoTrabajo / 60) % 10) * 100;
  temp_reloj += ((tiempoTrabajo % 60) / 10) * 10;
  temp_reloj += ((tiempoTrabajo % 60) % 10);

  display.showNumberDecEx(temp_reloj, 0x40, true);

  if (digitalRead(22) == HIGH) {
    verificacion_actual = 0;
  }
}

void intermitencia() {
  int pot = ((int(analogRead(A0) / 23) + 1) * 60);
  while (verificacion_actual == 3) {
    int temp_reloj = ((tiempoIngresado / 60) / 10) * 1000;
    temp_reloj += ((tiempoIngresado / 60) % 10) * 100;
    temp_reloj += ((tiempoIngresado % 60) / 10) * 10;
    temp_reloj += ((tiempoIngresado % 60) % 10);

    display.showNumberDecEx(temp_reloj, 0x40, true);
    delay(500);
    display.setBrightness(10, false);  // Turn off
    display.showNumberDecEx(temp_reloj, 0x40, true);
    delay(500);
    display.setBrightness(10, true);  // Turn off

    if ( digitalRead(22) == HIGH || ((int(analogRead(A0) / 23) + 1) * 60) != pot) {
      if (digitalRead(22) == HIGH) {
        verificacion_actual = 0;
        return;
      }
      else {
        verificacion_actual = 1;
        //config_pomododo();
        
        return;
      }
    }
  }
}


String GETlogin() {

  delay(100);
  client.stop();
  if (client.connect(server, 4000)) {
    Serial.println("Connecting...");
    // send the HTTP PUT request
    client.println(F("GET /getLogin HTTP/1.1"));
    //lastConnectionTime = millis();
    client.println(F("Host: 192.168.0.7:4000"));
    client.println("Connection: close");
    client.println();

    //delay(2000);
    String response = "";
    bool f = client.find("{");
    if (f) {
      while ( (c = client.read()) > 0) {
        //Serial.print((char)c);
        if ((char)c == '\n' || (char)c == '}') {
          break;
        }
        response += (char)c;
      }
    }

    //Serial.println(response);
    return response;

  } else {
    Serial.println("Failed to connect to server");
    //resetFunc();
  }
  /*delay(100);
    client.stop();
    if (client.connect(server, 4000)) {
    Serial.println("Connecting...");
    // send the HTTP PUT request
    client.println(F("GET /ping HTTP/1.1"));
    //lastConnectionTime = millis();
    client.println(F("Host: 192.168.0.7:4000"));
    client.println("Connection: close");
    client.println();

    //delay(2000);
    String response = "";
    bool f = client.find("{");
    bool cond = true;
    if (f) {
      while ( (c = client.read()) > 0) {
        //Serial.print((char)c);
        if ((char)c == '\n' || (char)c == '}') {
          cond = false;
          break;
        }
        response += (char)c;
      }
    }

    Serial.println(response);
    } else {
    Serial.println("Failed to connect to server");
    //resetFunc();
    }*/

}

void POSTdataPomodoro(int estado_act) {

  String json = "{\"id_usuario\":1,\n \"estado\": " + String(estado_act) + ",\n \"id_pomodoro\": 4, \"fase_pomodoro\":" + String(paso) + "}";

  // Send POST request with JSON payload
  if (client.connect(server, port)) {
    //Serial.println("Connected to server");

    client.print("POST /dataPomodoro HTTP/1.1\r\n");
    client.print("Host: ");
    client.print(String(server));
    client.print("\r\n");
    client.print("Content-Type: application/json\r\n");
    client.print("Content-Length: ");
    client.print(json.length());
    client.print("\r\n\r\n");
    client.print(json);

    Serial.println("Sent payload");
    client.stop();
  } else {
    Serial.println("Failed to connect to server");
  }

  delay(100);
}

void GETupdateConfig(int tiempoTrabajo) {
  delay(10);
  client.stop();
  if (client.connect(server, 4000)) {
    Serial.println("Connecting...");
    // send the HTTP PUT request
    String enviar = "GET /config/trabajo/" + String(tiempoTrabajo) + " HTTP/1.1";
    client.println(enviar);
    //lastConnectionTime = millis();
    client.println(F("Host: 192.168.0.7:4000"));
    client.println("Connection: close");
    client.println();
    //Serial.println(response);
  } else {
    Serial.println("Failed to connect to server");
    //resetFunc();
  }
}

String GETDescanso() {
  delay(100);
  client.stop();
  if (client.connect(server, 4000)) {
    Serial.println("Connecting...");
    // send the HTTP PUT request
    String enviar = "GET /getFreeTime HTTP/1.1";
    client.println(enviar);
    //lastConnectionTime = millis();
    client.println(F("Host: 192.168.0.7:4000"));
    client.println("Connection: close");
    client.println();
    
    String response = "";
    bool f = client.find("{");
    if (f) {
      while ( (c = client.read()) > 0) {
        //Serial.print((char)c);
        if ((char)c == '\n' || (char)c == '}') {
          break;
        }
        response += (char)c;
      }
    }

    //Serial.println(response);
    return response;
    //Serial.println(response);
  } else {
    Serial.println("Failed to connect to server");
    //resetFunc();
  }
}


String GETTrabajo() {
  delay(100);
  client.stop();
  if (client.connect(server, 4000)) {
    Serial.println("Connecting...");
    // send the HTTP PUT request
    String enviar = "GET /getWorkTime HTTP/1.1";
    client.println(enviar);
    //lastConnectionTime = millis();
    client.println(F("Host: 192.168.0.7:4000"));
    client.println("Connection: close");
    client.println();
    
    String response = "";
    bool f = client.find("{");
    if (f) {
      while ( (c = client.read()) > 0) {
        //Serial.print((char)c);
        if ((char)c == '\n' || (char)c == '}') {
          break;
        }
        response += (char)c;
      }
    }

    //Serial.println(response);
    return response;
    //Serial.println(response);
  } else {
    Serial.println("Failed to connect to server");
    //resetFunc();
  }
}
