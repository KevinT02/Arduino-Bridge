//motor pins
int motor1for = 4;
int motor1bac = 5;
int motor2for = 6;
int motor2bac = 7;

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

void extend(int time1, int time2)
{
  /*Initializes the motors to begin the extending motion.
  Begins by extending the second motor long enough to undo
  the spun rope around the wheel from the retracting motion.
  First phase is stopped before beginning the second. The 
  first motor begins to extend and the second motor begins to
  retract to unfold the bridge and then stops it after it has 
  unfolded. */
  
  //begins turning second motor forward
  digitalWrite(motor2for, HIGH);  //turns second motor forward
  delay(time1);  //time second motors spins to complete first phase
  digitalWrite(motor2for, LOW);  //stops the second motor 
  
  //begins turning first motor forward and second motor backward
  digitalWrite(motor1for, HIGH);
  digitalWrite(motor2bac, HIGH);
  
  delay(time2);  //time both motors spins to complete second phase 
  
  //stops both motors
  digitalWrite(motor2bac, LOW);
  digitalWrite(motor1for,LOW);
}

void retract(int time1, int time2)
{
  /*Initializes the motors to begin the retracting motion.
  Begins by retracting the first section of the bridge using 
  motor1, then begins retracting the second section of the 
  bridge using motor2 */
  
  //begins turning first motor backwards
  digitalWrite(motor1bac,HIGH);  //turns first motor backward
  delay(time1);  //time first motor spins
  digitalWrite(motor1bac, LOW);  //stops the first motor
  
  //begins turning second motor backwards
  digitalWrite(motor2bac, HIGH);
  delay(time2); //time second motors spin
  digitalWrite(motor2bac, LOW); //stops the second motor
}

void halt()
{
  //Stops all power going to all motors and stops the motion of the bridge deck
  digitalWrite(motor1for,LOW);
  digitalWrite(motor1bac,LOW);
  digitalWrite(motor2for,LOW);
  digitalWrite(motor2bac,LOW);
}



 
void loop() {

  //---Prepares IQ Sensor---//
  
  //Charge capacitor for 1ms
  pinMode(2, OUTPUT);
  //Set pin to HIGH to charge up capacitor and start up QTI sensor
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
  
  /* Initialize the Ultrasonic Sensor with the trigger ping and motion given 
  by the code below and calculates the distance in centimeters before printing 
  it into the Arduino monitor */
  
  // Give a short LOW pulse beforehand to refresh before a HIGH pulse  
  digitalWrite(trigPin, LOW); 
  delayMicroseconds(5);

  // The sensor is triggered by a HIGH pulse of 10 or more microseconds
  digitalWrite(trigPin, HIGH); 
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
 
  /* Read the signal from the sensor: a HIGH pulse whose
  duration is the time (in microseconds) from the sending
  of the ping to the reception of its echo, off of an object */
  
  pinMode(echoPin, INPUT);
  duration = pulseIn(echoPin, HIGH);
 
  /* Convert the time into a distance
  The speed of sound is: 343m/s = 0.0343 cm/uS = 1/29.1 cm/uS 
  or in inches: 13503.9in/s = 0.0135in/uS = 1/74in/uS */
  
  cm = (duration/2) / 29.1; // Divide by 29.1 or multiply by 0.0343

  //Prints variable distance in centimeters into monitor on the same line as sensor before starting new line
  Serial.print(" Distance: ");
  Serial.print(cm);
  Serial.print("cm");
  Serial.println();
  
  delay(250);

  //----------Motion---------//

  //QTI Sensor
  //executes code when QTI sensor sees black; extends
  if (sensor == 0)
  {
    extend(4800, 1600);
  }
  
  //Ultra Sonic Sensor
  //executes code when Ultra Sonic Sensor sees a value less than 15; retracts
  else if (cm <15)
  {
    retract(3000, 1600);
  }
  
  else
  {
    halt();
  }

}
