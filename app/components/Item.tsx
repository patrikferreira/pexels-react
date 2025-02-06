import { ReactNode } from "react"

type Props = {
    children: ReactNode;
}

export default function Item({ children }: Props) {
    return (
        <div className="contents">
            {children}
        </div>
    )
}