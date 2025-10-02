import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUploadCloud } from 'react-icons/fi';
import { FaRegTrashAlt, FaRegEye, FaFilePdf, FaCheckCircle } from 'react-icons/fa';
import { twMerge } from 'tailwind-merge';

interface FileUploadProps {
    name: string;
    label: string;
    description?: string;
    formik: any;
    mandatory?: boolean;
    headings?: { title: string; subtitle: string };
}

const FileUpload: React.FC<FileUploadProps> = ({
    name,
    label,
    description = "Drag & drop your image here",
    formik,
    mandatory = false,
    headings = { title: "Drag & drop your image here", subtitle: "or click to browse files" },
}) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        formik.setFieldValue(name, acceptedFiles[0]);
    }, [formik, name]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: false,
    });

    const file = formik.values[name];
    const isError = formik.errors[name] && formik.touched[name];
    const errorMessage = isError ? formik.errors[name] : undefined;

    return (
        <div className="w-full space-y-2">
            <div className="flex items-center justify-between">
                <label className="text-sm text-greyPrimary font-medium block">
                    {label} {mandatory && <span className="text-red-500">*</span>}
                </label>
            </div>

            {file ? (
                <div className="flex items-center justify-between p-4 border border-gray-300 rounded-md bg-gray-50">
                    <div className="flex items-center space-x-3">
                        <img src={URL.createObjectURL(file)} alt={file.name} className="h-10 w-10 object-cover rounded-md" />
                        <div>
                            <p className="text-sm font-medium text-gray-800">{file.name}</p>
                            <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <FaCheckCircle className="h-4 w-4 text-green-500 cursor-pointer" />
                        <FaRegTrashAlt className="h-4 w-4 text-red-500 cursor-pointer" onClick={() => formik.setFieldValue(name, null)} />
                    </div>
                </div>
            ) : (
                <div
                    {...getRootProps()}
                    className={twMerge(
                        `border-2 border-dashed rounded-lg p-8 text-center cursor-pointer h-48 flex flex-col items-center justify-center`,
                        isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300',
                        isError ? 'border-red-500' : ''
                    )}
                >
                    <input {...getInputProps()} />
                    <div className="bg-blue-100 rounded-full p-3">
                        <FiUploadCloud className="h-8 w-8 text-blue-500" />
                    </div>
                    <p className="mt-4 text-black font-semibold">{headings.title}</p>
                    <p className="text-sm text-gray-500">{headings.subtitle}</p>
                    <p className="mt-4 text-xs text-gray-400">{description}</p>
                    {errorMessage && typeof errorMessage === 'string' && (
                        <p className="text-red-500 text-xs mt-1">{errorMessage}</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default FileUpload;