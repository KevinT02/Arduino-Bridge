int forward = 10;
int backward = 11;

void setup() {
  Serial.begin(9600);

  //-- Setup Motors
  pinMode(forward, OUTPUT);
  pinMode(backward,OUTPUT); 
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
  digitalWrite(forward,HIGH);
  delay(time);
  digitalWrite(forward,LOW);
  delay(time);
}

void retract(int time)
{
  digitalWrite(backward,HIGH);
  delay(time);
  digitalWrite(backward,LOW);
  delay(time);
}

void halt()
{
  analogWrite(forward,LOW);
  analogWrite(backward,LOW);
}
