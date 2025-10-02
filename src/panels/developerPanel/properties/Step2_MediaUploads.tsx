import React from 'react';
import CommonButton from '../../../components/common/buttons/CommonButton';
import CommonHeading from '../../../components/common/typography/CommonHeading';
import FileUpload from '../../../components/common/inputs/FileUpload';
import CommonThemeInput from '../../../components/common/inputs/CommonThemeInput';
import CommonThemeSelectInput from '../../../components/common/inputs/CommonThemeSelectInput';
import { type FormikProps } from 'formik';

interface Step2_MediaUploadsProps {
    formik: FormikProps<any>;
    prevStep: () => void;
}

const configurationOptions = [
    { name: '1 BHK', optionId: '1BHK' },
    { name: '2 BHK', optionId: '2BHK' },
    { name: '3 BHK', optionId: '3BHK' },
];

const Step2_MediaUploads = ({ formik, prevStep }: Step2_MediaUploadsProps) => {

    const addUnitType = () => {
        const newUnit = {
            configuration: '',
            carpetArea: '',
            price: '',
            availableUnits: '',
            floorPlan: null,
            images: null,
            "3dFile": null,
        };
        formik.setFieldValue('unitTypes', [...formik.values.unitTypes, newUnit]);
    };

    return (
        <div className="rounded-lg">
            <form onSubmit={formik.handleSubmit} className='space-y-6'>
                <div className="space-y-6">
                    <div className='bg-whitePrimary p-6 rounded-lg'>
                        <CommonHeading heading="Media Uploads" subheading="Upload images, floor plans, and 3D models to showcase your property" />
                        <div className="mt-6 space-y-6">
                            <FileUpload
                                name="thumbnailImages"
                                label="Thumbnail Images"
                                mandatory
                                description="Drag & drop your image here or click to browse files. Supported formats: JPG, PNG, WEBP (Max 5MB)"
                                formik={formik}
                            />
                            <FileUpload
                                name="2dFile"
                                label="2D File"
                                description="GLB, OBJ, USDZ"
                                headings={{ title: "2D file", subtitle: "GLB, OBJ, USDZ " }}
                                formik={formik}
                            />
                        </div>
                    </div>

                    <div className='bg-whitePrimary p-6 rounded-lg'>
                        <div className="flex justify-between items-center">
                            <CommonHeading heading="Unit Category" subheading="Define different unit types and their specifications" />
                            <CommonButton
                                type="button"
                                label="+ Add Unit Type"
                                variant="primary"
                                onClick={addUnitType}
                                className='w-fit'
                            />
                        </div>
                        <div className="space-y-6 mt-4">
                            {formik.values.unitTypes.map((unit: any, index: number) => (
                                <div key={index} className="p-6 border rounded-lg">
                                    <CommonHeading heading={`Unit Type ${index + 1}`} />
                                    <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-6">
                                        <CommonThemeSelectInput name={`unitTypes.${index}.configuration`} label="Configuration" options={configurationOptions} formik={formik} />
                                        <CommonThemeInput name={`unitTypes.${index}.carpetArea`} label="Carpet Area (m²)" placeholder="e.g., 650" formik={formik} />
                                        <CommonThemeInput name={`unitTypes.${index}.price`} label="Price ($)" placeholder="e.g., 450000" formik={formik} />
                                        <CommonThemeInput name={`unitTypes.${index}.availableUnits`} label="Available Units" placeholder="e.g., 15" formik={formik} />
                                    </div>
                                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <FileUpload
                                            name={`unitTypes.${index}.floorPlan`}
                                            label="Floor plan"
                                            description="GLB, OBJ, USDZ"
                                            headings={{ title: "2D file", subtitle: "GLB, OBJ, USDZ " }}
                                            formik={formik}
                                        />
                                        <FileUpload
                                            name={`unitTypes.${index}.images`}
                                            label="Images"
                                            mandatory
                                            formik={formik}
                                        />
                                    </div>
                                    <div className="mt-6">
                                        <FileUpload
                                            name={`unitTypes.${index}.3dFile`}
                                            label="3D File"
                                            description="GLB, OBJ, USDZ"
                                            headings={{ title: "2D file", subtitle: "GLB, OBJ, USDZ " }}
                                            formik={formik}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-4 ">
                    <CommonButton
                        label="Continue"
                        type="submit"
                        variant="primary"
                        className='w-fit'
                    />
                </div>
            </form>
        </div>
    );
};

export default Step2_MediaUploads;
