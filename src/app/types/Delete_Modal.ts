import { CategoryRequest } from "./Category";
import { RegisterRequest } from "./Register";

export type Delete_Modal_Type = {
  title?: string;
  content?: string;
  valueBtnAccepted?: string;
  valueBtnCancelled?: string;
  entityToDelete: CategoryRequest | RegisterRequest | null;
};
