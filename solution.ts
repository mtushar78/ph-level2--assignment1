type formatValueType = string | number | boolean;

const formatValue = (input: formatValueType): formatValueType => {

    if (typeof input == 'string') {
        return input.toLocaleUpperCase();
    } else if (typeof input == 'number') {
        return input * 10;
    } else {
        return !input
    }
}


const getLength = <T>(value: string | Array<T>): number => {

    if (Array.isArray(value))
        return value.length

    return value.length
}


class Person {
    name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    getDetails(): string {
        return `'Name: ${this.name}, Age: ${this.age}'`
    }
}


type bookType = {
    title: string,
    rating: number
}
const filterByRating = (items: Array<bookType>): Array<bookType> => {
    items.forEach(item => {
        if (item.rating < 0 || item.rating > 5) {
            throw new Error(
                `Invalid input ${JSON.stringify(item)}. Rating should be between 0 and 5.`
            );
        }
    });

    return items.filter(item => item.rating >= 4);
}



type userType = {
    id: number,
    name: string,
    email: string,
    isActive: boolean
}
const filterActiveUsers = (items: Array<userType>): Array<userType> => {
    return items.filter(item => item.isActive)
}

interface Book {
    title: string;
    author: string;
    publishedYear: number;
    isAvailable: boolean;
}

const printBookDetails = (book: Book): void => {
    console.log(`Title: ${book.title}, Author: ${book.author}, Published: ${book.publishedYear}, Available: ${book.isAvailable ? 'Yes' : 'No'}`)
}


const getUniqueValues = <T extends string | number>(array1: T[], array2: T[]): T[] => {
    const result: T[] = [];

    const contains = (arr: T[], value: T): boolean => {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === value) {
                return true;
            }
        }
        return false;
    };

    for (let i = 0; i < array1.length; i++) {
        if (!contains(result, array1[i])) {
            result[result.length] = array1[i];
        }
    }
    for (let i = 0; i < array2.length; i++) {
        if (!contains(result, array2[i])) {
            result[result.length] = array2[i];
        }
    }

    return result;

}


type ProductType = {
    name: string,
    price: number,
    quantity: number,
    discount?: number
}
const calculateTotalPrice = (products: ProductType[]): number => {
    if (products.length === 0) return 0;

    return products.reduce((total, product) => {
        const subtotal = product.price * product.quantity;
        const discountAmount = product.discount
            ? subtotal * (product.discount / 100)
            : 0;
        return total + (subtotal - discountAmount);
    }, 0);
}


