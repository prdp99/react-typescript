import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt, faPlus, faSave, faFileExport } from "@fortawesome/free-solid-svg-icons";

interface ButtonProps {
    label: string;
    type: "button" | "submit" | "reset";
    buttonType?: "edit" | "delete" | "add" | "save" | "export";
    onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
    label,
    type,
    buttonType = "default",
    onClick,
}) => {
    let buttonClass;
    let icon;
    switch (buttonType) {
        case "edit":
            buttonClass =
                "bg-black rounded-sm text-white px-3 py-1 hover:bg-gray-800 transition duration-300 ease-in-out";
            icon = <FontAwesomeIcon icon={faEdit} className="mr-1" />;
            break;
        case "delete":
            buttonClass =
                "bg-red-700 rounded-sm text-white px-3 py-1 hover:bg-red-800 transition duration-300 ease-in-out";
            icon = <FontAwesomeIcon icon={faTrashAlt} className="mr-1" />;
            break;
        case "add":
            buttonClass =
                "bg-black rounded-sm text-white px-3 py-1 hover:bg-gray-800 transition duration-300 ease-in-out";
            icon = <FontAwesomeIcon icon={faPlus} className="mr-1" />;
            break;
        case "save":
            buttonClass =
                "bg-black rounded-sm text-white px-3 py-1 hover:bg-gray-800 transition duration-300 ease-in-out";
            icon = <FontAwesomeIcon icon={faSave} className="mr-1" />;
            break;
        case "export":
            buttonClass =
                "bg-black rounded-sm text-white px-3 py-1 hover:bg-gray-800 transition duration-300 ease-in-out";
            icon = <FontAwesomeIcon icon={faFileExport} className="mr-1" />;
            break;
        default:
            buttonClass =
                "bg-black rounded-sm text-white px-3 py-1 hover:bg-gray-800 transition duration-300 ease-in-out";
            break;
    }

    return (
        <button type={type} className={buttonClass} onClick={onClick}>
            {icon}
            {label}
        </button>
    );
};

export default Button;