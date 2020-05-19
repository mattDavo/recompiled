export function formatDate(unixTimestamp: number): string {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const date = new Date(unixTimestamp * 1000);
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}
