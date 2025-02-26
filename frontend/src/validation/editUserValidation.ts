import * as yup from "yup";

export interface EditUserAttributes {
  name?: string;
  username?: string;
  profilePic?: File | null;
}

export const editUserSchema = yup.object().shape({
  name: yup.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  username: yup.string().min(3, "Usuário deve ter pelo menos 3 caracteres"),
  profilePic: yup.mixed().nullable(),
});

export const editUserInitialValues: EditUserAttributes = {
  name: "",
  profilePic: null,
  username: "",
};
