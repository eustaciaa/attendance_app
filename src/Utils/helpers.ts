export function getDaysInFebruary(year: number) {
    // Check if it's a leap year
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        return 29; // Leap year
    } else {
        return 28; // Common year
    }
}