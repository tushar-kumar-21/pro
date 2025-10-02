import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUploadCloud } from 'react-icons/fi';
import { FaRegTrashAlt, FaFilePdf, FaCheckCircle } from 'react-icons/fa';
import { twMerge } from 'tailwind-merge';

interface CommonCardComponentProps {
    name: string;
    label: string;
    description: string;
    formik: any; // Formik bag
    mandatory?: boolean;
}

const CommonCardComponent: React.FC<CommonCardComponentProps> = ({
    name,
    label,
    description,
    formik,
    mandatory = false,
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
        <div className="p-4 border-2 border-dashed border-greySecondary rounded-lg w-full space-y-2">
            <div className="flex items-center justify-between">
                <label className="text-sm text-greyPrimary font-medium block">
                    {label} {mandatory && <span className="text-red-500">*</span>}
                </label>
                {file && (
                    <span className="bg-green-100 text-green-700 text-xs font-medium px-2.5 py-0.5 rounded-full">Uploaded</span>
                )}
                {!file && mandatory && (
                    <span className="bg-red-100 text-red-700 text-xs font-medium px-2.5 py-0.5 rounded-full">Required</span>
                )}
            </div>
            <p className="text-xs text-gray-500 mb-2">{description}</p>

            {file ? (
                <div className="flex items-center justify-between p-4 border border-gray-300 rounded-md bg-gray-50">
                    <div className="flex items-center space-x-3">
                        <FaFilePdf className="h-6 w-6 text-red-500" />
                        <div>
                            <p className="text-sm font-medium text-gray-800">{file.name}</p>
                            <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                            <FaCheckCircle className="h-4 w-4 text-green-500" />
                        <FaRegTrashAlt className="h-4 w-4 text-red-500 cursor-pointer" onClick={() => formik.setFieldValue(name, null)} />
                    </div>
                </div>
            ) : (
                <div
                    {...getRootProps()}
                    className={twMerge(
                        `border rounded-lg text-center cursor-pointer flex flex-col items-center justify-center`,
                        isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300',
                        isError ? 'border-red-500' : ''
                    )}
                >
                    <input {...getInputProps()} />
                    <div  className="flex gap-3 items-center my-2">
                        <FiUploadCloud className="mx-auto size-5 text-black" />
                        <p className="text-black">Choose File</p>
                    </div>
                    {errorMessage && typeof errorMessage === 'string' && (
                        <p className="text-red-500 text-xs mt-1">{errorMessage}</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default CommonCardComponent;