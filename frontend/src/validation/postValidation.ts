import * as yup from "yup";

export interface PostAttributes {
  content: string;
}

export const validationSchema = yup.object().shape({
  content: yup
    .string()
    .min(1, "É necessário pelo menos um caracter para criar o post")
    .max(800, "Não é permitido posts com mais de 800 caracteres")
    .required("Digite o conteúdo do post"),
});

export const formScheme: PostAttributes = { content: "" };
