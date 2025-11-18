# Blog 1: TypeScript-এ keyof কীওয়ার্ডের ব্যবহার

## মূল ধারণা

TypeScript-এ `keyof` কীওয়ার্ড হলো একটি **টাইপ অপারেটর** যা কোনো নির্দিষ্ট টাইপের সকল প্রপার্টি কী (নাম) এর একটি ইউনিয়ন টাইপ তৈরি করে। অবজেক্ট প্রপার্টির সাথে কাজ করার সময় টাইপ-সেফ কোড লেখার জন্য এটি অত্যন্ত কার্যকর।

যখন আপনি কোনো টাইপের উপর `keyof` ব্যবহার করেন, তখন এটি সেই টাইপের সকল কী এর স্ট্রিং লিটারেল টাইপের একটি ইউনিয়ন তৈরি করে।

## উদাহরণ

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

// keyof User creates: "id" | "name" | "email" | "age"
type UserKeys = keyof User;

// This function can only accept valid property name
function getProperty(user: User, key: keyof User) {
  return user[key];
}

const user: User = {
  id: 1,
  name: "aliya",
  email: "aliya@gmail.com",
  age: 30
};

// ✅ correct - "name" is a key of User
const userName = getProperty(user, "name");

// ❌ Wrong - "salary" is not a key of User
// const salary = getProperty(user, "salary");
```

## ব্যাখ্যা

উপরের উদাহরণে:

- `keyof User` টাইপটি `"id" | "name" | "email" | "age"` return করে 
- `getProperty` ফাংশন নিশ্চিত করে যে শুধুমাত্র Valid প্রপার্টি নাম পাস করা হয়েছে
- যদি আপনি এমন কোনো কী পাস করার চেষ্টা করেন যা User ইন্টারফেসে নেই, TypeScript কম্পাইল-টাইমে error দিবে 

## জেনেরিক্স সহ ব্যবহারিক প্রয়োগ


```typescript
function updateProperty<T, K extends keyof T>(
  obj: T,
  key: K,
  value: T[K]
): void {
  obj[key] = value;
}

const product = {
  name: "Laptop",
  price: 999,
  inStock: true
};

// ✅ Works - correct type
updateProperty(product, "price", 1299);
updateProperty(product, "inStock", false);

// ❌ Wrong - wrong type
// updateProperty(product, "price", "1220");

// ❌ ত্রুটি - wrong key
// updateProperty(product, "color", "silver");
```

## মূল সুবিধা

১. **টাইপ নিরাপত্তা**: `keyof` ব্যবহার করে আপনি নিশ্চিত করতে পারেন যে শুধুমাত্র বৈধ প্রপার্টি নাম ব্যবহার করা হচ্ছে

২. **অটোকমপ্লিশন**: IDE এবং এডিটর সঠিক প্রপার্টি নামের জন্য suggestion দিবে 

৩. **রিফ্যাক্টরিং সহায়তা**: যদি আপনি কোনো প্রপার্টির নাম পরিবর্তন করেন, TypeScript সাথেসাথে সকল ব্যবহৃত স্থানে Error দেখাবে

## সারাংশ

`keyof` অপারেটর অবজেক্ট প্রপার্টির সাথে গতিশীলভাবে কাজ করার সময় টাইপ নিরাপত্তা বজায় রাখার জন্য অপরিহার্য, বিশেষত ইউটিলিটি ফাংশন এবং জেনেরিক কোডে।



# Blog 2: TypeScript-এ any, unknown এবং never টাইপের পার্থক্য

TypeScript-এ তিনটি বিশেষ টাইপ রয়েছে যা প্রায়ই বিভ্রান্তি সৃষ্টি করে: `any`, `unknown`, এবং `never`। এই আর্টিকেলে আমরা এদের মধ্যে পার্থক্য এবং সঠিক ব্যবহার সম্পর্কে জানবো।

## any টাইপ

`any` টাইপ হলো TypeScript-এর সবচেয়ে নমনীয় টাইপ। এটি মূলত TypeScript-এর টাইপ চেকিং সম্পূর্ণভাবে বন্ধ করে দেয়। যেকোনো ধরনের মান গ্রহণ করতে পারে এবং যেকোনো অপারেশন করা যায় টাইপ চেক ছাড়াই, তবে এতে টাইপ সেফটি হারিয়ে যায়।

```typescript
let value: any;

value = 42;
value = "hello";

// No type checking - dangerous!
value.foo.bar.baz;    // No error, but might crash at runtime
```

**কখন ব্যবহার করবেন:** `any` টাইপ যতটা সম্ভব এড়িয়ে চলা উচিত। শুধুমাত্র পুরাতন JavaScript কোড মাইগ্রেট করার সময় বা থার্ড-পার্টি লাইব্রেরি যার টাইপ ডেফিনেশন নেই সেক্ষেত্রে ব্যবহার করা যেতে পারে।

## unknown টাইপ

`unknown` হলো `any` এর নিরাপদ বিকল্প। এটি যেকোনো ধরনের মান গ্রহণ করতে পারে, তবে ব্যবহারের আগে টাইপ চেক বা টাইপ গার্ড প্রয়োজন।

```typescript
let value: unknown;

value = "hello";

// Must check type first
if (typeof value === "string") {
  console.log(value.toUpperCase());  // OK now
}
```

```typescript
function processValue(value: unknown) {
  if (typeof value === "string") {
    return value.toUpperCase();
  }
  return "Unknown type";
}
```

**কখন ব্যবহার করবেন:** API থেকে ডেটা রিসিভ করার সময়, JSON.parse() এর রিটার্ন ভ্যালু হ্যান্ডেল করার সময়, বা ইউজার ইনপুট প্রসেস করার সময়।

## never টাইপ

`never` টাইপ এমন কিছু প্রকাশ করে যা কখনো ঘটবে না বা কখনো কোনো মান রিটার্ন করবে না।

```typescript
// Function that never returns
function throwError(message: string): never {
  throw new Error(message);
}
```

```typescript
// Exhaustive type checking
type Status = "success" | "error";

function handleStatus(status: Status) {
  switch (status) {
    case "success":
      return "OK";
    case "error":
      return "Failed";
    default:
      const _exhaustive: never = status;
      return _exhaustive;
  }
}
```

**কখন ব্যবহার করবেন:** ফাংশন যা সবসময় এরর থ্রো করে বা এক্সহস্টিভ চেকিং-এ সব কেস কভার করেছেন কিনা নিশ্চিত করতে।

## তুলনামূলক বিশ্লেষণ 

| টাইপ | যেকোনো মান গ্রহণ | টাইপ চেক প্রয়োজন | ব্যবহার |
|------|-------------------|-------------------|---------|
| **any** | হ্যাঁ | না | এড়িয়ে চলুন |
| **unknown** | হ্যাঁ | হ্যাঁ | অজানা ডেটা হ্যান্ডেল করতে |
| **never** | না | প্রযোজ্য নয় | যা কখনো ঘটে না |

## উপসংহার

সঠিক টাইপ নির্বাচন আপনার কোডকে আরো নিরাপদ এবং রক্ষণাবেক্ষণযোগ্য করে তোলে। `any` এর পরিবর্তে `unknown` ব্যবহার করুন এবং `never` দিয়ে অসম্ভব অবস্থা চিহ্নিত করুন।