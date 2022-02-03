#include <ArduinoBLE.h>

BLEService service("c9b0d829-e826-4cba-8504-66f971bfda14");
BLECharCharacteristic characteristic("488b392b-97eb-4d6a-9715-1fbc4b202cbe", BLENotify | BLERead);

BLEStringCharacteristic ledCharacteristic("216978d7-d887-4ad4-bb02-1bc00e39f3d9", BLERead | BLEWrite | BLENotify, 20);

bool buttonADown = false;
bool buttonBDown = false;
bool buttonCDown = false;
bool buttonDDown = false;

void setup()
{
  Serial.begin(9600);
  Serial.println("aight");


  service.addCharacteristic(characteristic);
  service.addCharacteristic(ledCharacteristic);

  if (!BLE.begin()) {
    Serial.println("Connect NOW!");
  }

  BLE.setLocalName("Game Controller 1");
  BLE.setDeviceName("Game Controller 1");


  BLE.addService(service);

  BLE.setAdvertisedService(service);

  BLE.advertise();

  
  pinMode(2, INPUT);
  pinMode(3, INPUT);
  pinMode(4, INPUT);
  pinMode(5, INPUT);

  pinMode(9, OUTPUT);
  pinMode(10, OUTPUT);

}

void loop()
{


  

  if (digitalRead(2) == HIGH) {
    Serial.println("D");

    if (buttonDDown == false) {
      buttonDDown = true;
      
      //if (BLE.connected()) {
        characteristic.writeValue('D');
        Serial.println("D pressed");
      //}
      
    }
  } else {
    buttonDDown = false;
  }
  
  if (digitalRead(3) == HIGH) {
    Serial.println("B");

    if (buttonBDown == false) {
      buttonBDown = true;
      
      //if (BLE.connected()) {
        characteristic.writeValue('B');
        Serial.println("B pressed");
      //}
      
    }
  } else {
    buttonBDown = false;
  }

  if (digitalRead(4) == HIGH) {
    Serial.println("C");

    if (buttonCDown == false) {
      buttonCDown = true;
      
      //if (BLE.connected()) {
        characteristic.writeValue('C');
        Serial.println("C pressed");
      //}
      
    }
  } else {
    buttonCDown = false;
  }
  
  if (digitalRead(5) == HIGH) {
    Serial.println("A");

    if (buttonADown == false) {
      buttonADown = true;
      
      //if (BLE.connected()) {
        characteristic.writeValue('A');
        Serial.println("A pressed");
      //}
      
    }
  } else {
    buttonADown = false;
  }

  if (BLE.connected()) {
    if (ledCharacteristic.written()) {
      if (String(ledCharacteristic.value()) == "notpaused") {
        digitalWrite(9, HIGH);
        digitalWrite(10, LOW);
      } else if (String(ledCharacteristic.value()) == "paused") {
        digitalWrite(9, LOW);
        digitalWrite(10, HIGH);
      } else if (String(ledCharacteristic.value()) == "closeall") {
        digitalWrite(9, LOW);
        digitalWrite(10, LOW);
      } else if (String(ledCharacteristic.value()) == "enterfullscreen") {
        digitalWrite(9, HIGH);
        digitalWrite(10, LOW);
      }

      
    }
  }
  

  delay(50);
}
