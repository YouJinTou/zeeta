import { CSSProperties, useContext, useEffect, useState } from "react"
import { HoverEffect } from "./effects";
import { ThemeContext } from "./theme";

export interface BtnProps {
    wide?: boolean,
    upperCase?: boolean,
    wideLetters?: boolean,
    bold?: boolean,
    hoverEffect?: HoverEffect,
    color?: string,
    backgroundColor?: string,
    backgroundChangeColor?: string,
    colorChangeColor?: string,
    children?: any
}

export const Btn = ({
    wide = true,
    upperCase = true,
    wideLetters = true,
    bold = true,
    hoverEffect = HoverEffect.ColorChange,
    color,
    backgroundColor,
    backgroundChangeColor,
    colorChangeColor,
    children }: BtnProps) => {
    const theme = useContext(ThemeContext);
    const defaultStyle: CSSProperties = {
        padding: `1rem ${wide ? '3rem' : '1rem'}`,
        border: 'none',
        backgroundColor: backgroundColor || theme.primaryColor,
        color: color || theme.linkColor,
        textTransform: upperCase ? 'uppercase' : 'none',
        letterSpacing: wideLetters ? 2 : undefined,
        fontWeight: bold ? 'bold' : undefined,
        cursor: 'pointer',
    };
    const [state, setState] = useState(defaultStyle);

    useEffect(() => {

    }, []);

    return <button style={state}
        onMouseEnter={() => {
            setState({
                ...state,
                backgroundColor: hoverEffect === HoverEffect.ColorChange ?
                    backgroundChangeColor || theme.secondaryColor :
                    state.backgroundColor,
                color: hoverEffect === HoverEffect.ColorChange ?
                    colorChangeColor || theme.primaryColor :
                    state.color,
            })
        }}
        onMouseLeave={() => setState(defaultStyle)}>{children}</button>
}