"use client";

import { useState } from "react";

interface DropZoneProps {
  images: string[];
  uploading?: boolean;
  progress: number;
  onFilesSelected: (files: File[]) => void;
  onDeleteImage: (index: number) => void;
}

const DropZone = ({
  images,
  uploading,
  progress,
  onFilesSelected,
  onDeleteImage,
}: DropZoneProps) => {
  const [active, setActive] = useState(false);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    onFilesSelected(Array.from(files));
  };

  return (
    <div
      onDragEnter={(e) => {
        e.preventDefault();
        setActive(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setActive(false);
      }}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        setActive(false);
        handleFiles(e.dataTransfer.files);
      }}
      className={`relative w-full h-96 border-2 border-dashed rounded-3xl ${active ? "bg-blue-200" : ""
        }`}
    >
      {/* Empty */}
      {images.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full">
          <span className="text-2xl font-bold">
            Drag & drop images
          </span>

          <label htmlFor="fileInput" className="underline cursor-pointer">
            browse
          </label>

          <input
            id="fileInput"
            type="file"
            multiple
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </div>
      )}

      {/* Preview */}
      {images.length > 0 && (
        <div className="flex flex-wrap gap-3 p-4 overflow-auto">
          {images.map((img, i) => (
            <div key={i} className="relative w-32 h-32 rounded-xl">
              <img
                src={img}
                className="w-full h-full object-cover rounded-xl"
              />

              {!uploading && (
                <button
                  onClick={() => onDeleteImage(i)}
                  className="absolute -top-2 -right-2 bg-black text-white rounded-full px-2 py-1.5 text-xs inline-flex items-center justify-center"
                >
                  ✕
                </button>
              )}

              {uploading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white rounded-xl">
                  {progress}%
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropZone;