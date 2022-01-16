import { useEffect, useState } from "react";

//https://stackoverflow.com/questions/36862334/get-viewport-window-height-in-reactjs
function getWindowDimensions() {
    let w;

    if (typeof window === 'undefined') {
        w = {
            innerWidth: 1024,
            innerHeight: 768,
        };
    } else {
        w = window;
    }

    const { innerWidth: windowWidth, innerHeight: windowHeight } = w;
    const result = {
        windowWidth: windowWidth,
        windowHeight: windowHeight,
        isMobile: windowWidth <= 480,
        isSmallScreen: windowWidth < 768,
        isBigScreen: windowWidth >= 768,
        isDesktop: windowWidth >= 1024,
        isLargeDesktop: windowWidth >= 1280,
    }
    return result;
}

export const useWindowDimensions = () => {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
}

export const useOnScreen = (ref: any) => {

    const [isIntersecting, setIntersecting] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIntersecting(entry.isIntersecting)
        );
        observer.observe(ref.current)
        // Remove the observer as soon as the component is unmounted
        return () => { observer.disconnect() }
    }, [])

    return isIntersecting
}

export const onOutsideClick = (ref: any, callback: () => void) => {
    useEffect(() => {
        const onClick = (e: any) => {
            if (ref.current && !ref.current.contains(e.target)) {
                callback();
            }
        };

        document.addEventListener("mousedown", onClick);

        return () => {
            document.removeEventListener("mousedown", onClick);
        };
    }, [callback, ref]);
};