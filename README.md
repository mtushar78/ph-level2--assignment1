## Interface এবং Type এর মধ্যে পার্থক্য

TypeScript এ Interface এবং Type উভয়ই object এর structure define করতে ব্যবহৃত হয়, তবে তাদের মধ্যে কিছু গুরুত্বপূর্ণ পার্থক্য রয়েছে।

### Interface কি?

Interface হল একটি কাঠামো যা object এর shape বা structure বর্ণনা করে। এটি মূলত একটি চুক্তি (contract) যা নির্দিষ্ট করে যে কোন object এ কোন properties এবং methods থাকতে হবে।

#### প্রাথমিক Interface উদাহরণ

```typescript
interface User {
  name: string;
  age: number;
  email: string;
}

const user: User = {
  name: "Tushar",
  age: 25,
  email: "tushar@xyz.com"
};

console.log(user.name); // "Tushar"
```

#### Interface Extension

```typescript
interface Person {
  name: string;
  age: number;
}

interface Employee extends Person {
  employeeId: string;
  department: string;
  salary: number;
}

const employee: Employee = {
  name: "Karim",
  age: 30,
  employeeId: "EMP001",
  department: "IT",
  salary: 50000
};

console.log(`${employee.name} works in ${employee.department}`);
```

#### একাধিক Interface Extension

```typescript
interface Printable {
  print(): void;
}

interface Loggable {
  log(): void;
}

interface Document extends Printable, Loggable {
  title: string;
  content: string;
}

const myDocument: Document = {
  title: "TypeScript Guide",
  content: "This is a comprehensive guide",
  print() {
    console.log(`Printing: ${this.title}`);
  },
  log() {
    console.log(`Log: ${this.title} - ${this.content}`);
  }
};

myDocument.print(); // "Printing: TypeScript Guide"
myDocument.log();   // "Log: TypeScript Guide - This is a comprehensive guide"
```

---

### Type কি?

Type Alias হল একটি নাম যা যেকোনো type এর জন্য ব্যবহার করা যায়। এটি Interface এর চেয়ে আরও flexible এবং বিভিন্ন ধরনের type define করতে পারে।

#### প্রাথমিক Type উদাহরণ

```typescript
type User = {
  name: string;
  age: number;
  email: string;
};

const user: User = {
  name: "Salma",
  age: 28,
  email: "salma@example.com"
};

console.log(user.email); // "salma@example.com"
```

#### Type Intersection (ছেদ)

```typescript
type Person = {
  name: string;
  age: number;
};

type Contact = {
  email: string;
  phone: string;
};

type Employee = Person & Contact & {
  employeeId: string;
  department: string;
};

const employee: Employee = {
  name: "Habib",
  age: 35,
  email: "habib@example.com",
  phone: "01712345678",
  employeeId: "EMP002",
  department: "Sales"
};

console.log(`${employee.name}: ${employee.phone}`);
```

#### Union Types (যুক্ত প্রকার)

```typescript
type ID = string | number;

let userId: ID;
userId = "USER123";  // ✓ Valid
userId = 456;        // ✓ Valid
// userId = true;    // ✗ Error!

type Status = "active" | "inactive" | "pending";

function updateStatus(status: Status): void {
  console.log(`Status updated to: ${status}`);
}

updateStatus("active");   // ✓ Valid
updateStatus("pending");  // ✓ Valid
// updateStatus("deleted"); // ✗ Error!
```

#### Primitive Type Aliases

```typescript
type Age = number;
type Name = string;
type IsActive = boolean;

type UserID = string;
type Score = number;

interface Player {
  id: UserID;
  name: Name;
  age: Age;
  score: Score;
  isActive: IsActive;
}

const player: Player = {
  id: "P001",
  name: "Sakib",
  age: 22,
  score: 1500,
  isActive: true
};
```

---

### মূল পার্থক্যসমূহ

#### ১. Declaration Merging (ঘোষণা একীকরণ)

**Interface:**

```typescript
interface User {
  name: string;
  age: number;
}

// একই নামে আরেকটি Interface - এগুলো merge হয়ে যাবে
interface User {
  email: string;
}

// এখন User এ তিনটি property আছে: name, age, email
const user: User = {
  name: "Rina",
  age: 26,
  email: "rina@example.com"
};

console.log(user.email); // "rina@example.com"
```

**Type:**

```typescript
type User = {
  name: string;
  age: number;
};

// ✗ Error! Duplicate identifier 'User'
// type User = {
//   email: string;
// };

// Type একই নামে পুনরায় declare করা যায় না
```

#### ২. Extension vs Intersection

**Interface - extends ব্যবহার করে:**

```typescript
interface Animal {
  name: string;
  age: number;
}

interface Dog extends Animal {
  breed: string;
  bark(): void;
}

const myDog: Dog = {
  name: "Tommy",
  age: 3,
  breed: "German Shepherd",
  bark() {
    console.log("Woof! Woof!");
  }
};

myDog.bark(); // "Woof! Woof!"
```

**Type - & (intersection) ব্যবহার করে:**

```typescript
type Animal = {
  name: string;
  age: number;
};

type Dog = Animal & {
  breed: string;
  bark(): void;
};

const myDog: Dog = {
  name: "Buddy",
  age: 2,
  breed: "Labrador",
  bark() {
    console.log("Bow! Bow!");
  }
};

myDog.bark(); // "Bow! Bow!"
```

#### ৩. Union Types সমর্থন

**Type - Union তৈরি করতে পারে:**

```typescript
type StringOrNumber = string | number;
type Result = Success | Error;

type Success = {
  status: "success";
  data: any;
};

type Error = {
  status: "error";
  message: string;
};

type ApiResponse = Success | Error;

function handleResponse(response: ApiResponse): void {
  if (response.status === "success") {
    console.log("Data:", response.data);
  } else {
    console.log("Error:", response.message);
  }
}
```

**Interface - সরাসরি Union তৈরি করতে পারে না:**

```typescript
// ✗ Interface দিয়ে সরাসরি Union করা যায় না
// interface StringOrNumber = string | number; // Error!

// কিন্তু এভাবে করা যায়:
interface Success {
  status: "success";
  data: any;
}

interface Error {
  status: "error";
  message: string;
}

type ApiResponse = Success | Error; // Type ব্যবহার করতে হবে
```

#### ৪. Primitive এবং Tuple Types

**Type - সব ধরনের type এর জন্য:**

```typescript
// Primitive types
type Name = string;
type Age = number;
type IsValid = boolean;

// Tuple types
type Coordinate = [number, number];
type RGB = [number, number, number];

const point: Coordinate = [10, 20];
const color: RGB = [255, 128, 0];

// Function types
type MathOperation = (a: number, b: number) => number;

const add: MathOperation = (a, b) => a + b;
const multiply: MathOperation = (a, b) => a * b;

console.log(add(5, 3));      // 8
console.log(multiply(4, 7)); // 28
```

**Interface - শুধুমাত্র object structure এর জন্য:**

```typescript
// Interface শুধু object shape define করতে পারে
interface User {
  name: string;
  age: number;
}

// ✗ এগুলো Interface দিয়ে করা যায় না:
// interface Name = string;        // Error!
// interface Coordinate = [number, number]; // Error!
```

#### ৫. Computed Properties

**Interface:**

```typescript
const propName = "email";

interface User {
  name: string;
  [propName]: string; // ✓ Computed property
}

const user: User = {
  name: "Nasir",
  email: "nasir@example.com"
};
```

**Type:**

```typescript
const propName = "email";

type User = {
  name: string;
  [propName]: string; // ✓ Computed property
};

const user: User = {
  name: "Farhana",
  email: "farhana@example.com"
};
```

---

### বাস্তব উদাহরণ

#### উদাহরণ ১: Library API Design (Interface ব্যবহার)

```typescript
// Library authors এর জন্য Interface ভালো
interface EventEmitter {
  on(event: string, callback: Function): void;
  emit(event: string, data?: any): void;
}

// Users এরা extend করতে পারবে
interface CustomEmitter extends EventEmitter {
  once(event: string, callback: Function): void;
}

class MyEmitter implements CustomEmitter {
  on(event: string, callback: Function): void {
    console.log(`Listening to ${event}`);
  }
  
  emit(event: string, data?: any): void {
    console.log(`Emitting ${event}`, data);
  }
  
  once(event: string, callback: Function): void {
    console.log(`One-time listener for ${event}`);
  }
}

const emitter = new MyEmitter();
emitter.emit("userLogin", { userId: "123" });
```

#### উদাহরণ ২: Complex Type Combinations (Type ব্যবহার)

```typescript
type Loading = {
  state: "loading";
};

type Success<T> = {
  state: "success";
  data: T;
};

type Failure = {
  state: "error";
  error: string;
};

type AsyncState<T> = Loading | Success<T> | Failure;

// ব্যবহার
type UserState = AsyncState<{ name: string; email: string }>;

function handleUserState(state: UserState): void {
  switch (state.state) {
    case "loading":
      console.log("Loading user data...");
      break;
    case "success":
      console.log(`User: ${state.data.name}`);
      break;
    case "error":
      console.log(`Error: ${state.error}`);
      break;
  }
}

// Test
handleUserState({ state: "loading" });
handleUserState({ 
  state: "success", 
  data: { name: "Anika", email: "anika@example.com" } 
});
handleUserState({ state: "error", error: "User not found" });
```

#### উদাহরণ ৩: Utility Types (Type ব্যবহার)

```typescript
type User = {
  id: string;
  name: string;
  email: string;
  age: number;
  address: string;
};

// Pick specific properties
type UserPreview = Pick<User, "id" | "name">;

const preview: UserPreview = {
  id: "U001",
  name: "Jamal"
};

// Omit specific properties
type UserWithoutAddress = Omit<User, "address">;

const user: UserWithoutAddress = {
  id: "U002",
  name: "Sharmin",
  email: "sharmin@example.com",
  age: 29
};

// Partial - all properties optional
type PartialUser = Partial<User>;

const updateData: PartialUser = {
  name: "New Name"
  // other properties are optional
};

// Readonly - all properties readonly
type ReadonlyUser = Readonly<User>;

const fixedUser: ReadonlyUser = {
  id: "U003",
  name: "Hasan",
  email: "hasan@example.com",
  age: 32,
  address: "Dhaka"
};

// fixedUser.name = "New Name"; // ✗ Error! Cannot assign to 'name'
```

---

### তুলনা সারণী

| বৈশিষ্ট্য | Interface | Type |
|---------|-----------|------|
| Object structure | ✓ | ✓ |
| Extends/Inheritance | `extends` keyword | `&` intersection |
| Declaration merging | ✓ সমর্থন করে | ✗ সমর্থন করে না |
| Union types | ✗ সরাসরি না | ✓ সমর্থন করে |
| Primitive aliases | ✗ না | ✓ হ্যাঁ |
| Tuple types | ✗ না | ✓ হ্যাঁ |
| Function types | ✓ | ✓ |
| Computed properties | ✓ | ✓ |
| Class implementation | ✓ | ✓ |
| Performance | সামান্য দ্রুত | সামান্য ধীর (complex types এ) |

---

### কখন কোনটি ব্যবহার করবেন?

#### Interface ব্যবহার করুন যখন:

✅ **Public API design করছেন**
```typescript
// Library বা framework এর জন্য
interface Plugin {
  name: string;
  version: string;
  init(): void;
}
```

✅ **Object-oriented programming করছেন**
```typescript
interface Shape {
  area(): number;
  perimeter(): number;
}

class Circle implements Shape {
  constructor(private radius: number) {}
  
  area(): number {
    return Math.PI * this.radius ** 2;
  }
  
  perimeter(): number {
    return 2 * Math.PI * this.radius;
  }
}
```

✅ **Declaration merging প্রয়োজন**
```typescript
// Third-party library extend করার সময়
interface Window {
  myCustomProperty: string;
}

window.myCustomProperty = "Hello";
```

#### Type ব্যবহার করুন যখন:

✅ **Union types প্রয়োজন**
```typescript
type Status = "pending" | "approved" | "rejected";
type ID = string | number;
```

✅ **Complex type manipulations**
```typescript
type ReadonlyUser = Readonly<User>;
type PartialConfig = Partial<Config>;
type UserKeys = keyof User;
```

✅ **Primitive type aliases**
```typescript
type Email = string;
type Age = number;
type Coordinate = [number, number];
```

✅ **Conditional types**
```typescript
type IsString<T> = T extends string ? true : false;
type Result = IsString<"hello">; // true
```

---

## keyof Keyword এর ব্যবহার

### keyof কি?

`keyof` হল TypeScript এর একটি operator যা একটি object type এর সমস্ত property name গুলোকে union type হিসেবে extract করে। এটি type-safe property access এবং dynamic property manipulation এর জন্য অত্যন্ত useful।

### মূল ধারণা

```typescript
interface User {
  name: string;
  age: number;
  email: string;
}

// keyof User = "name" | "age" | "email"
type UserKeys = keyof User;

let key: UserKeys;
key = "name";   // ✓ Valid
key = "age";    // ✓ Valid
key = "email";  // ✓ Valid
// key = "phone"; // ✗ Error! "phone" is not a key of User
```

---

### কিভাবে কাজ করে

#### ধাপ ১: Type থেকে Keys Extract করা

```typescript
interface Product {
  id: string;
  name: string;
  price: number;
  inStock: boolean;
}

// keyof Product returns: "id" | "name" | "price" | "inStock"
type ProductKeys = keyof Product;

const validKey: ProductKeys = "name";     // ✓ OK
const anotherKey: ProductKeys = "price";  // ✓ OK
// const invalidKey: ProductKeys = "color"; // ✗ Error!
```

#### ধাপ ২: Generic Function এ ব্যবহার

```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const product = {
  id: "P001",
  name: "Laptop",
  price: 50000,
  inStock: true
};

const productName = getProperty(product, "name");   // Type: string
const productPrice = getProperty(product, "price"); // Type: number
const inStock = getProperty(product, "inStock");    // Type: boolean

// const invalid = getProperty(product, "color");   // ✗ Error!

console.log(productName);  // "Laptop"
console.log(productPrice); // 50000
```

#### ধাপ ৩: Type-Safe Property Update

```typescript
function updateProperty<T, K extends keyof T>(
  obj: T,
  key: K,
  value: T[K]
): void {
  obj[key] = value;
}

interface Student {
  name: string;
  roll: number;
  grade: string;
  passed: boolean;
}

const student: Student = {
  name: "Rafiq",
  roll: 101,
  grade: "A+",
  passed: true
};

updateProperty(student, "name", "Shafiq");     // ✓ OK
updateProperty(student, "roll", 102);          // ✓ OK
updateProperty(student, "passed", false);      // ✓ OK

// updateProperty(student, "name", 123);       // ✗ Error! Type mismatch
// updateProperty(student, "grade", true);     // ✗ Error! Type mismatch
// updateProperty(student, "age", 20);         // ✗ Error! 'age' doesn't exist

console.log(student.name); // "Shafiq"
console.log(student.roll); // 102
```

---

### ব্যবহারিক উদাহরণ

#### উদাহরণ ১: Dynamic Property Getter

```typescript
interface Person {
  firstName: string;
  lastName: string;
  age: number;
  city: string;
  country: string;
}

function getValue<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const person: Person = {
  firstName: "Kamal",
  lastName: "Ahmed",
  age: 35,
  city: "Dhaka",
  country: "Bangladesh"
};

console.log(getValue(person, "firstName"));  // "Kamal"
console.log(getValue(person, "age"));        // 35
console.log(getValue(person, "city"));       // "Dhaka"

// Type safety ensures correct return types
const name: string = getValue(person, "firstName");  // ✓ OK
const age: number = getValue(person, "age");         // ✓ OK
// const wrong: string = getValue(person, "age");    // ✗ Error!
```

#### উদাহরণ ২: Object Property Validator

```typescript
interface FormData {
  username: string;
  email: string;
  age: number;
  terms: boolean;
}

function validateField<T, K extends keyof T>(
  data: T,
  field: K,
  validator: (value: T[K]) => boolean
): boolean {
  return validator(data[field]);
}

const formData: FormData = {
  username: "user123",
  email: "user@example.com",
  age: 25,
  terms: true
};

// Validate username length
const isUsernameValid = validateField(
  formData,
  "username",
  (value) => value.length >= 5
);

// Validate age range
const isAgeValid = validateField(
  formData,
  "age",
  (value) => value >= 18 && value <= 100
);

// Validate email format
const isEmailValid = validateField(
  formData,
  "email",
  (value) => value.includes("@")
);

// Validate terms acceptance
const areTermsAccepted = validateField(
  formData,
  "terms",
  (value) => value === true
);

console.log("Username valid:", isUsernameValid);  // true
console.log("Age valid:", isAgeValid);            // true
console.log("Email valid:", isEmailValid);        // true
console.log("Terms accepted:", areTermsAccepted); // true
```

#### উদাহরণ ৩: Partial Update Function

```typescript
interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  age: number;
}

function updateUserProfile<K extends keyof UserProfile>(
  user: UserProfile,
  updates: Pick<UserProfile, K>
): UserProfile {
  return { ...user, ...updates };
}

let userProfile: UserProfile = {
  id: "U001",
  name: "Habib Rahman",
  email: "habib@example.com",
  phone: "01712345678",
  address: "Dhaka, Bangladesh",
  age: 28
};

// শুধু নাম এবং ফোন আপডেট করা
userProfile = updateUserProfile(userProfile, {
  name: "Habibur Rahman",
  phone: "01798765432"
});

console.log(userProfile.name);  // "Habibur Rahman"
console.log(userProfile.phone); // "01798765432"

// শুধু ইমেইল আপডেট করা
userProfile = updateUserProfile(userProfile, {
  email: "habibur@newdomain.com"
});

console.log(userProfile.email); // "habibur@newdomain.com"
```

#### উদাহরণ ৪: Type-Safe Event Emitter

```typescript
interface Events {
  userLogin: { userId: string; timestamp: Date };
  userLogout: { userId: string };
  dataUpdate: { dataId: string; changes: any };
  error: { message: string; code: number };
}

class EventEmitter {
  private listeners: {
    [K in keyof Events]?: Array<(data: Events[K]) => void>;
  } = {};

  on<K extends keyof Events>(
    event: K,
    callback: (data: Events[K]) => void
  ): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event]!.push(callback);
  }

  emit<K extends keyof Events>(event: K, data: Events[K]): void {
    const callbacks = this.listeners[event];
    if (callbacks) {
      callbacks.forEach(callback => callback(data));
    }
  }
}

const emitter = new EventEmitter();

// Type-safe event listeners
emitter.on("userLogin", (data) => {
  console.log(`User ${data.userId} logged in at ${data.timestamp}`);
});

emitter.on("userLogout", (data) => {
  console.log(`User ${data.userId} logged out`);
});

emitter.on("error", (data) => {
  console.log(`Error [${data.code}]: ${data.message}`);
});

// Type-safe event emission
emitter.emit("userLogin", {
  userId: "user123",
  timestamp: new Date()
});

emitter.emit("userLogout", {
  userId: "user123"
});

emitter.emit("error", {
  message: "Something went wrong",
  code: 500
});

// emitter.emit("userLogin", { userId: 123 }); // ✗ Error! Wrong type
// emitter.emit("invalidEvent", {});           // ✗ Error! Invalid event
```

#### উদাহরণ ৫: Mapped Types তৈরি করা

```typescript
// সব properties কে optional করা
type Optional<T> = {
  [K in keyof T]?: T[K];
};

// সব properties কে readonly করা
type ReadOnly<T> = {
  readonly [K in keyof T]: T[K];
};

// সব properties কে nullable করা
type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

interface Config {
  apiUrl: string;
  timeout: number;
  retries: number;
  debug: boolean;
}

// Optional configuration
type PartialConfig = Optional<Config>;
const config1: PartialConfig = {
  apiUrl: "https://api.example.com"
  // other properties are optional
};

// Readonly configuration
type ImmutableConfig = ReadOnly<Config>;
const config2: ImmutableConfig = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
  retries: 3,
  debug: true
};
// config2.timeout = 3000; // ✗ Error! Cannot modify readonly property

// Nullable configuration
type NullableConfig = Nullable<Config>;
const config3: NullableConfig = {
  apiUrl: "https://api.example.com",
  timeout: null,
  retries: 3,
  debug: null
};
```

#### উদাহরণ ৬: Form Field Helper

```typescript
interface RegistrationForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  age: number;
  acceptTerms: boolean;
}

type FormErrors<T> = {
  [K in keyof T]?: string;
};

class FormValidator<T> {
  private errors: FormErrors<T> = {};

  setError<K extends keyof T>(field: K, message: string): void {
    this.errors[field] = message;
  }

  getError<K extends keyof T>(field: K): string | undefined {
    return this.errors[field];
  }

  clearError<K extends keyof T>(field: K): void {
    delete this.errors[field];
  }

  hasErrors(): boolean {
    return Object.keys(this.errors).length > 0;
  }

  getErrors(): FormErrors<T> {
    return this.errors;
  }

  clearAll(): void {
    this.errors = {};
  }
}

// ব্যবহার
const validator = new FormValidator<RegistrationForm>();

// Errors set করা
validator.setError("username", "Username must be at least 5 characters");
validator.setError("email", "Invalid email format");
validator.setError("password", "Password too weak");

// Errors get করা
console.log(validator.getError("username"));  
// "Username must be at least 5 characters"

console.log(validator.getError("email"));     
// "Invalid email format"

// সব errors দেখা
console.log(validator.getErrors());
// {
//   username: "Username must be at least 5 characters",
//   email: "Invalid email format",
//   password: "Password too weak"
// }

// একটি error মুছে ফেলা
validator.clearError("email");

// Check করা errors আছে কিনা
console.log(validator.hasErrors()); // true

// সব errors মুছে ফেলা
validator.clearAll();
console.log(validator.hasErrors()); // false
```

#### উদাহরণ ৭: Database Query Builder

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  city: string;
}

type QueryBuilder<T> = {
  [K in keyof T]: (value: T[K]) => QueryResult<T>;
};

interface QueryResult<T> {
  where<K extends keyof T>(field: K, value: T[K]): QueryResult<T>;
  select<K extends keyof T>(...fields: K[]): Pick<T, K>[];
  execute(): T[];
}

class Database<T> {
  constructor(private data: T[]) {}

  query(): QueryResult<T> {
    let filteredData = [...this.data];
    let selectedFields: (keyof T)[] | null = null;

    const result: QueryResult<T> = {
      where: <K extends keyof T>(field: K, value: T[K]) => {
        filteredData = filteredData.filter(item => item[field] === value);
        return result;
      },
      select: <K extends keyof T>(...fields: K[]) => {
        selectedFields = fields;
        return filteredData.map(item => {
          const selected = {} as Pick<T, K>;
          fields.forEach(field => {
            selected[field] = item[field];
          });
          return selected;
        });
      },
      execute: () => filteredData
    };

    return result;
  }
}

// ব্যবহার
const users: User[] = [
  { id: 1, name: "Rahim", email: "rahim@example.com", age: 25, city: "Dhaka" },
  { id: 2, name: "Karim", email: "karim@example.com", age: 30, city: "Chittagong" },
  { id: 3, name: "Salma", email: "salma@example.com", age: 25, city: "Dhaka" },
  { id: 4, name: "Nasir", email: "nasir@example.com", age: 35, city: "Sylhet" }
];

const db = new Database(users);

// Query: Dhaka তে বসবাসকারী users
const dhakaUsers = db.query()
  .where("city", "Dhaka")
  .execute();

console.log(dhakaUsers);
// [
//   { id: 1, name: "Rahim", ... },
//   { id: 3, name: "Salma", ... }
// ]

// Query: ২৫ বছর বয়সী users এর শুধু নাম এবং ইমেইল
const youngUsers = db.query()
  .where("age", 25)
  .select("name", "email");

console.log(youngUsers);
// [
//   { name: "Rahim", email: "rahim@example.com" },
//   { name: "Salma", email: "salma@example.com" }
// ]
```

---

### keyof এর সুবিধাসমূহ

#### ১. Type Safety (টাইপ নিরাপত্তা)

```typescript
interface Product {
  id: string;
  name: string;
  price: number;
}

// Without keyof - কোন type safety নেই
function getBadProperty(obj: Product, key: string): any {
  return obj[key as keyof Product];
}

// With keyof - সম্পূর্ণ type safety
function getGoodProperty<K extends keyof Product>(
  obj: Product,
  key: K
): Product[K] {
  return obj[key];
}

const product: Product = {
  id: "P001",
  name: "Phone",
  price: 20000
};

// Type-safe access
const price: number = getGoodProperty(product, "price");
// const invalid = getGoodProperty(product, "color"); // ✗ Error!
```

#### ২. Auto-completion (স্বয়ংক্রিয় সম্পূর্ণতা)

IDE তে `keyof` ব্যবহার করলে সব valid keys এর suggestion পাওয়া যায়।

```typescript
interface Settings {
  theme: "light" | "dark";
  language: "en" | "bn";
  notifications: boolean;
  fontSize: number;
}

function updateSetting<K extends keyof Settings>(
  key: K,
  value: Settings[K]
): void {
  // IDE এখানে "theme", "language", "notifications", "fontSize" suggest করবে
  console.log(`${String(key)} updated to ${value}`);
}

// Auto-completion কাজ করবে
updateSetting("theme", "dark");
updateSetting("language", "bn");
updateSetting("fontSize", 16);
```

#### ৩. Refactoring Safety (রিফ্যাক্টরিং নিরাপত্তা)

```typescript
interface OldUser {
  userName: string;
  userEmail: string;
}

// Refactor করে নতুন নাম দিলাম
interface NewUser {
  username: string;  // userName -> username
  email: string;     // userEmail -> email
}

function processUser<K extends keyof NewUser>(key: K): void {
  // যদি property name পরিবর্তন করি, TypeScript error দেখাবে
  console.log(key);
}

// Old code automatically error দেখাবে refactor এর পর
// processUser("userName");  // ✗ Error after refactoring
processUser("username");     // ✓ OK
```

#### ৪. Runtime Validation (রানটাইম যাচাইকরণ)

```typescript
interface Config {
  host: string;
  port: number;
  ssl: boolean;
  timeout: number;
}

function isValidConfigKey(key: string): key is keyof Config {
  return ["host", "port", "ssl", "timeout"].includes(key);
}

function getConfigValue(config: Config, key: string): any {
  if (isValidConfigKey(key)) {
    return config[key]; // Type-safe access
  }
  throw new Error(`Invalid config key: ${key}`);
}

const config: Config = {
  host: "localhost",
  port: 3000,
  ssl: true,
  timeout: 5000
};

console.log(getConfigValue(config, "host"));    // "localhost"
console.log(getConfigValue(config, "port"));    // 3000
// console.log(getConfigValue(config, "invalid")); // Error thrown!
```

---

## সেরা অনুশীলন

### Interface এবং Type এর জন্য

#### ✅ করণীয়:

**১. সামঞ্জস্যপূর্ণ নামকরণ ব্যবহার করুন**

```typescript
// Good - PascalCase ব্যবহার করুন
interface UserProfile {
  name: string;
  email: string;
}

type ApiResponse = {
  status: number;
  data: any;
};

// Bad - inconsistent naming
interface user_profile {  // ✗ snake_case ব্যবহার করবেন না
  name: string;
}
```

**২. Public APIs এর জন্য Interface ব্যবহার করুন**

```typescript
// Library/Framework code
export interface PluginConfig {
  name: string;
  version: string;
  init(): void;
}

// Users extend করতে পারবে
export interface CustomPluginConfig extends PluginConfig {
  customOption: boolean;
}
```

**৩. Complex Types এর জন্য Type Alias ব্যবহার করুন**

```typescript
// Union types
type Status = "idle" | "loading" | "success" | "error";

// Intersection types
type Employee = Person & Contact & { employeeId: string };

// Utility types
type ReadonlyUser = Readonly<User>;
```

**৪. Documentation যোগ করুন**

```typescript
/**
 * ব্যবহারকারীর তথ্য সংরক্ষণের জন্য interface
 */
interface User {
  /** ব্যবহারকারীর unique ID */
  id: string;
  
  /** ব্যবহারকারীর পূর্ণ নাম */
  name: string;
  
  /** ব্যবহারকারীর ইমেইল ঠিকানা */
  email: string;
}
```

#### ❌ করণীয় নয়:

**১. অতিরিক্ত নেস্টিং এড়িয়ে চলুন**

```typescript
// Bad - অতিরিক্ত জটিল
type VeryComplex = (
  | ({ type: "a" } & { data: string })
  | ({ type: "b" } & { value: number })
) & { timestamp: Date };

// Good - সহজ এবং পরিষ্কার
type TypeA = { type: "a"; data: string; timestamp: Date };
type TypeB = { type: "b"; value: number; timestamp: Date };
type Simple = TypeA | TypeB;
```

**২. Any ব্যবহার এড়িয়ে চলুন**

```typescript
// Bad
interface BadUser {
  data: any;  // ✗ Type safety হারিয়ে যায়
}

// Good
interface GoodUser {
  data: {
    name: string;
    age: number;
  };
}
```

### keyof এর জন্য

#### ✅ করণীয়:

**১. Generic Constraints এর সাথে ব্যবহার করুন**

```typescript
// Good - Type-safe property access
function getValue<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

// Bad - কোন type safety নেই
function getBadValue(obj: any, key: string): any {
  return obj[key];
}
```

**২. Mapped Types তৈরি করুন**

```typescript
// Reusable utility type
type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

type Optional<T> = {
  [K in keyof T]?: T[K];
};
```

**৩. Type Guards এর সাথে combine করুন**

```typescript
function isValidKey<T extends object>(
  obj: T,
  key: string | number | symbol
): key is keyof T {
  return key in obj;
}

function safeGet<T extends object>(obj: T, key: string): any {
  if (isValidKey(obj, key)) {
    return obj[key]; // Type-safe
  }
  return undefined;
}
```

#### ❌ করণীয় নয়:

**১. String literals এর সাথে mix করবেন না**

```typescript
// Bad - Type safety নষ্ট হয়
function badUpdate<T>(obj: T, key: string, value: any): void {
  (obj as any)[key] = value;  // ✗ Unsafe
}

// Good - keyof ব্যবহার করুন
function goodUpdate<T, K extends keyof T>(
  obj: T,
  key: K,
  value: T[K]
): void {
  obj[key] = value;  // ✓ Type-safe
}
```

**২. অপ্রয়োজনীয় type assertions এড়িয়ে চলুন**

```typescript
// Bad
function bad<T>(obj: T, key: keyof T): any {
  return (obj as any)[key];  // ✗ Unnecessary assertion
}

// Good
function good<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];  // ✓ Type-safe without assertion
}
```

---

## সারসংক্ষেপ

### Interface vs Type

- **Interface**: Object-oriented programming, API design, extensibility এর জন্য
- **Type**: Union types, intersection types, utility types এর জন্য
- উভয়ই শক্তিশালী - সঠিক জায়গায় সঠিকটি ব্যবহার করুন

### keyof Keyword

- Object type থেকে keys extract করে
- Type-safe property access নিশ্চিত করে
- Generic functions এবং mapped types এর ভিত্তি
- Runtime errors প্রতিরোধ করে compile time এ

### মূল শিক্ষা

1. ✅ সর্বদা type safety বজায় রাখুন
2. ✅ উপযুক্ত টুল ব্যবহার করুন (Interface বা Type)
3. ✅ `keyof` দিয়ে property access নিরাপদ করুন
4. ✅ Documentation এবং comments যোগ করুন
5. ✅ Code পরিষ্কার এবং maintainable রাখুন

---

## অতিরিক্ত সম্পদ

- [TypeScript Official Documentation](https://www.typescriptlang.org/docs/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)

## অবদান

অবদান স্বাগত! Pull Request জমা দিতে পারেন।

## লাইসেন্স

MIT License

---

**তৈরি করেছেন:** TypeScript Community Bangladesh 🇧🇩

**সর্বশেষ আপডেট:** নভেম্বর ২০২৪