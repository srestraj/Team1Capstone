"use client";

import { useState } from "react";
import ImageInput from "./ImageInput";

const CLOUD_NAME: string | undefined = process.env.NEXT_PUBLIC_CLOUD_NAME;
const UPLOAD_PRESET: string | undefined = process.env.NEXT_PUBLIC_UPLOAD_PRESET;

const ImageUploader = ({ presetImage, onImageUpload }: { presetImage?: string; onImageUpload: (url: string) => void }) => {
  const [imageUrl, setImageUrl] = useState<"" | string>(presetImage ? presetImage : "");
  const [imageUrlInput, setImageUrlInput] = useState<boolean>(false);

  const uploadImage = async (image: File) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", UPLOAD_PRESET ? UPLOAD_PRESET : "");

    const result = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        return data.secure_url;
      })
      .catch((error) => {
        console.error("Error uploading the file:", error);
      });

    return result;
  };

  const triggerImageUpload = async (file: File, type: string) => {
    const result = await uploadImage(file);
    if (result) {
      setImageUrl(result);
      onImageUpload(result);
    } else {
      console.error("Failed to upload image");
    }
  }

  return <ImageInput
    classNames="py-20"
    handleUrlInput={(e: string) => setImageUrl(e)}
    imgUrl={imageUrl}
    inputId="logoImg"
    isInput={imageUrlInput}
    title="Product Thumbnail"
    toggleInput={(e: boolean) => setImageUrlInput(e)}
    triggerUpload={(file: File) => triggerImageUpload(file, "logo")}
  />
}

export default ImageUploader;