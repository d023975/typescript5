console.log('your code goes here .....!');

//intersection types

type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
  name: 'Max',
  privileges: ['create-server'],
  startDate: new Date(),
};

type Combinable = string | number;
type Numeric = number | boolean;
type Universal = Combinable & Numeric;

// type guards
function add(a: Combinable, b: Combinable) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString(); // type guard
  }
  return a + b;
}

type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
  console.log('Name ' + emp.name);
  if ('privileges' in emp) {
    // guard
    console.log('Privileges' + emp.privileges);
  }
  if ('startDate' in emp) {
    // guard
    console.log('Start Date' + emp.startDate);
  }
}

class Car {
  drive() {
    console.log('driving car');
  }
}

class Truck {
  drive() {
    console.log('driving truck');
  }

  loadCargo(amount: number) {
    console.log('loading ... ' + amount);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  //  if ('loadCargo' in vehicle) //type guard
  if (vehicle instanceof Truck) {
    //type guard
    vehicle.loadCargo(2422);
  }
}
useVehicle(v1);
useVehicle(v2);

// Discriminated Unions
interface Bird {
  type: 'bird';
  flyingSpeed: number;
}

interface Horse {
  type: 'horse';
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  let speed;
  switch (animal.type) {
    case 'bird':
      speed = animal.flyingSpeed;
      break;
    case 'horse':
      speed = animal.runningSpeed;
      break;
  }
  console.log('moving with speed ' + speed);
}

moveAnimal({ type: 'bird', flyingSpeed: 10 });

// Type casting

// const userInputElement = <HTMLInputElement>document.getElementById('user-input');
const userInputElement = document.getElementById(
  'user-input'
)! as HTMLInputElement;
userInputElement.value = 'Hello!';

// Index types
interface ErrorContainer {
  // { email: 'not a valid eMail' , username: 'Must start with a character'}
  [prop: string]: string; // prop name is string, value is string
}

const errorBag: ErrorContainer = {
  eMail: 'Not a valid eMail!',
  username: 'Must start with a capital character',
};

//function overloads

function sum(a: string, b: string): string;
function sum(a: number, b: number): number;
function sum(a: Combinable, b: Combinable) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString(); // type guard
  }
  return a + b;
}

const result = sum('Karl', 'Napp');
result.split(' '); // now I know string is returned and I can use split of string

//Optional Chaining

const fetchedUserData = {
  id: 'u1',
  name: 'Max',
  job: { title: 'CEO', description: 'My company' },
};

console.log(fetchedUserData?.job?.title);

//Nullish Coalescing

const userInput = null;
//const storedDate = userInput || 'DEFAULT'; //is als stored for empty strings since they are evaluated to false
const storedDate = userInput ?? 'DEFAULT';