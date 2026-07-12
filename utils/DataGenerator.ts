export class DataGenerator {
    static getRandomFirstName(): string {
        const nameArray = ['Kane', 'Tom', 'Brandon', 'Shane', 'Stephen', 'Nathan'];
        const randomIndex = Math.floor(Math.random() * (nameArray.length));
        return nameArray[randomIndex];
    }

    static getRandomLastName(): string {
        const nameArray = ['Williamson', 'Latham', 'Mccullum', 'Bond', 'Fleming', 'Astle'];
        const randomIndex = Math.floor(Math.random() * (nameArray.length));
        return nameArray[randomIndex];
    }

    static getRandomZip(): string {
        const zipCodesArray = ['11001', '22001', '33001', '44001', '66001'];
        const randomIndex = Math.floor(Math.random() * (zipCodesArray.length));
        return zipCodesArray[randomIndex];
    }

    static getRandomNumberInRange(min: number, max: number): string{
        const randomNumber = Math.floor(Math.random()*(max-min+1))+min;
        return randomNumber.toString();
    }
}