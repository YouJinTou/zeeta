import { useContext, useEffect, useState } from "react";
import Image from 'next/image';
import { useWindowDimensions } from "../utils/dom";
import { createParallaxOptions } from "../utils/css";
import styles from './shared.module.css';
import { ThemeContext } from "./theme";

export const Banner = ({ text, imagePath, withMarginTop = true, parallax = false,
    textFadeIn = true, unoptimized = false, }: {
        text?: string, imagePath?: string, withMarginTop?: boolean,
        parallax?: boolean,
        textFadeIn?: boolean,
        unoptimized?: boolean,
    }) => {
    const theme = useContext(ThemeContext);
    const { isMobile, windowWidth } = useWindowDimensions();
    const [state, setState] = useState({
        containerMargin: '1rem',
        imageWidth: 0,
        imageHeight: 0,
        textSize: '2rem',
    });

    useEffect(() => {
        setState({
            containerMargin: isMobile ? '1rem' : '2rem',
            imageWidth: imagePath ? windowWidth : 0,
            imageHeight: imagePath ?
                isMobile ? 200 : 500 :
                0,
            textSize: isMobile ? '2rem' : '5rem',
        })
    }, [isMobile, imagePath, windowWidth]);

    return (
        <section style={{
            marginTop: withMarginTop ? state.containerMargin : 0,
            marginBottom: state.containerMargin,
            position: 'relative',
            textAlign: 'center',
            ...(parallax && createParallaxOptions({ imagePath, height: state.imageHeight }))
        }}>
            {imagePath && !parallax &&
                <Image src={imagePath} width={state.imageWidth}
                    unoptimized={unoptimized}
                    height={state.imageHeight} alt='banner' />}
            {text &&
                <h1 className={textFadeIn ? styles.textFadeIn : ''}
                    style={{
                        color: theme.textOnImageColor,
                        fontSize: state.textSize,
                        position: imagePath ? 'absolute' : 'inherit',
                        top: imagePath ? '50%' : '',
                        left: imagePath ? '50%' : '',
                        transform: 'translate(-50%, -50%)',
                        margin: 0,
                        fontWeight: 400,
                    }}>{text}</h1>}
        </section>
    )
}