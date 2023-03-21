//IMPORTACIONES
#include "TM1637Display.h"

//Definiciones:
#define CLK 2
#define DIO 3
#define RESET 47
#define buzzPin 7

//VARIABLES GLOBALES:
int verificacion_actual = 1;
int tiempoTrabajo = 25 * 60;
int tiempoDescanso = 5 * 60;
int tiempoIngresado;
int descansoIngresado;


TM1637Display display(CLK, DIO);
uint8_t position[] = { 0, 0, 0, 0 };

const uint8_t ErrL[] = {
  SEG_A | SEG_D | SEG_E | SEG_G | SEG_F, //E
  SEG_E | SEG_G , //r
  SEG_E | SEG_G , //r
  SEG_D | SEG_E | SEG_F, //L
};


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
  Serial.begin(9600);
}

void loop() {

  if (digitalRead(22) != verificacion_actual) { //significa que manda un 1, es decir, está en ciclo
    if (verificacion_actual == 0) {
      ciclo();
      verificacion_actual = 1;
    }
    else {
      //Serial.println("config");
      config_pomododo();
      //verificacion_actual = 0;
    }
  }
}

void ciclo() {
  while (tiempoTrabajo >= 0) {
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
      for(int i = 0; i < 5; i++){
        digitalWrite(buzzPin, HIGH);
        delay(500);
        digitalWrite(buzzPin, LOW);
        delay(500);
      }
      break;
    }
  }

}

void config_pomododo() {
  //Para el display:
  tiempoTrabajo = ((int(analogRead(A0) / 23) + 1) * 60);
  tiempoIngresado = tiempoTrabajo;
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

    if ( digitalRead(47) == HIGH || ((int(analogRead(A0) / 23) + 1) * 60) != pot) {
      if (digitalRead(47) == HIGH) {
        verificacion_actual = 0;
        break;
      }
      else {
        verificacion_actual = 1;
        break;
      }
    }
  }
}
