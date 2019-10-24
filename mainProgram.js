
int motor1for = 9;
int motor1bac = 10;
int motor2for = 12;
int motor2bac = 13;

void setup() {
  Serial.begin(9600);

  //-- Setup Motors
  pinMode(motor1for, OUTPUT);
  pinMode(motor1bac, OUTPUT); 
  pinMode(motor2for, OUTPUT);
  pinMode(motor2bac, OUTPUT);
  Serial.println("Testing QTI Sensor");
  delay(1);
  }

void loop() {


  //-- Charge capacitor for 1ms
  pinMode(2, OUTPUT);
  digitalWrite(2, HIGH);
  delay(1);

  //-- Wait 1ms and let capacitor discharge
  pinMode(2, INPUT);
  delay(1);

  //-- read pin 2
  byte sensor = digitalRead(2);

  Serial.println(sensor);
  
  if (sensor == 0)
  {
    extend(3000);
    retract(3000);  
    
    
  }
  
  else
  {
    halt(); 
  }
   
}

  
//---------------FUNCTIONS-----------------//

void extend(int time)
{
  digitalWrite(motor1for, HIGH);
  digitalWrite(motor2for, HIGH);
  delay(time);
  digitalWrite(motor1for, LOW); 
  digitalWrite(motor2for, LOW);
  delay(time);
}

void retract(int time)
{
  digitalWrite(motor1bac, HIGH);
  digitalWrite(motor2bac, HIGH);
  delay(time);
  digitalWrite(motor1bac, LOW); 
  digitalWrite(motor2bac, LOW);
  delay(time);
}

void halt()
{
  analogWrite(motor1for, LOW);
  analogWrite(motor1bac, LOW); 
  analogWrite(motor2for, LOW);
  analogWrite(motor2bac, LOW);
}




