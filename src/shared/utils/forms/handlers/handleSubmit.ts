import { isFieldName, validateFormField } from "../validation";

export function handleSubmit(event: Event) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const formResult: Record<string, FormDataEntryValue> = {};

    for (const [key, value] of formData.entries()) {

        if(!isFieldName(key)) {
            return;
        }

        const error = validateFormField(key, value.toString());

        if (error) {
            console.error(`Validation failed for ${key}: ${error}`);
            return;
        }
        formResult[key] = value;
    }

    console.log('FormData:', formResult);

    return formResult;
}
