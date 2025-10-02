

export const DASHBOARD = "Dashboard";
export const EMPLOYEE = "Employee";
export const EMPLOYER = "Employer";
export const INVOICE = "Invoice";
export const FORM_CREATION = "Form Creation";
export const PLAN_MANAGEMENT = "Plan Management";

export const roles = {
    ADMIN: "admin",
    DEVELOPER: "developer",
    USER: 'user'
};

export const colors = {
    black: "#001530",
    white: "#ffffff",
};

export const queryKeys = {
    MANAGEMENT_TYPE: "managementType",
    EMPLOYEE_TAB: "employeeTab",
    EMPLOYER_STABLE_TABS: "employerStableTabs",
    FORM_TYPE: "formType",
    JOB_MATCHES: "jobMatches",
    EMPLOYEE_NAME: 'employeeName',
    PLANS: "planType",
};

export const employerSidebar = {
    DASHBOARD: "Dashboard",
    LIVE_JOBS: "Live Jobs",
    SAVED_JOBS: "Saved Jobs",
    POST_JOBS: "Post a Job",
    DRAFTS: "Saved Drafts",
    PLANS: "Plans",
};

export const adminSidebar = {
    DASHBOARD: "Dashboard",
    EMPLOYEE: "Employee",
    EMPLOYER: "Employer",
    INVOICE: "Invoice",
    FORM_CREATION: "Form Creation",
    PLAN_MANAGEMENT: "Plan Management"
}


export const STATUS_CODES = {
    SUCCESS: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
};

export const storageKeys = {
    ROLE: "role",
    USER_DATA: "user_data"
}

export const CONSTANT_TEXT = {
    FALLBACK_TEXT: "N/A"
}

export const jobPlanType = {
    GOLD_CONCIREGE: "Gold Concierge Plan",
    GOLD: "Gold Plan"
}

export const ConstantColors = {
    blackPrimary: "#07254b",
    yellowPrimary: "#ecd07c",
    whitePrimary: "#ffffff",
    orangePrimary: "#ff6f04"
}

export const swalConstants = {
    confirmButtonColor: ConstantColors.yellowPrimary,
    cancelButtonColor: ConstantColors.orangePrimary,
    cancelButtonText: "Cancel",
    background: ConstantColors.blackPrimary,
    color: ConstantColors.whitePrimary,
    iconColor: ConstantColors.yellowPrimary,
}

export const inputTypes = ["input", "text-area", "date", "number"];