import { useEffect, useState } from "preact/hooks";
import getBreakpointMode from "../utils/getBreakpointMode";


export const useBreakpointMode = () => {
    const [ mode, setMode ] = useState(getBreakpointMode());

    useEffect(() => {
        const onResizeHandler = e => {
            setMode(getBreakpointMode());
        }
        window.addEventListener("resize", onResizeHandler);
        return () => {
            window.removeEventListener("resize", onResizeHandler);
        }
    })
    return mode;
}