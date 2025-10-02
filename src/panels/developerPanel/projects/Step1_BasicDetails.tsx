import React from 'react';
import type { FormikProps } from 'formik';
import CommonThemeInput from '../../../components/common/inputs/CommonThemeInput';
import CommonThemeSelectInput from '../../../components/common/inputs/CommonThemeSelectInput';
import CommonButton from '../../../components/common/buttons/CommonButton';
import FileUpload from '../../../components/common/inputs/FileUpload';
import CommonHeading from '../../../components/common/typography/CommonHeading';

interface Step1_BasicDetailsProps {
    formik: FormikProps<any>;
    nextStep: () => void;
}

const projectStatusOptions = [
    { name: 'Select Status', optionId: '' },
    { name: 'Active', optionId: 'active' },
    { name: 'Pending', optionId: 'pending' },
    { name: 'Completed', optionId: 'completed' },
];

const cityOptions = [
    { name: 'Select City', optionId: '' },
    { name: 'New York', optionId: 'new_york' },
    { name: 'Los Angeles', optionId: 'los_angeles' },
    { name: 'Chicago', optionId: 'chicago' },
];

const colorStyleOptions = [
    { name: 'Select Color Style', optionId: '' },
    { name: 'Red', optionId: 'red' },
    { name: 'Blue', optionId: 'blue' },
    { name: 'Green', optionId: 'green' },
];

const Step1_BasicDetails: React.FC<Step1_BasicDetailsProps> = ({ formik, nextStep }) => {

    const handleNext = async () => {
        const step1Fields = [
            'projectTitle', 'projectName', 'projectStatus', 'priceRangeMin',
            'priceRangeMax', 'city', 'areaLocality', 'completeAddress',
            'pinCode', 'projectThumbnail', 'domainName', 'colorStyle', 'mxRecords', 'cnameRecords'
        ];
        const errors = await formik.validateForm();

        const step1Errors = Object.keys(errors).filter(field => step1Fields.includes(field));

        if (step1Errors.length === 0) {
            nextStep();
        } else {
            step1Fields.forEach(field => formik.setFieldTouched(field, true));
        }
    };

    return (
        <form className="space-y-6">
            {/* Basic Project Information */}
            <div className="bg-white p-6 rounded-lg space-y-4">
                <CommonHeading
                    heading="Basic Project Information"
                    subheading="Enter the fundamental details of your project"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <CommonThemeInput
                        name="projectTitle"
                        label="Project Title"
                        formik={formik}
                        placeholder="Enter official project title (e.g., Marcus Residency Tower"
                        mandatory
                    />
                    <CommonThemeInput
                        name="projectName"
                        label="Project Name"
                        formik={formik}
                        placeholder="Marketing name for the project"
                        mandatory
                    />
                    <CommonThemeSelectInput
                        name="projectStatus"
                        label="Project Status"
                        formik={formik}
                        options={projectStatusOptions}
                        mandatory
                    />
                    <div className="flex items-end gap-2">
                        <CommonThemeInput
                            name="priceRangeMin"
                            label="Price Range"
                            formik={formik}
                            placeholder="$ 0"
                            type="number"
                        />
                        <CommonThemeInput
                            name="priceRangeMax"
                            label=""
                            formik={formik}
                            placeholder="$ 0"
                            type="number"
                            mainClass="mt-6"
                        />
                    </div>
                </div>
            </div>

            {/* Location & Pricing */}
            <div className="bg-white p-6 rounded-lg space-y-4 mt-6">
                <CommonHeading
                    heading="Location & Pricing"
                    subheading="Specify where your project is located and pricing details"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <CommonThemeSelectInput
                        name="city"
                        label="City"
                        formik={formik}
                        options={cityOptions}
                        mandatory
                    />
                    <CommonThemeInput
                        name="areaLocality"
                        label="Area/Locality"
                        formik={formik}
                        placeholder="Search area or locality..."
                        mandatory
                    />
                    <CommonThemeInput
                        name="completeAddress"
                        label="Complete Address"
                        formik={formik}
                        placeholder="Enter complete project address"
                        mandatory
                    />
                    <CommonThemeInput
                        name="pinCode"
                        label="PIN Code"
                        formik={formik}
                        placeholder="Enter PIN code"
                        mandatory
                    />
                </div>
            </div>

            {/* Project Images */}
            <div className="bg-white p-6 rounded-lg space-y-4 mt-6">
                <CommonHeading
                    heading="Project Images"
                    subheading="Define the type and current status of your project"
                />
                <div className="grid grid-cols-1 gap-6">
                    <FileUpload
                        name="projectThumbnail"
                        label="Project Thumbnail"
                        formik={formik}
                        mandatory
                        description="Supported formats: JPG, PNG, WEBP (Max 5MB)"
                    />
                </div>
            </div>

            {/* Landing page */}
            <div className="bg-white p-6 rounded-lg space-y-4 mt-6">
                <CommonHeading
                    heading="Landing page"
                    subheading="Specify the details of your domain."
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <CommonThemeInput
                        name="domainName"
                        label="Domain Name"
                        formik={formik}
                        placeholder="Enter domain"
                        mandatory
                    />
                    <CommonThemeSelectInput
                        name="colorStyle"
                        label="Color style"
                        formik={formik}
                        options={colorStyleOptions}
                        mandatory
                    />
                    <CommonThemeInput
                        name="mxRecords"
                        label="Mx Records"
                        formik={formik}
                        placeholder="Enter mx records"
                        mandatory
                    />
                    <CommonThemeInput
                        name="cnameRecords"
                        label="C name records"
                        formik={formik}
                        placeholder="Enter c name records"
                        mandatory
                    />
                </div>
                <div className="w-fit flex gap-4 ml-auto">
                    <CommonButton
                        type="button"
                        label="User Preview"
                        variant="secondary"
                        onClick={() => console.log('User Preview Clicked')}
                        className='w-fit'
                        />
                    <CommonButton
                        type="button"
                        label="Customize Template"
                        variant="primary"
                        onClick={() => console.log('Customize Template Clicked')}
                        className='w-fit'
                    />
                </div>
            </div>

            {/* Action Buttons */}
            <CommonButton
                type="button"
                onClick={handleNext}
                label="Continue"
                variant="primary"
                className='w-fit ml-auto'
            />
        </form>
    );
};

export default Step1_BasicDetails;