import React, { useState, useRef, useEffect } from "react";
import { FaCheck } from "react-icons/fa";
import { IoMdArrowDropdown, IoMdClose } from "react-icons/io";
import { twMerge } from "tailwind-merge";
import type { FormikProps } from "formik";

interface Option {
  optionId: string | number; // ✅ changed from id → optionId
  name: string;
  icon?: string;
}

interface CommonThemeSelectInputProps {
  options?: Option[];
  placeholder?: string;
  searchable?: boolean;
  multiple?: boolean;
  value?: Option[];
  onChange?: (value: Option[]) => void;
  label?: string;
  className?: string;
  formik?: any;
  name?: string;
  error?: any;
  defaultValue?: any;
  disabled?: boolean;
  mandatory?: boolean;
  mainClass?: string;
}

const CommonThemeSelectInput: React.FC<CommonThemeSelectInputProps> = ({
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
  mainClass = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const selectRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);

  // Always work with arrays
  const selectedValue: Option[] = formik
    ? formik?.values[name] || []
    : (value as Option[]) || [];

  useEffect(() => {
    if (defaultValue) {
      const defaultArr = Array.isArray(defaultValue)
        ? defaultValue
        : [defaultValue];
      if (formik) {
        formik.setFieldValue(name, defaultArr);
      } else if (onChange) {
        onChange(defaultArr);
      }
    }
  }, [defaultValue, formik, name, onChange]);

  const isError = formik?.errors[name] && formik?.touched[name];
  const errorMessage: { name: string; optionId: string } | undefined = isError
    ? (formik?.errors[name] as { name: string; optionId: string })
    : undefined;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
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
    let newValues: Option[];

    if (multiple) {
      const exists = selectedValue?.some(
        (val) => val.optionId === option.optionId
      );
      newValues = exists
        ? selectedValue.filter((val) => val.optionId !== option.optionId)
        : [...selectedValue, option];
    } else {
      // Always wrap in array
      newValues = [option];
    }

    if (formik) {
      formik.setFieldValue(name, newValues);
    }
    if (onChange) onChange(newValues);

    if (!multiple) setIsOpen(false);
    setSearchTerm("");
  };

  const handleRemove = (option: Option) => {
    const newValues = selectedValue?.filter(
      (val) => val.optionId !== option.optionId
    );
    if (formik) {
      formik.setFieldValue(name, newValues);
    } else {
      if (onChange) onChange(newValues);
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
        if (
          highlightedIndex >= 0 &&
          highlightedIndex < filteredOptions.length
        ) {
          handleSelect(filteredOptions[highlightedIndex]);
        }
        break;
      case "Escape":
        setIsOpen(false);
        break;
    }
  };

  return (
    <div
      ref={selectRef}
      className={twMerge("relative w-full space-y-3", className)}
    >
      {label && (
        <label className="text-sm text-black font-medium block">
          {label} {mandatory && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative">
        <div
          className={twMerge(
            "relative flex items-center border border-greyDim rounded-md py-[14px]",
            disabled && "opacity-60 cursor-not-allowed",
            mainClass
          )}
          onClick={() => {
            if (!disabled && !searchable) setIsOpen(!isOpen);
          }}
        >
          {!searchable &&
            (multiple ? (
              <div className="flex flex-wrap gap-2 w-full">
                {selectedValue?.length > 0 ? (
                  selectedValue?.map((item, index) => (
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
                className={`flex-1 px-2 font-normal text-sm text-black ${
                  selectedValue.length > 0 ? "" : "text-greyDim"
                }`}
              >
                {selectedValue[0]?.name || placeholder}
              </div>
            ))}

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
                      ? selectedValue?.map((item) => item?.name)?.join(", ")
                      : selectedValue[0]?.name || ""
                    : searchTerm
                }
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsOpen(true)}
                onKeyDown={handleKeyDown}
              />
            )}
            <IoMdArrowDropdown
              size={20}
              className="text-white/40"
              onClick={() => setIsOpen((prev) => !prev)}
            />
          </div>
        </div>

        {isOpen && (
          <div
            ref={optionsRef}
            className="absolute z-20 w-full mt-1 bg-orangePrimary border rounded-lg shadow-lg max-h-60 overflow-auto"
          >
            {filteredOptions?.length > 0 ? (
              filteredOptions?.map((option, index) => {
                const isSelected = selectedValue?.some(
                  (val) => val?.optionId === option?.optionId
                );
                return (
                  <div
                    key={index}
                    className={`px-4 py-2 transition-colors text-primary cursor-pointer flex items-center justify-between 
                      ${
                        index === highlightedIndex
                          ? "bg-blue-50 text-greyDim"
                          : ""
                      }
                      ${isSelected ? "bg-orangeDim !text-black" : ""} 
                      hover:bg-orangeDim hover:text-black`}
                    onClick={() => handleSelect(option)}
                  >
                    <span>{option?.name}</span>
                    {isSelected && (
                      <span className="text-primary font-bold">
                        <FaCheck />
                      </span>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="px-4 py-2 text-whitePrimary">No options found</div>
            )}
          </div>
        )}

        {errorMessage && (
          <div className="text-red-500 absolute text-xs -bottom-4 left-0 font-medium error font-content">
            {typeof errorMessage === "string"
              ? errorMessage
              : errorMessage.name || errorMessage.optionId}
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

export default CommonThemeSelectInput;
