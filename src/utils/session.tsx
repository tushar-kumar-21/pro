import CryptoJS from "crypto-js";
import { Navigate, useLocation } from "react-router";
// import { adminStaticRoutes, authStaticRoutes, employerSaticRoutes } from "../../utils/urlHelper";
// import { ReactNode } from "react";
import toast from "react-hot-toast";
import { storageKeys, roles } from "./constants";

const secretKey = import.meta.env.VITE_SECRET_TOKEN_KEY || "";
const stringSecretKey = import.meta.env.VITE_SECRET_STRING_KEY || "";
const securityKey = import.meta.env.VITE_SECURITY_KEY || "";
const encryptionKey = import.meta.env.VITE_ENCRYPTION_KEY || "";

export const encodeToken = (payload: any) => {
    if (!secretKey) {
        throw new Error("Secret key is not defined.");
    }

    const dataString = JSON.stringify(payload);

    // Encrypt the payload and secret key using AES encryption
    const encryptedPayload = CryptoJS.AES.encrypt(
        dataString,
        secretKey
    ).toString();
    const encryptedSecret = CryptoJS.AES.encrypt(secretKey, secretKey).toString();

    const token = `${encryptedPayload}.${encryptedSecret}`;

    // Set token in cookies
    document.cookie = `${securityKey}=${token}; path=/; Secure; SameSite=Lax`;

    // Save token in local storage
    sessionStorage.setItem(securityKey, token);

    return token;
};

export function generateEncryptedString({ keyName, data }: { keyName: string, data: any }) {

    if (!stringSecretKey) {
        throw new Error("Secret key is not defined.");
    }
    if (!keyName) {
        throw new Error("Key name is required.");
    }

    // Convert the data to string for encryption
    const dataString = JSON.stringify(data);

    // Encrypt the payload and secret key using AES encryption
    const encryptedPayload = CryptoJS.AES.encrypt(
        dataString,
        stringSecretKey
    ).toString();

    const encryptedSecret = CryptoJS.AES.encrypt(stringSecretKey, stringSecretKey).toString();

    // Final token format
    const token = `${encryptedPayload}.${encryptedSecret}`;

    // Save in cookies
    document.cookie = `${keyName}=${token}; path=/; Secure; SameSite=Lax`;

    // Save in local storage
    sessionStorage.setItem(keyName, token);

    return token;
}

export function decryptGeneratedString({ keyName }: { keyName: string }) {
    if (!stringSecretKey) {
        throw new Error("Secret key is not defined.");
    }
    if (!keyName) {
        throw new Error("Key name is required.");
    }

    // Try to read from sessionStorage first
    const token = sessionStorage.getItem(keyName);

    if (!token) {
        return <Navigate to="/auth/employer/login" replace />
    }

    // Split the token into payload and secret parts
    const [encryptedPayload, encryptedSecret] = token.split(".");

    // Validate the secret part
    const decryptedSecret = CryptoJS.AES.decrypt(encryptedSecret, stringSecretKey).toString(CryptoJS.enc.Utf8);

    if (decryptedSecret !== stringSecretKey) {
        throw new Error("Invalid secret key or corrupted token.");
    }

    // Decrypt payload
    const decryptedData = CryptoJS.AES.decrypt(encryptedPayload, stringSecretKey).toString(CryptoJS.enc.Utf8);

    try {
        return JSON.parse(decryptedData); // return as JS object
    } catch {
        return decryptedData; // return as string if not JSON
    }
}

export const encryptions = (dataString: string) => {
    if (!secretKey) {
        console.error("Secret key is not defined.");
        return null;
    }

    try {
        const encryptedPayload = CryptoJS.AES.encrypt(
            dataString,
            secretKey
        ).toString();
        const encryptedSecret = CryptoJS.AES.encrypt(
            secretKey,
            secretKey
        ).toString();

        return `${encryptedPayload}.${encryptedSecret}`;
    } catch (error) {
        console.error("Encryption error:", error);
        return null;
    }
};

export function encryptData(data: any) {
    const dataStr = JSON.stringify(data);
    const encrypted = CryptoJS.AES.encrypt(dataStr, encryptionKey).toString();
    const encryptedPayload = {
        data: encrypted,
        isEncrypted: true,
    };
    return JSON.stringify(encryptedPayload);
}

export function decryptData(encryptedData: any) {
    try {
        const bytes = CryptoJS.AES.decrypt(encryptedData, encryptionKey);
        const decryptedText = bytes.toString(CryptoJS.enc.Utf8);

        if (!decryptedText) {
            throw new Error("Invalid decryption key or data.");
        }

        return JSON.parse(decryptedText);
    } catch (error) {
        console.error("Decryption failed:", error);
        return null; // Handle decryption failure gracefully
    }
}

// const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), key).toString()

export const decodeToken = (token = "") => {

    if (!token) {
        return null;
    }

    if (!secretKey) {
        throw new Error("Secret key is not defined.");
    }

    try {
        const [encryptedPayload, encryptedSecret] = token?.split(".");

        // Decrypt the payload and secret key
        const decryptedPayloadBytes = CryptoJS.AES.decrypt(
            encryptedPayload,
            secretKey
        );
        const decryptedSecretBytes = CryptoJS.AES.decrypt(
            encryptedSecret,
            secretKey
        );

        const decryptedPayload = decryptedPayloadBytes.toString(CryptoJS.enc.Utf8);
        const decryptedSecret = decryptedSecretBytes.toString(CryptoJS.enc.Utf8);

        if (decryptedSecret !== secretKey) {
            console.error("Invalid token: secret key does not match");
            return null;
        }

        return JSON.parse(decryptedPayload);
    } catch (error) {
        console.error("Invalid token format or decoding error:", error);
        return null;
    }
};

export const getCookie = (name: string) => {
    if (typeof document !== "undefined") {
        const match = document.cookie.match(
            new RegExp("(^| )" + name + "=([^;]+)")
        );
        if (match) {
            return match[2];
        }
    }
    return null;
};

export const currentUser = () => {
    let mainToken = "";
    const cookieToken = getCookie(securityKey) || "";
    if (typeof sessionStorage !== "undefined") {
        const sessionStorageToken = sessionStorage.getItem(securityKey) || "";
        if (cookieToken) {
            mainToken = cookieToken;
        } else {
            mainToken = sessionStorageToken;
        }
    } else {
        return null;
    }
    return decodeToken(mainToken);
};

export const protectedPaths = {
    ADMIN: [
        "/admin/dashboard",
        "/admin/employee/*",
        "/admin/employer/*",
        "/admin/employer/jobs/*",
        "/admin/plan-management/*",
        "/admin/job-forms/*",
        "/admin/invoices/*",
        "/admin/static-content/terms-policies",
        "/admin/change-password",
    ],

    EMPLOYER: [
        "/employer/dashboard",
        "/employer/jobs/*",
        "/employer/plans/*",
        "/employer/profile/*",
        "/employer/change-password/*",
        "/employer/static-content/*",
        "/employer/stable-information/*",
        "/employer/stable-form/*",
        "/employer/saved-drafts/*",
        "/employer/saved-drafts/drafts",
        "/employer/saved-drafts/drafts/*",
    ],
};

export const matchPath = (patterns: string[], pathname: string) => {
    return patterns.some((pattern) => {
        if (pattern === "*") return true;
        if (pattern.endsWith("/*")) {
            const base = pattern.replace("/*", "");
            return pathname.startsWith(base);
        }
        return pathname === pattern;
    });
};

//proctected route middleware

// export const ProtectedMiddleware = ({ children }: { children: ReactNode }) => {
//     const token: any = sessionStorage.getItem(import.meta.env.VITE_SECURITY_KEY);
//     const location = useLocation();

//     if (!token) {
//         return <Navigate to={authStaticRoutes.login(roles.EMPLOYER)} replace />;
//     }

//     const userToken = decodeToken(token);
//     const userRole = decryptGeneratedString({ keyName: storageKeys.ROLE });
//     const currentPath = location.pathname;

//     try {
//         // Handle home redirect
//         if (currentPath === "/") {
//             if (userRole === roles.ADMIN) {
//                 return <Navigate to={adminStaticRoutes.toDashBoard()} replace />;
//             } else if (userRole === roles.EMPLOYER) {
//                 return <Navigate to={employerSaticRoutes.toDashboard()} replace />;
//             }
//         }

//         // Role-based route check
//         const allowedPaths = protectedPaths[userRole?.toUpperCase() as keyof typeof protectedPaths];

//         if (!matchPath(allowedPaths, currentPath)) {
//             // If user tries to access unauthorized route
//             return <Navigate to="/unauthorized" replace />;
//         }
//     } catch (error) {
//         console.error("Protected route error:", error);
//         return <Navigate to={authStaticRoutes.login(roles.EMPLOYER)} replace />;
//     }

//     return children;
// };






// export const ProtectedMiddleware = ({ children, paths }: { children: ReactNode, paths?: string }) => {
//   const token: any = sessionStorage.getItem(import.meta.env.VITE_SECURITY_KEY);

//   if (!token) {
//     return <Navigate to="/auth/employer/login" replace />
//   }

//   const userToken = decodeToken(token)
//   const userRole = decryptGeneratedString({ keyName: storageKeys.ROLE });

//   // const location = useLocation();
//   const currentPath = location.pathname;

//   try {
//     if (currentPath === "/" && userToken && userRole === roles.ADMIN) {
//       return <Navigate to="/admin/dashboard" state={{ from: currentPath }} replace />
//     } else if (currentPath === "/" && userToken && userRole === roles.EMPLOYER) {
//       return <Navigate to="/employer/dashboard" state={{ from: currentPath }} replace />
//     } else {
//       return <Navigate to="/auth/employer/login" state={{ from: currentPath }} replace />
//     }

//   } catch (error) {

//   }
//   // if (matchPath(paths, currentPath) && !isAuthenticated?.id) {
//   //   return <Navigate to={authStaticRoutes.login()} state={{ from: currentPath }} replace />;
//   // }

//   return children;
// };


// export const PublicMiddleware = ({ children, paths }) => {
//   const location = useLocation();
//   const currentPath = location.pathname;

//   if (paths.includes(currentPath) && isAuthenticated()) {
//     return <Navigate to="/dashboard" replace />;
//   }

//   return children;
// };

export const handleLogout = (navigate: string) => {
    if (typeof window !== "undefined") {
        // Clear storage
        sessionStorage.clear();
        sessionStorage.clear();

        // Clear cookies
        document.cookie = `${securityKey}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; Secure; SameSite=Lax`;

        // window.location.href = authStaticRoutes.login();

        // Show success message
        toast.success("Logout successful!");
    }
};
