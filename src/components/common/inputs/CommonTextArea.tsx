"use client";

import React, { useEffect } from "react";
import { twMerge } from "tailwind-merge";
import type { FieldInputProps, FormikProps } from "formik";

interface CommonThemeTextAreaProps {
  rows?: number;
  cols?: number;
  label?: string;
  placeholder?: string;
  mainClass?: string;
  inputClass?: string;
  id?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  name?: string;
  formik?: FormikProps<any>;
  error?: string;
  className?: string;
  mandatory?: boolean;
  readOnly?:boolean
}


const CommonThemeTextArea: React.FC<CommonThemeTextAreaProps> = ({
  rows = 4,
  cols = 50,
  label = "",
  placeholder = "",
  mainClass = "",
  inputClass = "",
  id = "",
  onChange,
  value = "",
  defaultValue = "",
  disabled = false,
  name = "",
  formik,
  error,
  className = "",
  mandatory = false,
  readOnly = false,
}) => {
  useEffect(() => {
    if (defaultValue && formik) {
      formik.setFieldValue(name, defaultValue);
    }
  }, [defaultValue, formik, name]);

  const fieldProps: FieldInputProps<any> | undefined = formik?.getFieldProps?.(name!);

  const isError =
    formik?.errors?.[name!] && formik?.touched?.[name!];
  const inputValue = formik ? formik.values?.[name!] : value;
  const errorMessage = isError ? formik?.errors?.[name!] : undefined;

  return (
    <div className="relative flex flex-col h-fit space-y-3 w-full">
      <label htmlFor={id} className={twMerge("text-sm text-whitePrimary font-medium", className)}>
        {label} {mandatory && <span className="text-red-500">*</span>}
      </label>

      <div className="rounded-md w-full overflow-hidden">
        <textarea
          rows={rows}
          cols={cols}
          id={id}
          placeholder={placeholder}
          {...(formik && fieldProps ? fieldProps : {})}
          onChange={(e) => {
            onChange?.(e);
            formik?.handleChange(e);
          }}
          readOnly={readOnly}
          value={inputValue || ""}
          disabled={disabled}
          className={twMerge(
            "outline-none resize-none rounded-md text-base border border-white/40 font-content w-full  px-2 py-[12.8px] placeholder:text-greyPrimary placeholder:text-sm",
            inputClass
          )}
        />

        {typeof errorMessage === "string" && (
          <div className="text-red-500 text-xs font-medium absolute -bottom-3 left-0">
            {errorMessage}
          </div>
        )}

        {typeof error === "string" && (
          <div className="text-red-500 text-xs font-medium absolute -bottom-3 left-0">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommonThemeTextArea;
