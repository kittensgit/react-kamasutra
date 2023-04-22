import * as Yup from "yup";

const loginFormSchema = Yup.object().shape({
    email: Yup.string()
        //минимальная длина - 2 символа
        .min(2, "Must be longer than 2 characters")
        //максимальная длина - 20 символов
        .max(20, "Nice try, nobody has a first name that long")
        .required("Required")
        .email('Invalid email address'),
    password: Yup.string()
        .required("Required")
        .min(8, "Must be longer than 8 characters")
});
export default loginFormSchema;
