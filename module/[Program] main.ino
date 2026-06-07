// MAIN PROGRAM

#include "DHT.h"
#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <WiFi.h>
#include <HTTPClient.h>

// Batas thresholding
#define threshold 85.0

// DHT22
#define DHTPIN 33       // Digital pin connected to the DHT sensor
#define DHTTYPE DHT22   // DHT 22  (AM2302), AM2321
DHT dht(DHTPIN, DHTTYPE);

// LCD I2C
LiquidCrystal_I2C lcd(0x27, 16, 2);

// Relay
int myRelay = 18;               // relay pin
volatile byte relayState = LOW;

// Wifi
const char* ssid = "Wokwi-GUEST"; // nama wifinya
const char* password = "";

// Domain Name with full URL Path for HTTP POST Request
const char* serverName = "http://api.thingspeak.com/update";
// Service API Key
String apiKey = "QT2UF9CDFD3Y1OTI";

// Delay http request
unsigned long lastTime = 0;
unsigned long timerDelay = 15001;

void setup() {
  Serial.begin(9600);
  Serial.println(F("Automatic Mist Sprayer test!"));

  // DHT22
  dht.begin();

  // LCD I2C
  lcd.init();        // inisialisasi LCD
  lcd.backlight();   // nyalakan lampu
  lcd.setCursor(0, 0);
  lcd.print("Initializing...");
  delay(2000);
  lcd.clear();

  // relay
  pinMode(myRelay, OUTPUT);
  digitalWrite(myRelay, LOW);
  relayState = LOW;
  Serial.println("RELAY OFF");

  // initiate wifi connection
  WiFi.begin(ssid, password);

  // wifi connecting process interface
  Serial.println("Connecting");
  lcd.print("Connecting...");
  while(WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  lcd.clear();

  // Successfully connected
  Serial.println("");
  Serial.print("Connected to WiFi network with IP Address: ");
  Serial.println(WiFi.localIP());
  lcd.setCursor(0, 0);
  lcd.print("Connected w/ IP");
  lcd.setCursor(0, 1);
  lcd.print(WiFi.localIP());
  lcd.clear();

  // Random seed is a number used to initialize a pseudorandom number generator
  randomSeed(analogRead(33));
}

void loop() {
  // memberikan delay aktivasi sensor
  delay(500);

  // Sensor readings may also be up to 2 seconds 'old' (its a very slow sensor)
  float humidity = dht.readHumidity();
  // Read temperature as Celsius (the default)
  float temp_celc = dht.readTemperature();

  // Check if any reads failed and exit early (to try again).
  if (isnan(humidity) || isnan(temp_celc)) {
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("Sensor Error");
    Serial.println(F("Failed to read from DHT sensor!"));
    delay(2000);
    return;
  }

  Serial.print(F("Humidity: "));
  Serial.print(humidity);
  Serial.print(F("%  Temperature: "));
  Serial.print(temp_celc);
  Serial.print(F("°C\n"));

  // LCD
  lcd.clear();

  lcd.setCursor(0, 0);
  lcd.print("Temp: ");
  lcd.print(temp_celc);
  lcd.print(" C");

  lcd.setCursor(0, 1);
  lcd.print("Hum : ");
  lcd.print(humidity);
  lcd.print(" %");

  if(humidity < threshold){
    pullRelayHIGH();
  } else {
    pullRelayLOW();
  }

  if ((millis() - lastTime) > timerDelay) {
    //Check WiFi connection status
    if(WiFi.status()== WL_CONNECTED){
      WiFiClient client;   HTTPClient http;
    
      http.begin(client, serverName);
      // Specify content-type header
      http.addHeader("Content-Type", "application/x-www-form-urlencoded");
      // Data to send with HTTP POST
      String httpRequestData = "api_key=" + apiKey + "&field1=" + String(temp_celc) + "&field2=" + String(humidity) + "&field3=" + String(isRelayStateHigh());          
      // Send HTTP POST request
      int httpResponseCode = http.POST(httpRequestData);
      Serial.print("HTTP Response code: ");     Serial.println(httpResponseCode);
      // Free resources
      http.end();
    }
    else {
     Serial.println("WiFi Disconnected");
    }
    lastTime = millis();

    delay(2000);
 }

  delay(2000);
}

void pullRelayHIGH() {
    if(relayState != HIGH){
        digitalWrite(myRelay, HIGH);
        relayState = HIGH;
        Serial.println("RELAY ON");
    }
}

void pullRelayLOW() {
    if(relayState != LOW){
        digitalWrite(myRelay, LOW);
        relayState = LOW;
        Serial.println("RELAY OFF");
    }
}

int isRelayStateHigh() {
  if (relayState == HIGH)
    return 1;
  else
    return 0;
}