import {fieldChecks} from "./fieldChecks";
import type { FieldNames } from './types';

export function isFieldName(key: string): key is FieldNames {
  return [
    "first_name",
    "avatar",
    "second_name",
    "display_name",
    "login",
    "email",
    "password",
    "oldPassword",
    "newPassword",
    "password",
    "phone",
    "chat",
      "add_user",
      "delete_user"
  ].includes(key);
}


 export function validateFormField(name: FieldNames, rawValue: string) {
   const value = rawValue.trim();
   const checks = fieldChecks[name];

   if (!checks) {
     return "";
   }

   for (const { test, message } of checks) {
     if (!test(value)) {
       return message;
     }
   }

   return "";
 }
