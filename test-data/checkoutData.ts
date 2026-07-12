import { DataGenerator } from "../utils/DataGenerator";

export const checkoutData = [
    {
        fname: DataGenerator.getRandomFirstName(),
        lname: DataGenerator.getRandomLastName(),
        zip: DataGenerator.getRandomNumberInRange(100000,200000),
    }
]