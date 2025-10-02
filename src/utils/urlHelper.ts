import { roles } from "./constants";

export const adminStaticRoutes = {
    toDashBoard: () => `/${roles.ADMIN}/dashboard`,
};

export const developerStaticRoutes = {
    toDashBoard: () => `/${roles.DEVELOPER}/dashboard`,
    toProjectsListing: () => `/${roles.DEVELOPER}/projects`,
};

export const userStaticRoutes = {
    toDashBoard: () => `/${roles.USER}/dashboard`,
};
