import React from 'react';
import { createPortal } from "react-dom";
import CompanyModalContent from "./CompanyModalContent";

const parent = document.getElementById("root")

export default function CompanyPortal({isOpen, onClose}) {
    if (!isOpen) return null
    return createPortal(
        <div>
            <CompanyModalContent onClose={onClose}/>
        </div>,
        parent)
}