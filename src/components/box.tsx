import { CSSProperties, useContext, useEffect, useState } from "react"
import { useWindowDimensions } from "../utils/dom";
import styles from './shared.module.css';
import { ThemeContext } from "./theme";

export const Box = ({
    heading,
    subheading,
    children,
    wrapperStyle = {} }: {
        heading?: string,
        subheading?: string,
        children: any,
        wrapperStyle?: CSSProperties
    }) => {
    const { isMobile } = useWindowDimensions();
    const [state, setState] = useState({
        wrapperStyle: {}
    });
    const theme = useContext(ThemeContext);

    useEffect(() => {
        setState({
            ...state,
            wrapperStyle: {
                display: 'flex',
                justifyContent: isMobile ? 'center' : 'space-evenly',
                alignItems: 'center',
                flexDirection: isMobile ? 'column' : 'row',
                flexWrap: isMobile ? 'initial' : 'wrap',
                ...wrapperStyle,
            },
        })
    }, [isMobile]);

    return (
        <section style={{
            backgroundColor: theme.neutralColor,
            textAlign: 'center'
        }}>
            {heading && <h2 style={{ fontSize: '2.5rem', marginTop: 0 }}>{heading}</h2>}
            {subheading && <h3 style={{ fontSize: '1.5rem', marginTop: 0 }}>{subheading}</h3>}
            <div className={styles.m1r} style={{
                padding: '1rem',
                backgroundColor: theme.neutralColor,
                ...state.wrapperStyle,
            }}>
                {children}
            </div>
        </section>
    )
}