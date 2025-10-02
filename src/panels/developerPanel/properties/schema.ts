import * as Yup from 'yup';

export const step1PropertySchema = Yup.object({
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
});

export const step2PropertySchema = Yup.object({
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

export const addPropertySchema = step1PropertySchema.concat(step2PropertySchema);
