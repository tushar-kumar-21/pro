import React from 'react';
import type { FormikProps } from 'formik';
import CommonButton from '../../../components/common/buttons/CommonButton';
import CommonHeading from '../../../components/common/typography/CommonHeading';
import CommonCardComponent from '../../../components/common/cards/CommonCardComponent';

interface Step2_DocumentsUploadProps {
    formik: FormikProps<any>;
    prevStep: () => void;
    nextStep: () => void;
}

const Step2_DocumentsUpload: React.FC<Step2_DocumentsUploadProps> = ({ formik, prevStep, nextStep }) => {

    const handleNext = async () => {
        const step2Fields = [
            'governmentRegistrationCertificate',
            'projectApprovalCertificates',
            'commencementCertificate',
            'noObjectionCertificates',
            'landTitleOwnershipDocuments',
            'developmentAgreement',
            'completionCertificate',
        ];
        const errors = await formik.validateForm();
        const step2Errors = Object.keys(errors).filter(field => step2Fields.includes(field));

        if (step2Errors.length === 0) {
            nextStep();
        } else {
            step2Fields.forEach(field => formik.setFieldTouched(field, true));
        }
    };

    return (
        <form onSubmit={(e) => { e.preventDefault(); handleNext(); }} className='space-y-6'>
            <div className="p-8 rounded-lg space-y-6 bg-whitePrimary">
                <CommonHeading
                    heading="Project Documents Upload"
                    subheading="Upload all required legal and regulatory documents for your project"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <CommonCardComponent
                        name="governmentRegistrationCertificate"
                        label="Government Registration Certificate"
                        description="Required for project verification"
                        formik={formik}
                        mandatory
                    />
                    <CommonCardComponent
                        name="projectApprovalCertificates"
                        label="Project Approval Certificates"
                        description="Municipal/local authority approvals"
                        formik={formik}
                        mandatory
                    />
                    <CommonCardComponent
                        name="commencementCertificate"
                        label="Commencement Certificate (CC)"
                        description="Construction commencement approval"
                        formik={formik}
                        mandatory
                    />
                    <CommonCardComponent
                        name="noObjectionCertificates"
                        label="No Objection Certificates (NOCs)"
                        description="Fire, pollution, and other NOCs"
                        formik={formik}
                        mandatory
                    />
                    <CommonCardComponent
                        name="landTitleOwnershipDocuments"
                        label="Land Title & Ownership Documents"
                        description="Property ownership proofs"
                        formik={formik}
                        mandatory
                    />
                    <CommonCardComponent
                        name="developmentAgreement"
                        label="Development Agreement"
                        description="Developer-landowner agreement"
                        formik={formik}
                        mandatory
                    />
                    <CommonCardComponent
                        name="completionCertificate"
                        label="Completion Certificate"
                        description="Construction completion certificate"
                        formik={formik}
                        mandatory
                    />
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4">
                <CommonButton
                    type="button"
                    label="Back"
                    variant="secondary"
                    onClick={prevStep}
                    className='w-fit'
                />
                <CommonButton
                    type="submit"
                    label="Continue"
                    variant="primary"
                    className='ml-auto w-fit'
                />
            </div>
        </form>
    );
};

export default Step2_DocumentsUpload;