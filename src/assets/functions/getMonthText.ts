export function getMonthText(num: number) {
    let result;
    switch (num) {
        case 0:
            result = "январь"
            break;
        case 1:
            result = 'февраль'
            break;
        case 2:
            result = 'март'
            break;
        case 3:
            result = "апрель"
            break;
        case 4:
            result = 'май'
            break;
        case 5:
            result = 'июнь'
            break;
        case 6:
            result = "июль"
            break;
        case 7:
            result = 'август'
            break;
        case 8:
            result = 'сентябрь'
            break;
        case 9:
            result = "октябрь"
            break;
        case 10:
            result = 'ноябрь'
            break;
        case 11:
            result = 'декабрь'
            break;

    }
    return result
}