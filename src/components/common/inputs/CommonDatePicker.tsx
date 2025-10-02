import React, { useRef } from "react";
import { FaRegCalendarDays } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";
import type { FormikProps } from "formik";

interface DatePickerProps {
  label?: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  formik?: FormikProps<any>;
  className?: string;
  min?: string;
  max?: string;
  placeholder?: string;
  inputClass?: string;
  placeholderClass?: string;
  readOnly?:boolean;
}

const DatePicker: React.FC<DatePickerProps> = ({
  label = "",
  name = "",
  value,
  onChange,
  error,
  formik,
  className = "",
  min = new Date().toISOString().split("T")[0],
  max = "",
  placeholder,
  inputClass = "",
  placeholderClass = "",
  readOnly = false,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const fieldProps = formik?.getFieldProps(name);
  const fieldValue = formik ? fieldProps?.value : value;
  const isValueEmpty = !fieldValue;

  const errorMessage = formik
    ? formik.touched[name] && formik.errors[name]
    : error;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formik && fieldProps) {
      fieldProps.onChange(e);
    } else if (onChange) {
      onChange(e);
    }
  };

  const handleOpenPicker = () => {
    inputRef.current?.showPicker?.();
  };

  return (
    <div className={twMerge("w-full space-y-3", className)}>
      {label && (
        <label className="text-sm block text-whitePrimary font-medium">
          {label}
        </label>
      )}
      <div className="relative w-full">
        <input
          ref={inputRef}
          type="date"
          name={name}
          readOnly={readOnly}
          value={fieldValue}
          onChange={handleChange}
          min={min}
          max={max}
          className={twMerge(
            "w-full cursor-pointer px-4 py-3 border-1 border-whitePrimary/40 appearance-none  bg-greyLight rounded-md focus:outline-none",
            isValueEmpty && "text-transparent",
            inputClass
          )}
        />
        {isValueEmpty && (
          <span
            className={twMerge(
              "absolute left-3 top-4 text-greyPrimary text-sm font-normal select-none pointer-events-none",
              placeholderClass
            )}
          >
            {placeholder}
          </span>
        )}

        <FaRegCalendarDays className="w-5 h-5 text-white absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />

        <button
          type="button"
          onClick={handleOpenPicker}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />

        {errorMessage && (
          <div className="text-red-500 text-xs font-medium absolute -bottom-5 left-0">
            {errorMessage as string}
          </div>
        )}
      </div>
    </div>
  );
};

export default DatePicker;
