import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Step1_PropertyDetails from './Step1_PropertyDetails';
import Step2_MediaUploads from './Step2_MediaUploads';
import CommonHeading from '../../../components/common/typography/CommonHeading';
import MainWrapper from '../../../components/wrappers/MainWrapper';

const addPropertySchema = Yup.object({
    propertyName: Yup.string().required('Property Name is required'),
    selectProject: Yup.string().required('Project is required'),
    propertyDescription: Yup.string(),
    propertySize: Yup.number().required('Property Size is required'),
    propertyStatus: Yup.string().required('Property Status is required'),
    amenities: Yup.array(),
    brokerName: Yup.string(),
    companyName: Yup.string(),
    emailAddress: Yup.string().email('Invalid email'),
    companyLogo: Yup.mixed(),
    phoneNumber: Yup.string(),
    thumbnailImages: Yup.mixed().required('Thumbnail images are required'),
    "2dFile": Yup.mixed(),
    unitTypes: Yup.array().of(
        Yup.object().shape({
            configuration: Yup.string(),
            carpetArea: Yup.number(),
            price: Yup.number(),
            availableUnits: Yup.number(),
            floorPlan: Yup.mixed(),
            images: Yup.mixed().required('Images are required'),
            "3dFile": Yup.mixed(),
        })
    ),
});

const AddPropertyForm = () => {
    const [currentStep, setCurrentStep] = useState(1);

    const formik = useFormik({
        initialValues: {
            propertyName: '',
            selectProject: '',
            propertyDescription: '',
            propertySize: '',
            propertyStatus: '',
            amenities: [],
            brokerName: '',
            companyName: '',
            emailAddress: '',
            companyLogo: null,
            phoneNumber: '',
            thumbnailImages: null,
            "2dFile": null,
            unitTypes: [
                {
                    configuration: '1BHK',
                    carpetArea: '',
                    price: '',
                    availableUnits: '',
                    floorPlan: null,
                    images: null,
                    "3dFile": null,
                }
            ],
        },
        validationSchema: addPropertySchema,
        onSubmit: (values) => {
            console.log('Final Form Submitted', values);
        },
    });

    const nextStep = () => {
        setCurrentStep((prev) => prev + 1);
    };

    const prevStep = () => {
        setCurrentStep((prev) => prev - 1);
    };

    const completionPercentage = currentStep === 1 ? 50 : 100;

    return (
        <MainWrapper>
            <div className='bg-white p-6 mb-6 rounded-lg space-y-6'>
                <CommonHeading
                    heading='Add New Property'
                    subheading='Fill in the details to add a new property.'
                />
                <div className='border-b border-gray-200' />
                <span className='text-gray-500 text-sm'>Step {currentStep} of 2 - {currentStep === 1 ? 'Basic Property Details' : 'Media Uploads'}</span>
                <div className="mt-6 flex items-center justify-between mb-8">
                    <div className="flex items-start space-x-2 relative">
                        <div className="flex flex-col items-center">
                            <div className={`size-9 rounded-full ${currentStep >= 1 ? 'bg-orangePrimary text-white' : 'border border-greySecondary bg-greySecondary text-greyDark'} flex items-center justify-center font-bold text-sm`}>1</div>
                            <span className={`text-xs font-medium ${currentStep >= 1 ? 'text-orangePrimary' : 'text-greyDark'} mt-2`}>Basic Details</span>
                        </div>
                        <div className={`h-1.5 w-25 mt-4 ${currentStep > 1 ? 'bg-orangePrimary' : 'bg-greySecondary'} mx-2 rounded-full`}></div>
                        <div className="flex flex-col items-center">
                            <div className={`size-9 rounded-full ${currentStep >= 2 ? 'bg-orangePrimary text-white' : 'border border-greySecondary bg-greySecondary text-greyDark'} flex items-center justify-center font-bold text-sm`}>2</div>
                            <span className={`text-xs ${currentStep >= 2 ? 'text-orangePrimary' : 'text-greyDark'} mt-2`}>Media Uploads</span>
                        </div>
                    </div>
                    <p className="text-greyPrimary text-sm">{completionPercentage}% Complete</p>
                </div>
            </div>
            {
                currentStep === 2 && 
                <Step1_PropertyDetails formik={formik} nextStep={nextStep} />
            }
            {
                currentStep === 1 &&
                <Step2_MediaUploads formik={formik} prevStep={prevStep} />
            }
        </MainWrapper>
    );
};

export default AddPropertyForm;