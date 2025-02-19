import * as yup from "yup";

export interface CommentAttributes {
  content: string;
}

export const validationSchema = yup.object().shape({
  content: yup
    .string()
    .min(1, "É necessário pelo menos um caracter para comentar no post")
    .max(800, "Não é permitido comentar mais que 800 caracteres"),
});

export const formScheme: CommentAttributes = { content: "" };
