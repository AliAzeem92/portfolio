"use client";

import { useRef } from "react";

interface ImageUploadBoxProps {
  value: string;           // current image URL (preview)
  onChange: (file: File) => void;
  uploading?: boolean;
  aspectRatio?: "square" | "wide";  // square = 1:1, wide = 16:9
}

export default function ImageUploadBox({
  value,
  onChange,
  uploading = false,
  aspectRatio = "square",
}: ImageUploadBoxProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      onClick={() => inputRef.current?.click()}
      className={`relative w-full cursor-pointer rounded-xl border-2 border-dashed border-white/20 bg-slate-700 hover:border-purple-500 hover:bg-slate-600 transition-all duration-200 flex items-center justify-center overflow-hidden ${
        aspectRatio === "wide" ? "h-36" : "h-40"
      }`}
    >
      {/* Hidden real input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => e.target.files?.[0] && onChange(e.target.files[0])}
      />

      {value ? (
        /* Preview */
        <>
          <img
            src={value}
            alt="preview"
            className="w-full h-full object-contain p-2"
          />
          {/* Hover re-upload overlay */}
          <div className="absolute inset-0 bg-slate-900/70 flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            <CameraIcon />
            <span className="text-white text-xs mt-2">Click to change</span>
          </div>
        </>
      ) : (
        /* Empty state */
        <div className="flex flex-col items-center gap-2 text-gray-400 select-none">
          {uploading ? (
            <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
          ) : (
            <CameraIcon />
          )}
          <span className="text-sm">{uploading ? "Uploading..." : "Click to upload image"}</span>
        </div>
      )}

      {/* Uploading spinner overlay when image already set */}
      {uploading && value && (
        <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}

function CameraIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-10 h-10 text-gray-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
      />
    </svg>
  );
}
