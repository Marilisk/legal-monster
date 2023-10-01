

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

export function validateFullName(value:string) {
    let error;
    if (value.length < 3) {
        error = 'введите имя длиннее 3 символов';
    } 
    return error;
}