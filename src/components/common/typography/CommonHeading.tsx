import React from "react";
import { twMerge } from "tailwind-merge";

type VariantType = "primary" | "secondry" | "tertiary";

interface CommonHeadingProps {
    heading: string;
    subheading?: string;
    headingClassName?: string;
    variant?: VariantType;
    badgeLabel?: string;
    showbadge?: boolean;
    className?: string;
}

const variants: Record<
    VariantType,
    {
        heading: string;
        subheading: string;
    }
> = {
    primary: {
        heading: "text-black text-[20px] font-semibold",
        subheading: "font-normal text-[14px] text-greyPrimary",
    },
    secondry: {
        heading: "font-bold text-sm text-black",
        subheading: "font-normal text-sm text-gray-500",
    },
    tertiary: {
        heading: "text-black text-[18px] font-semibold",
        subheading: "font-normal text-[12px] text-white",
    },
};

function CommonHeading({
    heading,
    subheading,
    headingClassName = "",
    variant = "primary",
    badgeLabel = "",
    showbadge = false,
    className = "",
}: CommonHeadingProps) {
    return (
        <div className={twMerge("flex flex-col gap-[4px] min-w-[60px]", className)}>
            <h1 className={twMerge(variants[variant].heading, headingClassName)}>
                {heading}{" "}
                {showbadge && (
                    <span className="font-medium text-[12px] bg-skyblue-primary px-[8px] py-[2px] rounded-[16px]">
                        {badgeLabel}
                    </span>
                )}
            </h1>

            {subheading && (
                <h2 className={variants[variant].subheading}>{subheading}</h2>
            )}
        </div>
    );
}

export default CommonHeading;
