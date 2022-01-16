import Image from 'next/image';
import { CSSProperties, useEffect, useState } from 'react';
import { useWindowDimensions } from '../utils/dom';
import styles from './shared.module.css';

export const ImageText = ({
    heading,
    image,
    reverse = false,
    wrapperStyle = {},
    imageSmall = false,
    children }: {
        heading?: string,
        children: any,
        image: string,
        reverse?: boolean,
        imageSmall?: boolean
        wrapperStyle?: CSSProperties,
    }) => {
    const { isMobile, isSmallScreen, windowWidth, windowHeight } = useWindowDimensions();
    const [state, setState] = useState({
        wrapperStyle: {}, imageWidth: 320, imageHeight: 320,
        box1Style: {},
        box2Style: {},
    });

    useEffect(() => {
        setState({
            wrapperStyle: {
                ...{
                    flexDirection: isSmallScreen ? 'column' : reverse ? 'row-reverse' : 'row',
                    margin: '2rem 1rem',
                },
                ...wrapperStyle,
            },
            imageWidth: imageSmall ? 320 : windowWidth,
            imageHeight: isSmallScreen ? 320 : imageSmall ? 320 : windowHeight,
            box1Style: {
                padding: isMobile ? '1rem' :
                    isSmallScreen ? '0 2rem 2rem 2rem' : '0 2.5rem 2.5rem 2.5rem',
                flex: isSmallScreen ? '100%' : '30%',
            },
            box2Style: {
                flex: isSmallScreen ? '100%' : '70%',
            },
        });
    }, [isMobile, isSmallScreen, windowWidth, windowHeight]);

    return (
        <section style={{ display: 'flex', ...state.wrapperStyle, }}>
            <div style={state.box1Style}>
                {heading && <h2 style={{ fontSize: '2.25rem', marginTop: 0 }}>{heading}</h2>}
                <div className={styles.readable}>
                    {children}
                </div>
            </div>
            <div style={state.box2Style}>
                <Image src={image} width={state.imageWidth} height={state.imageHeight}
                    alt={heading || children.toString()} />
            </div>
        </section>
    )
}