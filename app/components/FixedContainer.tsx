import { ReactNode } from "react"

type Props = {
    children: ReactNode;
}

export default function FixedContainer({ children }: Props) {
    return <div className="min-w-full flex justify-center">
        <div className="w-full max-w-[1024px]">
            {children}
        </div>
    </div>
}