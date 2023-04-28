import * as Yup from "yup";

const addNewPostFormSchema = Yup.object().shape({
    newPostText: Yup.string()
        .max(10, "Nice try, nobody has a first name that long")
        .required("Required")
});
export default addNewPostFormSchema;
