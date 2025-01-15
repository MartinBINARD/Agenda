export const getFormattedDate = (arg) => {
    const date = new Date(arg);
    return `${format(date.getDate(date))} / ${format(date.getMonth(date) + 1)}`;
};

export const getFormattedFullDate = (arg) => {
    const date = new Date(arg);
    return `${format(date.getDate(date))} / ${format(date.getMonth(date) + 1)}  / ${format(date.getFullYear(date))}`;
};

export const getFormattedTime = (arg) => {
    const date = new Date(arg);
    return `${format(date.getHours(date))} : ${format(date.getMinutes(date))}`;
};

const format = (num) => (num < 10 ? '0' + num : num);
