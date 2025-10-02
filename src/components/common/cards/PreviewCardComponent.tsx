import React from 'react';
import { FaFilePdf, FaCheckCircle } from 'react-icons/fa';

interface PreviewCardComponentProps {
    label: string;
    description: string;
    file?: {
        name: string;
        size: number;
    };
}

const PreviewCardComponent: React.FC<PreviewCardComponentProps> = ({
    label,
    description,
    file,
}) => {

    return (
        <div className="p-4 border-2 border-dashed border-greySecondary rounded-lg w-full space-y-2">
            <div className="flex items-center justify-between">
                <label className="text-sm text-greyPrimary font-medium block">
                    {label}
                </label>
                {file && (
                    <span className="bg-green-100 text-green-700 text-xs font-medium px-2.5 py-0.5 rounded-full">Uploaded</span>
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
                        <div className="bg-green-500 rounded-full p-1">
                            <FaCheckCircle className="h-4 w-4 text-white" />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-center p-4 border border-gray-300 rounded-md bg-gray-50 h-20">
                    <p className="text-gray-500">No file uploaded</p>
                </div>
            )}
        </div>
    );
};

export default PreviewCardComponent;
