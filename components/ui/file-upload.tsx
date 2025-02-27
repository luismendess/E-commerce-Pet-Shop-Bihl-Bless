"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud } from "lucide-react";

interface FileUploadProps {
    onFileAccepted: (file: File) => void;
}

export function FileUpload({ onFileAccepted }: FileUploadProps) {
    const [preview, setPreview] = useState<string | null>(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => setPreview(reader.result as string);
        reader.readAsDataURL(file);
        onFileAccepted(file);
    }
    }, [onFileAccepted]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
        'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    multiple: false
    });

    return (
    <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
        ${isDragActive ? 'border-primary bg-primary/10' : 'border-muted-foreground/50'}`}
    >
        <input {...getInputProps()} />
        
        {preview ? (
        <img
            src={preview}
            alt="Preview"
            className="max-h-48 mx-auto mb-4 rounded-lg"
        />
        ) : (
        <div className="flex flex-col items-center gap-4">
            <UploadCloud className="h-12 w-12 text-muted-foreground" />
            <p className="text-muted-foreground">
            Arraste a imagem aqui ou clique para selecionar
            </p>
            <p className="text-sm text-muted-foreground/60">
            Formatos suportados: JPEG, PNG, GIF
            </p>
        </div>
        )}
    </div>
    );
}