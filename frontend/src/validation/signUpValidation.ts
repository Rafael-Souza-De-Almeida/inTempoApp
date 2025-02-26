import * as yup from "yup";

export interface SignUpAttributes {
  email: string;
  password: string;
  passwordMatch: string;
  name: string;
  username: string;
}

export const SignUpValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email inválido!")
    .trim()
    .required("Informe seu email para continuar"),

  username: yup
    .string()
    .trim()
    .matches(/^\S+$/, "O username não pode conter espaços!")
    .max(50, "O nome de usuário não pode possuir mais que 50 caracteres!")
    .required("É necessário informar seu username"),

  name: yup
    .string()
    .trim()
    .max(50, "O nome não pode possuir mais que 50 caracteres!")
    .required("É necessário informar seu nome"),

  password: yup
    .string()
    .min(8, "A senha precisa ter no mínimo 8 caracteres")
    .required("Informe sua senha para continuar"),

  passwordMatch: yup
    .string()
    .oneOf([yup.ref("password")], "As senhas não coincidem!"),
});

export const signUpIntialValues: SignUpAttributes = {
  email: "",
  password: "",
  passwordMatch: "",
  name: "",
  username: "",
};
