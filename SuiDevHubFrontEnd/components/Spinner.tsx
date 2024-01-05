import { twMerge } from "tailwind-merge"

type SpinnerSize = "8" | "16"

type SpinnerProps = {
    size?: SpinnerSize
}

const SIZES: Record<SpinnerSize, string> = {
    "8": "w-8 h-8",
    "16": "w-16 h-16"
}

export const Spinner = ({ size }: SpinnerProps) => {

    return (
        <div
            className={twMerge(
                "relative animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-success motion-reduce:animate-[spin_1.5s_linear_infinite]",
                SIZES[size ?? "16"])}
            role="status">
            <span className="absolute overflow-hidden whitespace-nowrap border-0 p-0 [clip:rect(0,0,0,0)]">Loading...</span>
        </div>
    )
}

export const CenteredSpinner = (props: SpinnerProps) => {
    return (
        <div className="fixed left-1/2 top-1/2 flex items-center justify-center">
            <Spinner {...props} />
        </div>
    )
}

export const OverlayCenteredSpinner = (props: SpinnerProps) =>
    <div className="w-screen h-screen absolute z-10">
        <CenteredSpinner {...props} />
    </div>