import { ReactNode } from "react";

type Props = {
    content: ReactNode;
    className?: string;
    action: () => void;
}

export default function Button({ content, action, className }: Props) {
    return (
        <button className={`${className}`} onClick={action}>
            {content}
        </button>
    )
}