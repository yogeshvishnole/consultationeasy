import { base64Type, UserType } from "../types";
import Resizer from "react-image-file-resizer";

export const isAdmin = (role: string) => role === "admin";

export const rolePath = (user: UserType) => {
  switch (user.role) {
    case "admin":
      return "/admin";
    case "subscriber":
      return "/user";
    default:
      return "/";
  }
};

export const imageToBase64 = async (
  image: base64Type,
  cb: (uri: base64Type) => void
) => {
  try {
    await Resizer.imageFileResizer(
      image as Blob,
      300,
      300,
      "JPEG",
      100,
      0,
      (uri) => {
        cb(uri);
      },
      "base64",
      250,
      300
    );
  } catch (err) {
    console.log(err);
    return null;
  }
  return null;
};
