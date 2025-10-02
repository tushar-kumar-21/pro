import React, { Suspense } from "react";
import { twMerge } from "tailwind-merge";
import { RxCross2 } from "react-icons/rx";
import CommonButton from "../buttons/CommonButton";
import { FaTrashAlt } from "react-icons/fa";
import { motion } from 'framer-motion';

interface ModalWrapperProps {
    label?: string;
    warningHeadline1?: string;
    warningHeadline2?: string;
    icon?: React.ReactNode;
    children?: React.ReactNode;
    className?: string;
    closeFunc?: () => void;
    onClick?: () => void;
    warning?: boolean;
    overlayClass?: string;
    isLoading?: boolean;
    downloadBtn?: boolean;
    submitFunc?: () => void;
    downloadFunc?: () => void;
    removeDownloadBtn?: boolean;
}


const ModalWrapper: React.FC<ModalWrapperProps> = ({
    label = "",
    warningHeadline1 = "",
    warningHeadline2 = "",
    icon = <FaTrashAlt />,
    children,
    className,
    closeFunc,
    onClick,
    warning = false,
    overlayClass,
    isLoading = false,
    downloadBtn = true,
    submitFunc,
    downloadFunc,
    removeDownloadBtn = false,
}) => {

    const modalVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 50 },
    };

    return warning ? (
        <Suspense fallback={<div></div>}>
            <motion.div
                className={twMerge(
                    "bg-whitePrimary fade-up-modal rounded-xl fixed inset-0 m-auto z-[999] aspect-[1.4/1] w-fit h-fit max-h-[700px] max-w-screen-xl grid place-items-center",
                    className
                )}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={modalVariants}
                transition={{ duration: 0.5 }}
            >
                <div className="relative -top-10 space-y-6 px-10">
                    <div className="size-20 border-2 mx-auto border-red-secondary rounded-full bg-red-primary grid place-items-center">
                        <span className="text-white text-2xl">{icon}</span>
                    </div>
                    <div className="text-center space-y-2">
                        <h2 className="text-2xl text-black-primary font-semibold">
                            {label}
                        </h2>
                        <p className="text-sm text-greyDark font-semibold">
                            {warningHeadline1}
                        </p>
                        {warningHeadline2 && (
                            <p className="text-xs text-red-primary font-medium">
                                {warningHeadline2}
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex items-center relative top-[5px] w-full gap-4 px-4 py-3 rounded-b-xl bg-lightWhite">
                    <CommonButton
                        label="Go Back"
                        variant="secondary"
                        onClick={closeFunc}
                    />
                    <CommonButton
                        label="Yes"
                        variant="red-primary"
                        onClick={onClick}
                        loading={isLoading}
                    />
                </div>
            </motion.div>
            <div className="fixed backdrop-blur-md w-full h-full bg-lightBlack z-[999] top-0 left-0" />
        </Suspense>
    ) : (
        <>
            <motion.div
                className={twMerge(
                    "bg-whitePrimary shadow-lg rounded-xl fixed inset-0 m-auto z-[99999] h-fit max-h-[500px] w-fit max-w-[90%] min-w-[30%] p-5 space-y-4 overflow-y-auto fade-up-modal",
                    className
                )}
                id="modalWrapper"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={modalVariants}
                transition={{ duration: 0.5 }}
            >
                <div>{children}</div>
                <RxCross2 className="text-yellowPrimary cursor-pointer absolute top-3 right-3"
                    onClick={closeFunc}
                />
            </motion.div>
            <div
                onClick={closeFunc}
                className={twMerge(
                    "fixed w-full h-full bg-lightBlack z-[999] top-0 left-0",
                    overlayClass
                )}
            />
        </>
    );
};

export default ModalWrapper;
