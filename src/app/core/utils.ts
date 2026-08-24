export const dtf = new Intl.DateTimeFormat("es", {
    year: "numeric",
    day: "numeric",
    month: "short"
});

/**
 * Functional implementation of `Date` object
 * construction for use in Angular templates
 * @param date The value to be transformed into a date object
 * @returns the date object that the provided value represents.
 */
export function toDateObject(date: string | number | Date): Date {
    return new Date(date);
}

/**
 * Functional implementation of custom date
 * formatting for use in Angular templates
 * @param date The date object to format into a string
 * @returns a string representation of the provided date.
 */
export function formatDate(date: Date): string {
    return dtf.format(date);
}


/**
 * Functional implementation of custom money
 * formatting for use in Angular templates
 * @param money The numeric value to format as money
 * @returns a string representation of the provided value with 2 decimal places.
 */
export function toMoney(money: number): string {
    return money.toFixed(2);
}