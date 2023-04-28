import * as Yup from "yup";

const addNewMessageFormSchema = Yup.object().shape({
    newMessageBody: Yup.string()
        .max(10, "Nice try, nobody has a first name that long")
        .required("Required")
});
export default addNewMessageFormSchema;
