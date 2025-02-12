import * as yup from "yup";

export interface LoginAttributes {
  email: string;
  password: string;
}

export const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email inválido!")
    .trim()
    .required("Informe seu email para continuar"),
  password: yup.string().required("Informe sua senha para continuar"),
});

export const formScheme: LoginAttributes = { email: "", password: "" };
