import { ReactNode } from "react";

type Props = {
    children: ReactNode;
    className?: string;
    action: () => void;
}

export default function Button({ children, action, className }: Props) {
    return (
        <button className={`${className}`} onClick={action}>
            {children}
        </button>
    )
}