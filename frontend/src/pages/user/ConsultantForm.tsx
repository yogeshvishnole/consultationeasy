import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useToasts } from "react-toast-notifications";
import { useHistory } from "react-router-dom";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { imageToBase64 } from "../../helpers";
import { base64Type } from "../../types";
import Editor from "../../components/ui/Editor";
import { getCategories } from "../../app/categorySlice";
import { RootState } from "../../app";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { updateUser } from "../../app/userSlice";

interface Props {}

interface FormValueType {
  consultantImage: any;
  promoImage: any;
  description: string;
  promoDescription: string;
  mainMarketingHead: string;
  elaboration: string;
  phone: string;
  website: string;
  facebook: string;
  linkedin: string;
  nicheArea: string;
  categories: string[];
  experience: Number;
  price: Number;
}

const schema = yup.object().shape({
  price: yup.number(),
  experience: yup
    .number()
    .max(70, "Experience should not be greater than 70 ")
    .min(3, "Experience must be greater than 3 years")
    .required("Required"),
  consultantImage: yup.string().required("Required"),
  promoImage: yup.string().required("Required"),
  promoDescription: yup
    .string()
    .min(15, "Promo desc must be atleast 15 char long.")
    .max(50, "Promo desc must not be greater than 50 char long")
    .required("Required"),
  mainMarketingHead: yup
    .string()
    .min(15, "Main market head must be atleast 15 char long.")
    .max(50, "Main market head must not be greater than 50 char long")
    .required("Required"),
  elaboration: yup
    .string()
    .min(20, "Elaboration must be atleast 20 char long.")
    .max(200, "Elaboration must not be greater than 200 char long")
    .required("Required"),
  nicheArea: yup
    .string()
    .max(40, "Niche area must not be greater than 40 char long")
    .required("Required"),

  phone: yup.string().length(13),
  websiteLink: yup.string(),
  facebookLink: yup.string(),
  linkedinLink: yup.string(),
});

const ConsultantForm: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const history = useHistory();
  const token = useSelector((state: RootState) => state.user.token);
  const categories = useSelector((state: RootState) => state.category.data);

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm<FormValueType>({
    resolver: yupResolver(schema),
  });

  const promoImage = watch("promoImage");
  const consultantImage = watch("consultantImage");

  const [base64PromoImage, setBase64PromoImage] = useState<
    string | File | Blob | ProgressEvent<FileReader>
  >("");
  const [base64ConsultantImage, setBase64ConsultantImage] = useState<
    string | File | Blob | ProgressEvent<FileReader>
  >("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [btnText, setBtnText] = useState("Submit");
  const [promoImageUploadText, setPromoImageUploadText] = useState(
    "Upload Promo Image"
  );
  const [consultantImageUploadText, setConsultantImageUploadText] = useState(
    "Upload Consultant Image"
  );

  const handleBecomeConsultant = handleSubmit(async (formData) => {
    setBtnText("Loading...");
    formData = {
      ...formData,
      promoImage: base64PromoImage,
      consultantImage: base64ConsultantImage,
      description,
    };
    try {
      const response = await axios.post("/api/v1/consultants", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBtnText("Submit");
      dispatch(updateUser({ token }));
      history.push(`/user/consultant`);
    } catch (err) {
      setBtnText("Submit");
      console.log(err);
      addToast(err.response.data.message, {
        appearance: "error",
        autoDismiss: true,
      });
    }
  });

  const handleEditorChange = (e: any) => {
    setDescription(e);
  };

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
    if (promoImage && promoImage[0]?.name) {
      setPromoImageUploadText(promoImage[0].name);
      imageToBase64(promoImage[0], (uri: base64Type) => {
        setBase64PromoImage(uri);
      });
    }
  }, [promoImage]);
  useEffect(() => {
    if (consultantImage && consultantImage[0]?.name) {
      setConsultantImageUploadText(consultantImage[0].name);
      imageToBase64(consultantImage[0], (uri: base64Type) => {
        setBase64ConsultantImage(uri);
      });
    }
  }, [consultantImage]);

  useEffect(() => {
    dispatch(getCategories());
  }, []);
  console.log("erros", errors);
  return (
    <div className="container">
      <div className="create-category">
        <h1>Become Consultant</h1>
        <div className="create-category__form-container">
          <form className="consultant-form__form">
            <input
              type="text"
              className="input create-category__input"
              placeholder="Niche Area"
              {...register("nicheArea")}
            />
            {errors.nicheArea?.message && (
              <p className="field--error">{errors.nicheArea.message}</p>
            )}
            <input
              type="text"
              className="input create-category__input"
              placeholder="Promo Description"
              {...register("promoDescription")}
            />
            {errors.promoDescription?.message && (
              <p className="field--error">{errors.promoDescription.message}</p>
            )}

            <textarea
              className="consultant-form__textarea"
              placeholder="Main Market Head"
              {...register("mainMarketingHead")}
            />
            {errors.mainMarketingHead?.message && (
              <p className="field--error">{errors.mainMarketingHead.message}</p>
            )}
            <textarea
              className="consultant-form__textarea"
              placeholder="Elaboration"
              {...register("elaboration")}
            />
            {errors.elaboration?.message && (
              <p className="field--error">{errors.elaboration.message}</p>
            )}
            <input
              type="text"
              className="input create-category__input"
              placeholder="Phone"
              {...register("phone")}
            />
            {errors.phone?.message && (
              <p className="field--error">{errors.phone.message}</p>
            )}
            <input
              type="number"
              className="input create-category__input"
              placeholder="Experience"
              {...register("experience")}
            />
            {errors.experience?.message && (
              <p className="field--error">{errors.experience?.message}</p>
            )}
            <input
              type="number"
              className="input create-category__input"
              placeholder="Price"
              {...register("price")}
            />
            {errors.price?.message && (
              <p className="field--error">{errors.price?.message}</p>
            )}
            <input
              type="text"
              className="input create-category__input"
              placeholder="Website Link"
              {...register("website")}
            />
            {errors.website?.message && (
              <p className="field--error">{errors.website.message}</p>
            )}
            <input
              type="text"
              className="input create-category__input"
              placeholder="Facebook Link"
              {...register("facebook")}
            />
            {errors.facebook?.message && (
              <p className="field--error">{errors.facebook.message}</p>
            )}
            <input
              type="text"
              className="input create-category__input"
              placeholder="LinkedIn Link"
              {...register("linkedin")}
            />
            {errors.linkedin?.message && (
              <p className="field--error">{errors.linkedin.message}</p>
            )}
            <div className="form-control" style={{ textAlign: "start" }}>
              <label>Select appropriate categories</label>
              <ul style={{ height: "10rem", overflowY: "scroll" }}>
                {categories &&
                  categories.map((c) => {
                    return (
                      <li>
                        <input
                          type="checkbox"
                          id={c.name}
                          style={{
                            width: "auto",
                            height: "auto",
                            marginRight: "1rem",
                          }}
                          value={c._id}
                          {...register("categories")}
                        />
                        <label htmlFor={c.name}>{c.name}</label>
                      </li>
                    );
                  })}
              </ul>
            </div>
            <Editor handleChange={handleEditorChange} content={description} />
            <input
              type="file"
              accept="image/*"
              id="file1"
              {...register("promoImage")}
            />
            <label htmlFor="file1" className="custom-file-input">
              <span>{promoImageUploadText}</span>
            </label>
            {errors.promoImage?.message && (
              <p className="field--error">{errors.promoImage.message}</p>
            )}
            <input
              type="file"
              accept="image/*"
              id="file2"
              {...register("consultantImage")}
            />
            <label htmlFor="file2" className="custom-file-input">
              <span>{consultantImageUploadText}</span>
            </label>
            {errors.consultantImage?.message && (
              <p className="field--error">{errors.consultantImage.message}</p>
            )}

            <div className="flex-center">
              <div className="btn" onClick={handleBecomeConsultant}>
                {btnText}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConsultantForm;
