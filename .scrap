const int pwr = 1; //pwm
const int motor_in_1 = 6;
const int motor_in_2 = 7;
const int motor_in_3 = 8;
const int motor_in_4 = 9;

void setup()
{
  pinMode(pwr, OUTPUT);
  pinMode(motor_in_1 , OUTPUT);
  pinMode(motor_in_2 , OUTPUT);
  pinMode(motor_in_3 , OUTPUT);
  pinMode(motor_in_4 , OUTPUT);
}

void looop()
{
  digitalWrite(motor_in_1,HIGH);
  digitalWrite(motor_in_2,LOW);
  digitalWrite(motor_in_3,HIGH);
  digitalWrite(motor_in_4,LOW);
  analogWrite(pwr,255) ;

  delay(3000);

  digitalWrite(motor_in_1,HIGH);
  digitalWrite(motor_in_2,HIGH);
  digitalWrite(motor_in_3,HIGH);
  digitalWrite(motor_in_4,HIGH);

  delay(1000) ;

  digitalWrite(motor_in_1,LOW) ;
  digitalWrite(motor_in_2,HIGH) ;
  digitalWrite(motor_in_3,LOW) ;
  digitalWrite(motor_in_4,HIGH) ;

  delay(3000) ;


  digitalWrite(motor_in_1,HIGH);
  digitalWrite(motor_in_2,HIGH);
  digitalWrite(motor_in_3,HIGH);
  digitalWrite(motor_in_4,HIGH);

  delay(1000) ;
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

