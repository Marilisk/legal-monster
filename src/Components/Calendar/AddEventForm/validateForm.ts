

export function validateEmail(value:string) {
    let error;
    if (!value) {
        error = 'введите email';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        error = 'некорректный email';
    }
    return error;
};

export function validatePassword(value:string) {
    let error;
    if (value.length < 6) {
        error = 'пароль не может быть короче 5 символов';
    } 
    return error;
}

export function basicLengthValidate(value:string, minLength: number) {
    let error;
    if (value.length < minLength) {
        error = `введите значение длиннее ${minLength} символов`;
    } 
    return error;
}

export function flInnValidate(value:string) {
    let error;
    if (/^\d{12}$/.test(value)) {
        error = 'некорректный ИНН';
    } 
    return error;
}

export function ulInnValidate(value:string) {
    let error;
    if (!/^\d{10}$/.test(value)) {
        const hint = value.length < 10 ? `не хватает ${10 - value.length}` : `${value.length - 10} лишних`
        error = `некорректное количество символов, ${hint}`
    } 
    return error;
}


export function isNumberValidate(value:string, existingNums: number[]) {
    let error;
    let num = Number(value)
    if (!value.length) error = 'введите значение'
    if (value.toLowerCase() !== value.toUpperCase()) {
        error = 'здесь должно быть число';
    } 
    if (existingNums.includes(num)) {
        error = 'элемент с таким номером уже существует';
    }
    return error;
}

