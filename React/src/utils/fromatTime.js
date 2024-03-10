export function getHourAndSecond(dateString) {
    const dt = new Date(dateString);
    const hour = dt.getUTCHours();
    const second = dt.getUTCSeconds();

    return { hour, second };
}