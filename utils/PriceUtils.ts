export class PriceUtils {

    static parsePrice(priceFullText: string | null | undefined): number {
        if (!priceFullText) {
            return 0;
        }

        const priceText = priceFullText.replace(/[^0-9.]/g, '');
        const priceValue = parseInt(priceText);

        return priceValue;
    }

    static sumPrices (priceString: string[]): number{
        return priceString.reduce((total, currentText) => {
            return total+this.parsePrice(currentText);
        }, 0);
    }

    static formatToCurreny(amount: number): number{
        return parseFloat(amount.toFixed(2));
    }
}