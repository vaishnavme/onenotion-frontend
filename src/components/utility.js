const months = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December'
}
const days = [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat'
]
export const getTimeandData = () => {
    const date = new Date();
    const day = date.getDate()
    const dayName = days[date.getDay()];
    const monthName = months[date.getMonth()]
    const year = date.getFullYear();
    return `${dayName}, ${day} ${monthName} ${year}`
}