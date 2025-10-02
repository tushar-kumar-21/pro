import { useState } from 'react';
import { useFormik } from 'formik';
import Step1_BasicDetails from './Step1_BasicDetails';
import Step2_DocumentsUpload from './Step2_DocumentsUpload';
import Step3_Preview from './Step3_Preview';
import CommonHeading from '../../../components/common/typography/CommonHeading';
import MainWrapper from '../../../components/wrappers/MainWrapper';
import { addProjectSchema } from '../../../auth/schema';

const initialValues = {
    projectTitle: '',
    projectName: '',
    projectStatus: [],
    priceRangeMin: '',
    priceRangeMax: '',
    city: [],
    areaLocality: '',
    completeAddress: '',
    pinCode: '',
    projectThumbnail: null,
    domainName: '',
    colorStyle: [],
    mxRecords: '',
    cnameRecords: '',
    governmentRegistrationCertificate: null,
    projectApprovalCertificates: null,
    commencementCertificate: null,
    noObjectionCertificates: null,
    landTitleOwnershipDocuments: null,
    developmentAgreement: null,
    completionCertificate: null,
};

const AddProjectForm = () => {
    const [currentStep, setCurrentStep] = useState(1);

    const formik = useFormik({
        initialValues,
        validationSchema:addProjectSchema,
        onSubmit: (values) => {
            if (currentStep === 3) {
                console.log('Final Form Submitted', values);
            }
        },
    });

    const nextStep = () => {
        setCurrentStep((prev) => prev + 1);
    };

    const prevStep = () => {
        setCurrentStep((prev) => prev - 1);
    };

    const getStepTitle = () => {
        switch (currentStep) {
            case 1: return 'Basic Details';
            case 2: return 'Documents Upload';
            case 3: return 'Preview & Submit';
            default: return '';
        }
    };

    const completionPercentage = currentStep === 1 ? 20 : currentStep === 2 ? 50 : 100;


    return (
        <MainWrapper >
            <div className='bg-whitePrimary p-6 mb-6 rounded-lg space-y-6'>
                <CommonHeading
                    heading='Add New Project'
                    subheading='Upload property details, images, and 3D models to showcase your unit to buyers.'
                />
                <div className='border border-greySecondary' />
                <span className='text-greyPrimary text-sm'>Step {currentStep} of 3 - {getStepTitle()}</span>
                <div className="mt-6 flex items-center justify-between mb-8">
                    <div className="flex items-start space-x-2 relative">
                        <div className="flex flex-col items-center">
                            <div className={`size-9 rounded-full ${currentStep >= 1 ? 'bg-orangePrimary text-white' : 'border border-greySecondary bg-greySecondary text-greyDark'} flex items-center justify-center font-bold text-sm`}>1</div>
                            <span className={`text-xs font-medium ${currentStep >= 1 ? 'text-orangePrimary' : 'text-greyDark'} mt-2`}>Basic Details</span>
                        </div>
                        <div className={`h-1.5 w-25 mt-4 ${currentStep > 1 ? 'bg-orangePrimary' : 'bg-greySecondary'} mx-2 rounded-full`}></div>
                        <div className="flex flex-col items-center">
                            <div className={`size-9 rounded-full ${currentStep >= 2 ? 'bg-orangePrimary text-white' : 'border border-greySecondary bg-greySecondary text-greyDark'} flex items-center justify-center font-bold text-sm`}>2</div>
                            <span className={`text-xs ${currentStep >= 2 ? 'text-orangePrimary' : 'text-greyDark'} mt-2`}>Documents Upload</span>
                        </div>
                        <div className={`h-1.5 w-25 mt-4 ${currentStep > 2 ? 'bg-orangePrimary' : 'bg-greySecondary'} mx-2 rounded-full`}></div>
                        <div className="flex flex-col items-center">
                            <div className={`size-9 rounded-full ${currentStep >= 3 ? 'bg-orangePrimary text-white' : 'border border-greySecondary bg-greySecondary text-greyDark'} flex items-center justify-center font-bold text-sm`}>3</div>
                            <span className={`text-xs ${currentStep >= 3 ? 'text-orangePrimary' : 'text-greyDark'} mt-2`}>Preview & Submit</span>
                        </div>
                    </div>
                    <p className="text-greyPrimary text-sm">{completionPercentage}% Complete</p>
                </div>
            </div>
            {currentStep === 1 && <Step1_BasicDetails formik={formik} nextStep={nextStep} />}
            {currentStep === 2 && <Step2_DocumentsUpload formik={formik} prevStep={prevStep} nextStep={nextStep} />}
            {currentStep === 3 && <Step3_Preview formik={formik} prevStep={prevStep} />}
        </MainWrapper>
    );
};

export default AddProjectForm;
