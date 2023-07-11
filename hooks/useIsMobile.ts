import { useEffect, useState } from "react";

const useIsMobile = () => {
    const [hasTouchScreen, setHasTouchScreen] = useState(false);
    useEffect(() => {
        if (navigator && "maxTouchPoints" in navigator) {
            setHasTouchScreen(navigator.maxTouchPoints > 0);
        } else if (navigator && "msMaxTouchPoints" in navigator) {
            setHasTouchScreen(navigator.msMaxTouchPoints > 0);
        } else if(navigator) {
            const mQ = matchMedia?.("(pointer:coarse)");
            if (mQ?.media === "(pointer:coarse)") {
                setHasTouchScreen(!!mQ.matches);
            } else if ("orientation" in window) {
                setHasTouchScreen(true); // deprecated, but good fallback
            } else {
                // Only as a last resort, fall back to user agent sniffing
                const UA = navigator.userAgent;
                setHasTouchScreen(
                    /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
                    /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA)
                );
            }
        }
    }, []);
    return { isMobile: hasTouchScreen }
}

export default useIsMobile;
