import * as yup from "yup";

const loginSchema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().min(8, "Minimum 8 characters").required(),
});

export default loginSchema;
