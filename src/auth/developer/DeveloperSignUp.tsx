import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ImageComponent from "../../components/ImageComponent";
import CommonButton from "../../components/common/buttons/CommonButton";
import CommonThemeInput from "../../components/common/inputs/CommonThemeInput";
import CommonHeading from "../../components/common/typography/CommonHeading";
import { useRoutePath } from "../../hooks/useRoutePath";
import { roles } from "../../utils/constants";
import { useFormik } from "formik";
import { developerSignupSchema } from "../schema";
import { postRequest } from "../../apis/apiRequests";
import { developerEndpoints } from "../../apis/endpoints";
import { developerStaticRoutes } from "../../utils/urlHelper";

const DeveloperSignup = () => {
    //   const session = storage();
    const path = useRoutePath(1) || roles.ADMIN;
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: "",
            userName: "",
            companyName: "",
            organizationNumber: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema: developerSignupSchema,
        onSubmit: async (values: any) => {
            const payload = {
                name: values.userName,
                email: values.email,
                company_name: values.companyName,
                org_number: values.organizationNumber,
                password: values.password,
                confirmPassword: values.confirmPassword,
                role: roles.DEVELOPER
            }
            try {
                setIsLoading(true);
                const res = await postRequest(developerEndpoints.signup, payload)
                navigate(developerStaticRoutes.toDashBoard());
            } catch (error) {
            } finally {
                setIsLoading(false);
            }
        },
    });

    //   useEffect(() => {
    //     session.clear();
    //   }, []);

    return (
        <div>
            <div className="w-full max-w-md mx-auto  rounded-lg">
                <div className="space-y-4">
                    <div className="">
                        <ImageComponent
                            src={"https://gold-sky-media.s3.eu-north-1.amazonaws.com/uploads/8750e5f5-9984-44f8-9b54-45c5cc64d7fc.png"}
                            className="w-80 pl-0"
                        />
                    </div>
                    <div>
                        <CommonHeading
                            heading="Sign up to new Account"
                            subheading="See what is going on with your business"
                            headingClassName="text-3xl font-bold"
                        />

                    </div>
                    <form className="space-y-4" >
                        <CommonThemeInput
                            label="User name"
                            type="text"
                            formik={formik}
                            name="userName"
                            id="name"
                            placeholder="Enter your username"
                        />
                        <CommonThemeInput
                            label="Email"
                            type="email"
                            formik={formik}
                            name="email"
                            id="email"
                            placeholder="Enter your email"
                        />
                        <CommonThemeInput
                            label="Company Name"
                            type="email"
                            formik={formik}
                            name="companyName"
                            id="email"
                            placeholder="Enter your company name"
                        />
                        <CommonThemeInput
                            label="Organization Number"
                            type="email"
                            formik={formik}
                            name="organizationNumber"
                            id="email"
                            placeholder="Enter your organization number"
                        />
                        <CommonThemeInput
                            formik={formik}
                            name="password"
                            label="Password"
                            id="password"
                            showEye={true}
                            placeholder="Enter your password"
                        />
                        <div>
                            <CommonThemeInput
                                formik={formik}
                                name="confirmPassword"
                                label="Re-enter Password"
                                id="confirmPassword"
                                showEye={true}
                                placeholder="Re-enter your password"
                            />
                            <div className="flex justify-end items-end mt-1">
                                <Link
                                    // to={authStaticRoutes.forgetPassword()}
                                    className="text-orangePrimary font-medium text-sm items-end"
                                >
                                    Forget Passowrd?
                                </Link>
                            </div>
                        </div>

                    </form>
                    <CommonButton
                        label="Signup"
                        className="py-3"
                        type="submit"
                        onClick={formik.handleSubmit}
                        loading={isLoading}
                    />
                </div>
            </div>
            <p className="text-base text-lightGrey text-center mt-4"><span>Already have an account?</span> <span className="text-orangePrimary">Log in</span></p>
        </div>

    );
};

export default DeveloperSignup;
