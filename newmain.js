//motor pins
int motor1for = 6;
int motor1bac = 7;
int motor2for = 8;
int motor2bac = 9;

//ultrasonic Sensor pins
int trigPin = 11;    // Trigger
int echoPin = 12;    // Echo

// defines variables for Ultrasonic Sensor
long duration, cm, inches;


void setup() {
  //Serial Port begin
  Serial.begin (9600);

  //Define inputs and outputs for ultrasonic
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  
  //Define inputs and outputs for motors
  pinMode(motor1for, OUTPUT);
  pinMode(motor1bac, OUTPUT); 
  pinMode(motor2for, OUTPUT);
  pinMode(motor2bac, OUTPUT); 

}

//-----------------------------------------//  
//---------------FUNCTIONS-----------------//

void extend1(int time)
{
  delay(time);
  digitalWrite(motor1for,HIGH); //spins motor clockwise
  delay(time); //delays based on the variable time
}

void retract1(int time)
{
  delay(time);
  digitalWrite(motor1bac,HIGH); //spins motor counter clockwise
  delay(time); //delays based on the variable time

}

void extend2(int time)
{
  delay(time);
  digitalWrite(motor2for,HIGH); //spins motor clockwise
  delay(time); //delays based on the variable time
}

void retract2(int time)
{
  delay(time);
  digitalWrite(motor2bac,HIGH); //spins motor counter clockwise
  delay(time); //delays based on the variable time

}

void halt()
{
  //stops power going into motor thus, stopping it
  digitalWrite(motor1for,LOW); 
  digitalWrite(motor1bac,LOW);
  digitalWrite(motor2for,LOW); 
  digitalWrite(motor2bac,LOW);
}

 
void loop() {

  //---Prepares IQ Sensor---//
  
  //Charge capacitor for 1ms
  pinMode(2, OUTPUT);
  digitalWrite(2, HIGH);
  delay(1);

  //Wait 1ms and let capacitor discharge
  pinMode(2, INPUT);
  delay(1);
  
  //Read pin 2 values and prints into the monitor
  byte sensor = digitalRead(2);
  Serial.print("Sensor: ");
  Serial.print(sensor); 
  Serial.print("");
  delay(255);

  
  //---Prepares the Ultrasonic Sensor---//
    
  digitalWrite(trigPin, LOW); // Give a short LOW pulse beforehand to refresh before a HIGH pulse
  delayMicroseconds(5);
  digitalWrite(trigPin, HIGH); // The sensor is triggered by a HIGH pulse of 10 or more microseconds
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
 
  // Read the signal from the sensor: a HIGH pulse whose
  // duration is the time (in microseconds) from the sending
  // of the ping to the reception of its echo off of an object.
  pinMode(echoPin, INPUT);
  duration = pulseIn(echoPin, HIGH);
 
  // Convert the time into a distance
  // The speed of sound is: 343m/s = 0.0343 cm/uS = 1/29.1 cm/uS 
  // or in inches: 13503.9in/s = 0.0135in/uS = 1/74in/uS  
  
  cm = (duration/2) / 29.1; // Divide by 29.1 or multiply by 0.0343

  //Prints variable distance in centimeters into monitor
  Serial.print(" Distance: ");
  Serial.print(cm);
  Serial.print("cm");
  Serial.println();
  
  delay(250);

  //----------Motion---------//
 
  //QTI Sensor
  if (sensor == 1)
  {
    halt() //make sure motor is not spinning before starting
    extend1(3000);
    extend2(3000);
  }
  
  //Ultra Sonic Sensor
  else if (cm <15)
  {
    halt() //make sure motor is not spinning before starting
    retract1(3000); 
    retract1(3000);      
  }
  
  else
  {
    halt();
  }

}
