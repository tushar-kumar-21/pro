import React, { useState, useRef, useEffect } from "react";
import { FaCheck } from "react-icons/fa";
import { IoMdArrowDropdown, IoMdClose } from "react-icons/io";
import { twMerge } from "tailwind-merge";
import type { FormikProps } from "formik";

interface Option {
  id: string | number;
  name: string;
  icon?: React.ReactNode;
}

interface CommonThemeSelectInputProps {
  options?: Option[];
  placeholder?: string;
  searchable?: boolean;
  multiple?: boolean;
  value?: Option | Option[];
  onChange?: (value: Option | Option[] | null) => void;
  label?: string;
  className?: string;
  formik?: FormikProps<any>;
  name?: string;
  error?: any;
  defaultValue?: any;
  disabled?: boolean;
  mandatory?: boolean;
  mainClass?: string;
}

const CommonThemeNormalInput: React.FC<CommonThemeSelectInputProps> = ({
  options = [],
  placeholder = "Select an option",
  searchable = false,
  multiple = false,
  value,
  onChange,
  label = "",
  className,
  formik,
  name = "",
  error,
  defaultValue = "",
  disabled = false,
  mandatory = false,
  mainClass = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const selectRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (defaultValue) {
      if (formik) {
        formik.setFieldValue(name, defaultValue);
      } else if (onChange) {
        onChange(defaultValue);
      }
    }
  }, [defaultValue, formik, name, onChange]);

  const selectedValue = formik
    ? formik?.values[name] || (multiple ? [] : null)
    : value || (multiple ? [] : null);

  const isError = formik?.errors[name] && formik?.touched[name];
  const errorMessage: { name: string; id: string } | undefined = isError ? formik?.errors[name] as { name: string; id: string } : undefined;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = options?.filter((option) =>
    option?.name?.toLowerCase().includes(searchTerm?.toLowerCase())
  );

  const handleSelect = (option: Option) => {
    let newValues;

    if (multiple) {
      const exists = (selectedValue as Option[])?.some((val) => val.id === option.id);
      newValues = exists
        ? (selectedValue as Option[]).filter((val) => val.id !== option.id)
        : [...(selectedValue as Option[]), option];
    } else {
      newValues = option;
    }

    if (formik) {
      formik.setFieldValue(name, newValues);
      if (onChange) onChange(option);
    } else {
      if(onChange)
      onChange(newValues);
    }

    if (!multiple) setIsOpen(false);
    setSearchTerm("");
  };

  const handleRemove = (option: Option) => {
    const newValues = (selectedValue as Option[])?.filter((val) => val.id !== option.id);
    if (formik) {
      formik.setFieldValue(name, newValues);
    } else {
      if(onChange)
      onChange(newValues);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) {
      if (e.key === "Enter" || e.key === "ArrowDown") {
        setIsOpen(true);
        setHighlightedIndex(0);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filteredOptions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : 0));
        break;
      case "Enter":
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
          handleSelect(filteredOptions[highlightedIndex]);
        }
        break;
      case "Escape":
        setIsOpen(false);
        break;
    }
  };
console.log(selectedValue);

  return (
    <div ref={selectRef} className={twMerge("relative w-full space-y-3 z-[99]", className)}>
      {label && (
        <label className="text-sm text-whitePrimary font-medium block">
          {label} {mandatory && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative">
        <div
          className={twMerge(
            "relative flex items-center border border-whitePrimary/40 rounded-md bg-greyLight py-[14px]",
            disabled && "opacity-60 cursor-not-allowed",
            mainClass
          )}
          onClick={() => {
            if (!disabled && !searchable) setIsOpen(!isOpen);
          }}
        >
          {!searchable && (
            multiple ? (
              <div className="flex flex-wrap gap-2 w-full">
                {(selectedValue as Option[])?.length > 0 ? (
                  (selectedValue as Option[])?.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-blue-100 text-primary py-1 text-sm px-2 rounded-full"
                    >
                      {item?.name}
                      <IoMdClose
                        className="ml-2 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemove(item);
                        }}
                      />
                    </div>
                  ))
                ) : (
                  <span className="text-greyDim text-sm px-2">
                    {placeholder}
                  </span>
                )}
              </div>
            ) : (
              <div
                className={`flex-1 px-2 font-normal text-sm ${selectedValue && (selectedValue as Option)?.name ? "" : "text-greyDim"}`}
              >
                {(selectedValue as Option)?.name || placeholder}
              </div>
            )
          )}

          <div className={`flex items-center ${searchable ? "w-full" : ""}`}>
            {searchable && (
              <input
                type="text"
                autoComplete="new-password"
                className="w-full text-sm px-2 outline-none bg-transparent placeholder:text-greyDim"
                placeholder={placeholder}
                value={
                  searchTerm === "" && !isOpen
                    ? multiple
                      ? (selectedValue as Option[])?.map((item) => item?.name)?.join(", ")
                      : (selectedValue as Option)?.name || ""
                    : searchTerm
                }
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsOpen(true)}
                onKeyDown={handleKeyDown}
              />
            )}
            <IoMdArrowDropdown
              size={20}
              className="text-greyDark"
              onClick={() => setIsOpen((prev) => !prev)}
            />
          </div>
        </div>

        {isOpen && (
          <div
            ref={optionsRef}
            className="absolute z-10 w-full mt-1 bg-yellowPrimary border border-greyMedium rounded-lg shadow-lg max-h-60 overflow-auto"
          >
            {filteredOptions?.length > 0 ? (
              filteredOptions?.map((option, index) => {
                const isSelected = multiple
                  ? (selectedValue as Option[])?.some((val) => val?.id === option?.id)
                  : (selectedValue as Option)?.id === option?.id;
                return (
                  <div
                    key={index}
                    className={`px-4 py-2 text-primary cursor-pointer flex items-center justify-between 
                      ${index === highlightedIndex ? "bg-blue-50 text-greyDim" : ""}
                      ${multiple &&
                        Array.isArray(selectedValue) &&
                        (selectedValue as Option[])?.some((val) => val?.id === option?.id)
                        ? "bg-gray-100 text-greyDim"
                        : ""
                      } hover:bg-gray-100`}
                    onClick={() => handleSelect(option)}
                  >
                    <div className="flex items-center gap-2">
                      {option.icon && <span className="text-primary">{option.icon}</span>}
                      <span>{option?.name}</span>
                    </div>
                    {isSelected && <span className="text-primary font-bold"><FaCheck /></span>}
                  </div>
                );
              })
            ) : (
              <div className="px-4 py-2 text-gray-500">No options found</div>
            )}
          </div>
        )}

        {errorMessage && (
          <div className="text-red-500 absolute text-xs -bottom-4 left-0 font-medium error font-content">
            {typeof errorMessage === 'string'
              ? errorMessage
              : errorMessage.name || errorMessage.id}
          </div>
        )}

        {error && (
          <div className="text-red-500 absolute text-xs -bottom-5 left-0 font-medium error font-content">
            {error?.name || error || ""}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommonThemeNormalInput;