import { CSSProperties, useContext, useEffect, useRef, useState } from 'react';
import { ZLink } from './link';
import { GiHamburgerMenu } from 'react-icons/gi';
import { onOutsideClick, useWindowDimensions } from '../utils/dom';
import { HoverEffect } from './effects';
import { useRouter } from 'next/router';
import { ThemeContext } from './theme';

const DefaultPadding = '1rem';

export const Nav = ({
    children,
    style
}: { children: any, style?: CSSProperties }) => {
    const ref = useRef() as React.MutableRefObject<HTMLInputElement>;
    const theme = useContext(ThemeContext);
    const { isMobile } = useWindowDimensions();
    const [state, setState] = useState({
        showMenu: false,
        showHamburger: false,
        mobileStyle: {},
        navStyle: {},
        isMobile,
    });

    useEffect(() => {
        setState({
            ...state,
            showMenu: !isMobile,
            showHamburger: isMobile,
            mobileStyle: isMobile ? {
                position: 'absolute',
                zIndex: 5,
                width: '100%',
            } : {},
            navStyle: isMobile ? {
                boxShadow: '0px 2px 5px 0px rgba(0,0,0,0.75)',
            } : {},
            isMobile,
        });
    }, [isMobile]);

    onOutsideClick(ref, () => state.isMobile ?
        setState({ ...state, showMenu: false }) : undefined);

    return (
        <nav style={{
            padding: state.showHamburger ? undefined : '0 2rem',
            backgroundColor: theme.primaryColor,
            ...state.navStyle,
            ...style,
        }}>
            {state.showHamburger &&
                <div onClick={() => setState({ ...state, showMenu: !state.showMenu })}
                    style={{
                        padding: DefaultPadding,
                        backgroundColor: theme.primaryColor,
                        color: theme.linkColor,
                    }}>
                    <GiHamburgerMenu />
                </div>}
            <div ref={ref} style={{
                transition: 'all 0.2s ease-in-out',
                opacity: state.showMenu ? 1 : 0,
                ...state.mobileStyle,
            }}>{children}</div>
        </nav>
    )
}

export const NavItem = ({
    text,
    path,
    wrapperStyle = {},
    hoverEffect = HoverEffect.Underline,
    children,
    submenu = false,
}: {
    text: string,
    path?: string,
    wrapperStyle?: CSSProperties,
    hoverEffect?: HoverEffect,
    children?: any,
    submenu?: boolean,
}) => {
    const childrenRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const { pathname } = useRouter();
    const { isMobile } = useWindowDimensions();
    const theme = useContext(ThemeContext);
    const defaultLinkStyle: CSSProperties = {
        borderBottom: '3px solid transparent',
        color: theme.linkColor
    };
    const childrenStyle: CSSProperties = {
        display: 'none',
        position: 'absolute',
    };
    const [state, setState] = useState({
        wrapperStyle,
        linkWrapperStyle: defaultLinkStyle,
        childrenStyle,
    });

    useEffect(() => {
        setState({
            wrapperStyle: {
                display: isMobile ? 'block' : submenu ? 'block' : 'inline-block',
                padding: DefaultPadding,
                backgroundColor: theme.primaryColor,
                ...wrapperStyle,
            },
            linkWrapperStyle: defaultLinkStyle,
            childrenStyle,
        });
    }, [isMobile]);

    onOutsideClick(childrenRef, () => setState({ ...state, childrenStyle: { display: 'none' } }));

    return (
        <div style={state.wrapperStyle}>
            <div style={{
                fontSize: '1.2rem',
                textTransform: 'uppercase',
                transition: hoverEffect === HoverEffect.ColorChange ?
                    'color 0.2s ease-in' : undefined,
                ...state.linkWrapperStyle,
                borderBottom: pathname === path ? '3px solid' : undefined,
            }}
                onMouseEnter={() => {
                    setState({
                        ...state,
                        linkWrapperStyle: hoverEffect === HoverEffect.Underline ?
                            { ...defaultLinkStyle, borderBottom: '3px solid' } :
                            { ...defaultLinkStyle, color: theme.secondaryColor }
                    })
                }}
                onMouseLeave={() => {
                    setState({
                        ...state,
                        linkWrapperStyle: defaultLinkStyle
                    })
                }}>
                {path && <ZLink href={path}>{text}</ZLink>}
                {!path && <div style={{ cursor: 'pointer' }}
                    onClick={() => {
                        setState({
                            ...state, childrenStyle: {
                                display: state.childrenStyle.display === 'block' ? 'none' : 'block',
                                position: isMobile ? undefined : 'absolute',
                                zIndex: 5,
                            }
                        });
                    }}>{text}</div>}
                {children && <div ref={childrenRef} style={state.childrenStyle}>
                    {children}
                </div>}
            </div>
        </div>
    )
}