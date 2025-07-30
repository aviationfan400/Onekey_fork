export function getCurrentMonthYear(): string {
    const now = new Date();
    const month = now.toLocaleString('default', { month: 'long' });
    const year = now.getFullYear();
    const result = `${month} ${year}`;
    console.log('getCurrentMonthYear called, returning:', result);
    return result;
}

export {};
  