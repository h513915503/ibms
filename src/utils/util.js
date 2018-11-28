
const dateFormat = (val) => {
    const date = new Date(val);
    const YY = date.getFullYear() + '/';
    const MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth()+1) : date.getMonth()+1 ) + '/';
    const dd = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
    const hh = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()) + ':';
    const mm = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes());
    // const ss = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds())
    return YY + MM + dd + hh + mm;
}

const timeFormat = (val) => {
    const date = new Date(val);
    const hh = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()) + ':';
    const mm = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes());
    // const ss = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds())
    return hh + mm;
}

const dateFormatString = (date) => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`.replace(/\b(\w)\b/g, '0$1')

export { dateFormat, timeFormat, dateFormatString }