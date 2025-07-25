 interface FormData {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  password: string;
  oldPassword: string;
  newPassword: string;
  phone: string;
}

interface ValidationRule {
  test: (value: string) => boolean;
  message: string;
}

 export type FieldNames = keyof FormData
 export type FieldChecks = Record<FieldNames, ValidationRule[]>;
