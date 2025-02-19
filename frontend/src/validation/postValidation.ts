import * as yup from "yup";

export interface PostAttributes {
  content: string;
}

export const validationSchema = yup.object().shape({
  content: yup
    .string()
    .min(1, "É necessário pelo menos um caracter para criar o post")
    .required("Digite o conteúdo do post"),
});

export const formScheme: PostAttributes = { content: "" };
