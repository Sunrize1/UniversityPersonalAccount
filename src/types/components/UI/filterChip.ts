import React, { ReactNode } from "react";

export interface FilterChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: string;
    onClick: () => void;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    variant?: 'primary' | 'outline';
}