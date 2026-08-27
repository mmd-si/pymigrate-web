export const dateShort = new Intl.DateTimeFormat("es-419", {
    year: "numeric",
    month: "short",
    day: "numeric" ,
    timeZone: "America/Panama",
});

export const dateTimeLong = new Intl.DateTimeFormat("es-419", {
    dateStyle: "long",
    timeStyle: "medium",
    timeZone: "America/Panama"
});

/**
 * Functional implementation of custom short date
 * formatting for use in Angular templates
 * @param date The date object to format into a string
 * @returns a short string representation of the provided date.
 * @example console.log(formatDateShort(new Date())); // 24 ago 2026
 */
export function formatDateShort(date: Date): string {
    return dateShort.format(date);
}

/**
 * Functional implementation of custom long date and time
 * formatting for use in Angular templates
 * @param date The date object to format into a string
 * @returns a long string representation of the provided date's date and time.
 * @example console.log(formatDateTimeLong(new Date())); // 24 de agosto de 2026 a las 3:30:19 p.m.
 */
export function formatDateTimeLong(date: Date): string {
    return dateTimeLong.format(date);
}

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
 * Functional implementation of custom
 * thousands-separator formatting for use in Angular templates
 * @param num The number to format with comma-separated thousands
 * @param scale The number of decimal places to include
 * @returns a string representation of the formatted number.
 */
export function commaSeparated(num: number, scale: number = 2): string {
    const fixed = num.toFixed(scale);
    const [integer, decimal] = fixed.split(".");
    const fragments = [];

    for (let i = integer.length; i > 0; i -= 3) {
        fragments.unshift(integer.slice(Math.max(0, i - 3), i));
    }

    return `${fragments.join(",")}.${decimal}`;
}

/**
 * Functional implementation of a custom
 * keyword formatting and normalization
 * algorithm for business branch titles.
 * @param text The text from which to style the keywords and format the title
 * @returns a string representation of the branch title.
 */
export function toMMDTitle(text: string): string {
    const words = text.split(" ").filter(Boolean).map(w => w.trim().toLowerCase());
    const result = [];

    for (let word of words) {
        if (word === "masmedan") {
            result.push("Más Me Dan");
        } else if (["cc", "mmd", "si", "mmdsi", "cf"].includes(word)) {
            result.push(word.toUpperCase());
        } else {
            result.push(word.at(0)?.toUpperCase() + word.slice(1).toLowerCase());
        }
    }

    return result.join(" ");
};

export function toTitle(text: string): string {
    return text
        .split(" ")
        .filter(Boolean)
        .map(w => w.trim())
        .map(w => (w.at(0) ?? "").toUpperCase() + w.slice(1).toLowerCase())
        .join(" ");
}