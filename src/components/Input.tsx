import React, { useState } from "react";

interface InputProps {
    type: string;
    label: string;
    name: string;
    value: string | number | any;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
}

const Input: React.FC<InputProps> = ({
    type,
    label,
    name,
    value,
    onChange,
    required,
    minLength,
    maxLength,
    pattern,
}) => {
    const [error, setError] = useState("");

    const validateInput = () => {
        let errorMessage = "";
        if (required && value.trim() === "") {
            errorMessage = "This field is required";
        }
        if (minLength && value.trim().length < minLength) {
            errorMessage = `Minimum length should be ${minLength}`;
        }
        if (maxLength && value.trim().length > maxLength) {
            errorMessage = `Maximum length should be ${maxLength}`;
        }
        if (pattern && !RegExp(pattern).test(value)) {
            errorMessage = "Invalid format";
        }
        if (name === "age" && value.trim() !== "" && isNaN(Number(value))) {
            errorMessage = "Age must be a number";
        }
        setError(errorMessage);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e);
        validateInput();
    };

    return (
        <div className="flex flex-col">
            <label htmlFor={name}>{label}</label>
            <input
                type={type}
                name={name}
                className="px-2 py-1"
                value={value}
                onChange={handleChange}
            />
            <div className="px-4 h-5 w-[15rem]">
                <span className="text-red-500">{error}</span>
            </div>
        </div>
    );
};

export default Input;