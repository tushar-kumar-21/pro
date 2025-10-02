import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { FaEye, FaEyeSlash, FaRegUser } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

interface CommonThemeInputProps {
  label?: string;
  type?: string;
  placeholder?: string;
  mainClass?: string;
  inputClass?: string;
  id?: string;
  onChange?: (e: any) => void;
  showEye?: boolean;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  name?: string;
  formik?: any;
  className?: string;
  onKeyDown?: (e: any) => void;
  error?: string;
  countryCodeCheck?: boolean;
  mandatory?: boolean;
  countryCodeDefault?: string;
  showProfileIcon?: boolean;
  readOnly?: boolean;
  rightAddon?: React.ReactNode;
}

const CommonThemeInput: React.FC<CommonThemeInputProps> = ({
  label = "",
  type = "text",
  placeholder = "",
  mainClass = "",
  inputClass = "",
  id = "",
  onChange,
  showEye = false,
  value = "",
  defaultValue = "",
  disabled = false,
  name = "",
  formik,
  className,
  onKeyDown,
  error = "",
  countryCodeCheck = false,
  mandatory = false,
  countryCodeDefault = "us",
  showProfileIcon = false,
  readOnly = false,
  rightAddon,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);

  useEffect(() => {
    if (defaultValue) {
      formik?.setFieldValue(name, defaultValue);
    }
  }, [defaultValue]);

  const fieldProps = formik ? formik.getFieldProps(name) : {};
  const isError = formik?.errors && formik?.touched && formik?.touched[name];
  const errorMessage = isError ? formik.errors[name] : undefined;
  const inputValue = formik ? formik?.values[name] : value;

  return (
    <div className={twMerge("w-full space-y-3 h-fit", mainClass)}>
      {label && (
        <label
          htmlFor={id}
          className={twMerge(
            "text-sm text-black font-medium block",
            className
          )}
        >
          {label} {mandatory && <span className="text-red-500">*</span>}
        </label>
      )}

      <div
        className={`rounded-md relative w-full ${
          countryCodeCheck ? "flex" : ""
        }`}
      >
        {countryCodeCheck ? (
          <PhoneInput
            country={countryCodeDefault}
            value={inputValue}
            onChange={(phone) => {
              const formattedPhone = phone.startsWith("+") ? phone : `+${phone}`;
              formik?.setFieldValue(name, formattedPhone);
              if (!formik?.touched[name]) {
                formik?.setFieldTouched(name, true, false);
              }
              onChange && onChange(formattedPhone);
            }}
            inputClass={twMerge(
              "!w-full !border-whitePrimary !bg-transparent !rounded-md !py-6 !text-white",
              inputClass
            )}
            inputProps={{
              name: name,
              disabled: disabled,
              id: id,
              placeholder: placeholder,
              readOnly: readOnly,
            }}
            specialLabel=""
            enableSearch
          />
        ) : (
          <div className="relative w-full">
            <input
              type={showEye ? (showPassword ? "text" : "password") : type}
              name={name}
              id={id}
              {...(formik ? fieldProps : {})}
              onChange={(e) => {
                onChange && onChange(e);
                formik?.handleChange(e);
              }}
              readOnly={readOnly}
              onKeyDown={onKeyDown}
              disabled={disabled}
              placeholder={placeholder}
              value={inputValue}
              className={twMerge(
                "border border-greyDim disabled:cursor-not-allowed disabled:opacity-60 text-greyPrimary outline-none px-2 rounded-md placeholder:text-sm placeholder:font-normal placeholder:text-greyDim text-base bg-greyLight caret-greyPrimary font-content py-3 w-full",
                type === "date" && "appearance-auto pr-2",
                rightAddon && "pr-10",
                inputClass
              )}
            />
            {rightAddon && (
              <div className="absolute bg-whiteSecondary inset-y-0 right-0 px-3 rounded-r-md flex items-center pointer-events-none border border-greyDim">
                <span className="text-black sm:text-sm">{rightAddon}</span>
              </div>
            )}
          </div>
        )}

        {showEye && !countryCodeCheck && (
          <span
            onClick={togglePassword}
            className="absolute cursor-pointer top-[15px] right-4"
          >
            {showPassword ? (
              <FaEye className="h-4 w-4 text-greyPrimary" />
            ) : (
              <FaEyeSlash className="h-4 w-4 text-greyPrimary" />
            )}
          </span>
        )}

        {showProfileIcon && !countryCodeCheck && (
          <FaRegUser className="h-4 w-4 text-greyPrimary absolute top-[15px] right-4" />
        )}

        {errorMessage && typeof errorMessage === "string" && (
          <div className="text-red-500 absolute text-xs -bottom-4 left-0 font-medium">
            {errorMessage}
          </div>
        )}

        {error && (
          <div className="text-red-500 absolute text-xs -bottom-4 left-0 font-medium">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommonThemeInput;