
export function isValidString(
    value: string | undefined | null,
    minLength: number,
    maxLength: number
): boolean {

    if (value == undefined || value == "" || value == null) {
        return false;
    }

    if (value.length < minLength || value.length > maxLength) {
        return false;
    }

    return true;
}

export function isValidEmail(
    email: string | undefined | null,
    minLength: number,
    maxLength: number
): boolean {

    if (email == undefined) {
        return false;
    }

    const aderssCheck = email.includes("@");
    const dotCheck = email.includes(".");

    if (aderssCheck == false || dotCheck == false) {
        return false;
    }

    let adressIndex = 0;
    let dotIndex = 0;

    for (let i = 0; i < email?.length; i++) {
        if (email[i].includes("@")) {
            adressIndex = i;
        }
        if (email[i].includes(".")) {
            dotIndex = i;
        }
    }

    if (adressIndex > dotIndex) {
        return false;
    }

    return isValidString(email, minLength, maxLength);
}