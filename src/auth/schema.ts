import * as Yup from "yup";

export const loginSchema = Yup.object({
    email: Yup.string()
        .email("Enter a valid email")
        .required("Email is required"),

    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
});

export const userSignupSchema = Yup.object({
    userName: Yup.string()
        .min(3, "Username must be at least 3 characters")
        .max(20, "Username must not exceed 20 characters")
        .required("Username is required"),

    email: Yup.string()
        .email("Enter a valid email")
        .required("Email is required"),

    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),

    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Please re-enter your password"),
});

export const developerSignupSchema = Yup.object().shape({
    userName: Yup.string()
        .min(3, "Username must be at least 3 characters")
        .max(20, "Username must not exceed 20 characters")
        .required("Username is required"),

    email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),

    companyName: Yup.string()
        .min(2, "Company name must be at least 2 characters")
        .required("Company name is required"),

    organizationNumber: Yup.string()
        .matches(/^[0-9]+$/, "Organization number must contain only digits")
        .min(5, "Organization number must be at least 5 digits")
        .required("Organization number is required"),

    password: Yup.string()
        .required("Password is required"),

    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm password is required"),
});

export const addProjectSchema = Yup.object({
    projectTitle: Yup.string().required('Project Title is required'),
    projectName: Yup.string().required('Project Name is required'),
    projectStatus: Yup.array().min(1, 'Project Status is required').required('Project Status is required'),
    priceRangeMin: Yup.number().required('Minimum Price is required').min(0, 'Cannot be negative'),
    priceRangeMax: Yup.number().required('Maximum Price is required').min(Yup.ref('priceRangeMin'), 'Must be greater than or equal to Minimum Price'),
    city: Yup.array().min(1, 'City is required').required('City is required'),
    areaLocality: Yup.string().required('Area/Locality is required'),
    completeAddress: Yup.string().required('Complete Address is required'),
    pinCode: Yup.string().required('PIN Code is required'),
    projectThumbnail: Yup.mixed().required('Project Thumbnail is required'),
    domainName: Yup.string().required('Domain name is required'),
    colorStyle: Yup.array().min(1, 'Colour style is required').required('Colour style is required'),
    mxRecords: Yup.string().required('Mx records is required'),
    cnameRecords: Yup.string().required('Cname records is required'),
    governmentRegistrationCertificate: Yup.mixed().required('Required'),
    projectApprovalCertificates: Yup.mixed().required('Required'),
    commencementCertificate: Yup.mixed().required('Required'),
    noObjectionCertificates: Yup.mixed().required('Required'),
    landTitleOwnershipDocuments: Yup.mixed().required('Required'),
    developmentAgreement: Yup.mixed().required('Required'),
    completionCertificate: Yup.mixed().required('Required'),
});
