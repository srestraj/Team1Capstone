"use client";

import { useState } from "react";

export const useImageUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const uploadImages = async (files: File[]): Promise<string[]> => {
    setUploading(true);
    setProgress(0);

    const uploadedUrls: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      const body = new FormData();
      body.append("file", file);
      body.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_UPLOAD_PRESET || ""
      );

      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open(
          "POST",
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`
        );

        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percent =
              ((i + event.loaded / event.total) / files.length) * 100;
            setProgress(Math.round(percent));
          }
        };

        xhr.onload = () => {
          const res = JSON.parse(xhr.responseText);
          uploadedUrls.push(res.secure_url);
          resolve();
        };

        xhr.onerror = reject;
        xhr.send(body);
      });
    }

    setUploading(false);
    setProgress(100);

    return uploadedUrls;
  };

  return { uploadImages, uploading, progress };
};