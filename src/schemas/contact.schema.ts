import * as yup from "yup";

const contactSchema = yup.object().shape({
  name: yup
    .string()
    .required("Mandatory first and last name")
    .matches(
      /^[A-ZÀ-Ÿ][A-zÀ-ÿ']+\s([A-zÀ-ÿ']\s?)*[A-ZÀ-Ÿ][A-zÀ-ÿ']+$/,
      "First letter of each name capitalized, " +
        "no double spaces, " +
        "and without numbers."
    ),
  email: yup.string().required().email(),
  phone: yup
    .string()
    .min(10, "Minimum 10 characters")
    .required("Required field!"),
});

export default contactSchema;
