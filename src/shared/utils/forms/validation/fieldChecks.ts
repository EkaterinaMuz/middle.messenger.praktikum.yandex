import type { FieldChecks } from "./types";

const firstUpperCaseLetterRule =  {
    test: (v: string)=> /^[A-ZА-ЯЁ]/.test(v),
    message: "First letter must be uppercase."
};

const lettersOnlyRule =  {
    test: (v: string)=> /^[A-ZА-ЯЁ]/.test(v),
    message: "First letter must be uppercase."
};

const loginRules = {
    length: {
        test: (v: string)=> v.length >= 3 && v.length <= 20,
        message: "Login must be between 3 and 20 characters."
    },
    letters: {
        test: (v: string)=> /^[a-zA-Z0-9_-]+$/.test(v),
        message: "Login can contain only Latin letters, numbers, hyphens and underscores."
    },
    noDigitsOnly: {
        test: (v: string)=> !/^\d+$/.test(v),
        message: "Login cannot consist only of digits."
    }
};

const emailRules = {
    test: (v: string)=> /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v),
    message: "Invalid email address."
};

const passwordRules = {
    length: {
        test: (v: string)=> v.length >= 8 && v.length <= 40,
        message: "Password must be between 8 and 40 characters."
    },
    firstUpperCaseLetterRule: {
        test: (v: string)=> /[A-Z]/.test(v),
        message: "Password must contain at least one uppercase letter."
    },
    hasDigit: {
        test: (v: string)=> /\d/.test(v),
        message: "Password must contain at least one digit."
    }
};

const phoneNumberRule = {
    test: (v: string)=> /^\+?\d{10,15}$/.test(v),
        message: "Phone number must contain 10 to 15 digits and may start with '+'."
};

export const fieldChecks: FieldChecks= {
    first_name: [firstUpperCaseLetterRule, lettersOnlyRule],
    second_name: [firstUpperCaseLetterRule, lettersOnlyRule],
    display_name: [lettersOnlyRule],
    login: [loginRules.length, loginRules.letters, loginRules.noDigitsOnly],
    email: [emailRules],
    password: [passwordRules.length, passwordRules.firstUpperCaseLetterRule, passwordRules.hasDigit],
    oldPassword: [passwordRules.length, passwordRules.firstUpperCaseLetterRule, passwordRules.hasDigit],
    newPassword: [passwordRules.length, passwordRules.firstUpperCaseLetterRule, passwordRules.hasDigit],
    phone: [phoneNumberRule]
};
