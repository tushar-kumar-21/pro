import { useState } from "react";
// import logo from "../../assets/svgs/cathyLogo.svg";
import { Link, useNavigate } from "react-router-dom";
import ImageComponent from "../components/ImageComponent";
import CommonButton from "../components/common/buttons/CommonButton";
import CommonThemeInput from "../components/common/inputs/CommonThemeInput";
import CommonHeading from "../components/common/typography/CommonHeading";
import { useRoutePath } from "../hooks/useRoutePath";
import { roles } from "../utils/constants";
import { loginSchema } from "./schema";
import { useFormik } from "formik";
import { postRequest } from "../apis/apiRequests";
import { adminEndpoints, developerEndpoints, userEndpoints } from "../apis/endpoints";
import { adminStaticRoutes, developerStaticRoutes, userStaticRoutes } from "../utils/urlHelper";

const LoginPage = () => {
    //   const session = storage();
    const path = useRoutePath(1) || roles.ADMIN;
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: loginSchema,
        onSubmit: async (values: any) => {
            try {
                setIsLoading(true);
                let res: any = ""

                switch (path) {
                    case roles.ADMIN:
                        res = await postRequest(adminEndpoints.login, values)
                        navigate(adminStaticRoutes.toDashBoard());
                        break;

                    case roles.DEVELOPER:
                        res = await postRequest(developerEndpoints.login, values)
                        navigate(developerStaticRoutes.toDashBoard());
                        break;

                    case roles.USER:
                        await postRequest(userEndpoints.login, values)
                        navigate(userStaticRoutes.toDashBoard());
                        break;

                    default:
                        console.warn("Unknown role:", path);
                        break;
                }
                console.log("Login response:", res);
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
            <div className="w-full  max-w-md mx-auto my-10 p-6 rounded-lg">
                <div className="space-y-6">
                    <div className="">
                        <ImageComponent
                            src={"https://gold-sky-media.s3.eu-north-1.amazonaws.com/uploads/8750e5f5-9984-44f8-9b54-45c5cc64d7fc.png"}
                            className="w-80 pl-0"
                        />
                    </div>
                    <div>
                        <CommonHeading
                            heading="Login to your Account"
                            subheading="See what is going on with your business"
                            headingClassName="text-3xl font-bold"
                        />

                    </div>
                    <form className="space-y-5" >
                        <CommonThemeInput
                            label="Email"
                            type="email"
                            formik={formik}
                            name="email"
                            id="email"
                            showProfileIcon={true}
                            placeholder="Enter your email"
                            className="text-lightGrey"
                        />
                        <div>
                            <CommonThemeInput
                                formik={formik}
                                name="password"
                                label="Password"
                                id="password"
                                showEye={true}
                                placeholder="Enter your password"
                                className="text-lightGrey"

                            />
                            <div className="flex justify-end items-end mt-1">
                                <Link
                                    to={"#"}
                                    className="text-orangePrimary font-medium text-sm items-end"
                                >
                                    Forget Passowrd?
                                </Link>
                            </div>
                        </div>
                        <CommonButton
                            label="Login"
                            className="py-3"
                            type="submit"
                            onClick={formik.handleSubmit}
                            loading={isLoading}
                        />
                    </form>
                </div>
            </div>
            {/* <p className="text-base text-lightGrey text-center mt-auto"><span>Not Registerd Yet?</span><span className="text-orangePrimary">Create an account</span></p> */}
        </div>

    );
};

export default LoginPage;
