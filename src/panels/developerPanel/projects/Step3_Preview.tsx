import React from 'react';
import type { FormikProps } from 'formik';
import CommonButton from '../../../components/common/buttons/CommonButton';
import CommonHeading from '../../../components/common/typography/CommonHeading';
import PreviewCardComponent from '../../../components/common/cards/PreviewCardComponent';

interface Step3_PreviewProps {
    formik: FormikProps<any>;
    prevStep: () => void;
}

const Step3_Preview: React.FC<Step3_PreviewProps> = ({ formik, prevStep }) => {
    const { values } = formik;

    const renderImagePreview = (file: File | null) => {
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            return <img src={imageUrl} alt="Project Thumbnail" className="h-48 w-full object-cover rounded-lg" />;
        }
        return (
            <div className="h-48 w-full bg-gray-100 rounded-lg flex flex-col items-center justify-center border-2 border-dashed">
                <p className="text-gray-500">No Image Uploaded</p>
            </div>
        );
    }

    return (
        <div className="p-8 rounded-lg">
            <form onSubmit={formik.handleSubmit} className="space-y-8">
                {/* Basic Project Information */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <CommonHeading
                        heading="Basic Project Information"
                        subheading="These are the fundamental details of your project"
                    />
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        <div>
                            <label className="text-sm font-semibold text-black">Project Title</label>
                            <p className="mt-2 text-base text-gray-900">{values.projectTitle || '-'}</p>
                        </div>
                        <div>
                            <label className="text-sm font-semibold text-black">Project Name</label>
                            <p className="mt-2 text-base text-gray-900">{values.projectName || '-'}</p>
                        </div>
                        <div>
                            <label className="text-sm font-semibold text-black">Project Status</label>
                            <p className="mt-2 text-base text-gray-900">{values.projectStatus[0]?.name || '-'}</p>
                        </div>
                    </div>
                </div>

                {/* Location & Pricing */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <CommonHeading
                        heading="Location & Pricing"
                        subheading="This is where your project is located"
                    />
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        <div>
                            <label className="text-sm font-semibold text-black">City</label>
                            <p className="mt-2 text-base text-gray-900">{values.city[0]?.name || '-'}</p>
                        </div>
                        <div>
                            <label className="text-sm font-semibold text-black">Area/Locality</label>
                            <p className="mt-2 text-base text-gray-900">{values.areaLocality || '-'}</p>
                        </div>
                        <div className="md:col-span-2">
                            <label className="text-sm font-semibold text-black">Complete Address</label>
                            <p className="mt-2 text-base text-gray-900">{values.completeAddress || '-'}</p>
                        </div>
                        <div>
                            <label className="text-sm font-semibold text-black">PIN Code</label>
                            <p className="mt-2 text-base text-gray-900">{values.pinCode || '-'}</p>
                        </div>
                    </div>
                </div>

                {/* Project Images */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <CommonHeading
                        heading="Project Images"
                        subheading="This is the main thumbnail for your project"
                    />
                    <div className="mt-6">
                        {renderImagePreview(values.projectThumbnail)}
                    </div>
                </div>

                {/* Project Documents Upload */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <CommonHeading
                        heading="Project Documents Upload"
                        subheading="All required legal and regulatory documents for your project"
                    />
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <PreviewCardComponent
                            label="Government Registration Certificate"
                            description="Required for project verification"
                            file={values.governmentRegistrationCertificate}
                        />
                        <PreviewCardComponent
                            label="Project Approval Certificates"
                            description="Municipal/local authority approvals"
                            file={values.projectApprovalCertificates}
                        />
                        <PreviewCardComponent
                            label="Commencement Certificate (CC)"
                            description="Construction commencement approval"
                            file={values.commencementCertificate}
                        />
                        <PreviewCardComponent
                            label="No Objection Certificates (NOCs)"
                            description="Fire, pollution, and other NOCs"
                            file={values.noObjectionCertificates}
                        />
                        <PreviewCardComponent
                            label="Land Title & Ownership Documents"
                            description="Property ownership proofs"
                            file={values.landTitleOwnershipDocuments}
                        />
                        <PreviewCardComponent
                            label="Development Agreement"
                            description="Developer-landowner agreement"
                            file={values.developmentAgreement}
                        />
                        <PreviewCardComponent
                            label="Completion Certificate"
                            description="Construction completion certificate"
                            file={values.completionCertificate}
                        />
                    </div>
                </div>

            </form>
            {/* Action Buttons */}
            <div className="flex justify-end gap-4 pt-6">
                <CommonButton
                    type="button"
                    label="Edit form"
                    variant="secondary"
                    onClick={prevStep}
                    className='w-fit'
                />
                <CommonButton
                    type="button"
                    label="User Preview"
                    variant="secondary"
                    onClick={() => console.log('User Preview clicked')} // Placeholder action
                    className='w-fit'
                />
                <CommonButton
                    type="submit"
                    label="Upload project"
                    variant="primary"
                    className='w-fit'
                    onClick={() => formik.handleSubmit()}
                />
            </div>
        </div>
    );
};

export default Step3_Preview;
