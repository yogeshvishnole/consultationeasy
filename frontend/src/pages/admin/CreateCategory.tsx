import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Resizer from "react-image-file-resizer";
import { useToasts } from "react-toast-notifications";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import { RootState } from "../../app";

interface Props {}

interface FormValueTypes {
  name: string;
  content: string;
  image: any;
}

const schema = yup.object().shape({
  name: yup.string().required("Required"),
  content: yup
    .string()
    .min(20, "Must be at least 20 characters long")
    .required("Required"),
  image: yup.string().required("Reqiuired"),
});

const CreateCategory: React.FC<Props> = () => {
  const { addToast } = useToasts();
  const { token } = useSelector((state: RootState) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormValueTypes>({ resolver: yupResolver(schema) });
  const image = watch("image");

  const [base64Image, setBase64Image] = useState<
    string | File | Blob | ProgressEvent<FileReader>
  >("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [btnText, setBtnText] = useState("Create");
  const [imageUploadText, setImageUploadText] = useState("Upload Image");

  const handleCreateCategory = handleSubmit(async (values) => {
    setBtnText("Creating...");
    try {
      const response = await axios.post(
        "/api/v1/categories",
        { ...values, image: base64Image },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      reset();
      setSuccess(
        `Category ${response.data.data.category.name} is created successfully`
      );
      setBtnText("Create");
      setImageUploadText("Upload Image");
    } catch (err) {
      setError(err.response.data.message);
      setBtnText("Create");
      setImageUploadText("Upload Image");
    }
  });

  useEffect(() => {
    if (success) {
      addToast(success, {
        appearance: "success",
        autoDismiss: true,
      });
    }
    if (error) {
      addToast(error, {
        appearance: "error",
        autoDismiss: true,
      });
    }
  }, [error, success]);

  useEffect(() => {
    if (image && image[0]?.name) {
      console.log(image[0]);
      setImageUploadText(image[0].name);
      try {
        Resizer.imageFileResizer(
          image[0],
          300,
          300,
          "JPEG",
          100,
          0,
          (uri) => {
            setBase64Image(uri);
          },
          "base64",
          250,
          300
        );
      } catch (err) {
        console.log(err);
      }
    }
  }, [image]);

  return (
    <Layout>
      <div className="container">
        <div className="create-category">
          <h1>Create Category</h1>
          <div className="create-category__form-container">
            <form className="create-category__form">
              <input
                type="text"
                className="input create-category__input"
                placeholder="name"
                {...register("name")}
              />
              {errors.name?.message && (
                <p className="field--error">{errors.name.message}</p>
              )}
              <input
                type="text"
                className="input create-category__input"
                placeholder="content"
                {...register("content")}
              />
              {errors.content?.message && (
                <p className="field--error">{errors.content.message}</p>
              )}

              <input
                type="file"
                accept="image/*"
                id="file"
                {...register("image")}
              />
              <label htmlFor="file" className="custom-file-input">
                <span>{imageUploadText}</span>
              </label>
              {errors.image?.message && (
                <p className="field--error">{errors.image.message}</p>
              )}
              <div className="btn" onClick={handleCreateCategory}>
                {btnText}
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
