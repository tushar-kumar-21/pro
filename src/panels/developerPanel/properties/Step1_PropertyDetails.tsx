import React, { useState } from 'react';
import { useFormik, type FormikProps } from 'formik';
import CommonThemeInput from '../../../components/common/inputs/CommonThemeInput';
import CommonThemeSelectInput from '../../../components/common/inputs/CommonThemeSelectInput';
import CommonTextArea from '../../../components/common/inputs/CommonTextArea';
import FileUpload from '../../../components/common/inputs/FileUpload';
import CommonButton from '../../../components/common/buttons/CommonButton';
import CommonHeading from '../../../components/common/typography/CommonHeading';
import { FaSwimmingPool, FaDumbbell, FaTree, FaCar, FaShieldAlt, FaChild } from 'react-icons/fa';
import { MdVilla } from "react-icons/md";
import ModalWrapper from '../../../components/common/modals/ModalWrapper';

interface Step1_PropertyDetailsProps {
    formik: FormikProps<any>;
    nextStep: () => void;
}

const projectOptions = [
    { name: 'Skyline Residences Phase 2', optionId: 'skyline2' },
    { name: 'Ocean View Heights', optionId: 'oceanview' },
];

const propertyStatusOptions = [
    { name: 'Available', optionId: 'available' },
    { name: 'Sold', optionId: 'sold' },
];

const amenities = [
    { name: 'Swimming pool', icon: <FaSwimmingPool /> },
    { name: 'Gymnasium', icon: <FaDumbbell /> },
    { name: 'Garden', icon: <FaTree /> },
    { name: 'Parking', icon: <FaCar /> },
    { name: 'Security', icon: <FaShieldAlt /> },
    { name: 'Kids play area', icon: <FaChild /> },
    { name: 'Club house', icon: <MdVilla /> },
];

const Step1_PropertyDetails: React.FC<Step1_PropertyDetailsProps> = ({ formik, nextStep }) => {

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const amenityFormik = useFormik({
        initialValues: {
            amenityName: '',
            amenityIcon: null,
        },
        onSubmit: (values) => {
            const newAmenity = {
                name: values.amenityName,
                icon: <img src={URL.createObjectURL(values.amenityIcon)} alt={values.amenityName} className="h-6 w-6" />
            };
            setAmenities([...amenities, newAmenity]);
            formik.setFieldValue('amenities', [...formik.values.amenities, newAmenity.name]);
            setIsModalOpen(false);
            amenityFormik.resetForm();
        },
    });

    const handleNext = async () => {
        const errors = await formik.validateForm();
        if (Object.keys(errors).length === 0) {
            nextStep();
        } else {
            formik.setTouched(errors);
        }
    };

    return (
        <div className='space-y-6'>
            <form onSubmit={(e) => { e.preventDefault(); handleNext(); }} >
                <div className="space-y-6 rounded-lg ">
                    <div className='bg-whitePrimary p-6 rounded-lg space-y-6'>
                        <div>
                            <CommonHeading heading="Basic Property Details" subheading="Manage your real estate projects and track verification status" />
                            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <CommonThemeInput name="propertyName" label="Property Name" formik={formik} mandatory placeholder="Enter property name" />
                                <CommonThemeSelectInput name="selectProject" label="Select Project" formik={formik} options={projectOptions} mandatory />
                                <div className="md:col-span-2">
                                    <CommonTextArea name="propertyDescription" label="Property Description" formik={formik} placeholder="Add Description" />
                                </div>
                                <CommonThemeInput name="propertySize" label="Property Size" formik={formik} mandatory placeholder="1,250" rightAddon="m²" />
                                <CommonThemeSelectInput name="propertyStatus" label="Property Status" formik={formik} options={propertyStatusOptions} mandatory />
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700">Amenities</label>
                            <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                {amenities?.map((amenity, index) => (
                                    <div key={index} className="flex items-center justify-center space-x-2 p-3 border border-greyDim rounded-lg">
                                        <div className="text-orangePrimary">{amenity.icon}</div>
                                        <span className="text-base text-black">{amenity.name}</span>
                                    </div>
                                ))}
                                <CommonButton
                                    variant="secondary"
                                    label='+Add amenities'
                                    onClick={() => setIsModalOpen(true)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className='bg-whitePrimary p-6 rounded-lg'>
                        <div className="flex justify-between items-center">
                            <CommonHeading
                                heading="Broker Information"
                                subheading="Manage your real estate projects and track verification status"
                            />
                            <CommonButton
                                label="+ Add Broker"
                                variant="primary"
                                className='w-fit'
                            />
                        </div>
                        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <CommonThemeInput name="brokerName" label="Broker Name" formik={formik} placeholder="Enter Broker Name" />
                            <CommonThemeInput name="companyName" label="Company Name" formik={formik} placeholder="Enter Company Name" />
                            <CommonThemeInput name="emailAddress" label="Email Address" formik={formik} placeholder="Enter Email Address" />
                            <CommonThemeInput name="phoneNumber" label="Phone Number" formik={formik} placeholder="Enter Phone Number" />
                            <div className="md:col-span-1">
                                <label className="text-sm font-medium text-gray-700">Company logo</label>
                                <FileUpload name="companyLogo" label="" formik={formik} description="" />
                            </div>
                        </div>
                    </div>
                </div>


            </form>
            {isModalOpen && (
                <ModalWrapper closeFunc={() => setIsModalOpen(false)}>
                    <form onSubmit={amenityFormik.handleSubmit}>
                        <CommonHeading heading="Add Amenity" />
                        <div className="mt-4 space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-700">Amenity Icon</label>
                                <FileUpload name="amenityIcon" label="" formik={amenityFormik} description="Upload icon" />
                            </div>
                            <CommonThemeInput name="amenityName" label="Amenity Name" formik={amenityFormik} placeholder="Enter amenity name" />
                        </div>
                        <div className="flex justify-end gap-4 mt-6">
                            <CommonButton type="button" label="Cancel" variant="red-secondary" onClick={() => setIsModalOpen(false)} />
                            <CommonButton type="submit" label="Save" variant="primary" />
                        </div>
                    </form>
                </ModalWrapper>
            )}
            <div className="flex justify-end ">
                <CommonButton
                    label="Continue"
                    type="submit"
                    variant="primary"
                    className='w-fit'
                />
            </div>
        </div>
    );
};

export default Step1_PropertyDetails;