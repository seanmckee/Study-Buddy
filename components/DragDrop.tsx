"use client";
import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["PDF", "TXT"];

interface DragDropProps {
  onFileSelect: (file: File) => void;
}

const DragDrop: React.FC<DragDropProps> = ({ onFileSelect }) => {
  const [file, setFile] = useState<File | null>(null);
  const handleChange = (file: File) => {
    setFile(file);
  };

  const getFile = () => {
    return file;
  };
  return (
    <FileUploader
      handleChange={handleChange}
      name="file"
      types={fileTypes}
      multiple="false"
    />
  );
};

export default DragDrop;
