import { useContext, useEffect, useState } from "react"
import { ZLink } from "./link";
import styles from './shared.module.css'
import { useWindowDimensions } from "../utils/dom";
import { FaFacebookMessenger } from 'react-icons/fa';
import { LanguageContext, makeTuple, RESERVED } from "./lang";
import { ThemeContext } from "./theme";

export const Footer = ({ companyName, links, address, phone, email, facebook,
    textColor = 'white', slogan, }: {
        companyName: string, links: { text: string, href: string }[],
        address: JSX.Element, phone: JSX.Element, email: JSX.Element,
        facebook?: string, textColor?: string, slogan?: string,
    }) => {
    const { translation: t, language: l } = useContext(LanguageContext);
    const theme = useContext(ThemeContext);
    const { isMobile, isSmallScreen } = useWindowDimensions();
    const [state, setState] = useState({
        sectionsWrapperStyle: {}
    });
    const sectionWrapperStyle = {
        borderTop: `2px solid ${textColor}`,
        width: '50%', paddingTop: '0.75rem'
    };
    const titleStyle = {
        fontSize: '1.5rem',
        fontWeight: 'bold',
    };
    const socialIconStyle = {
        fontSize: 25,
        color: textColor,
        cursor: 'pointer',
    };

    useEffect(() => {
        setState({
            sectionsWrapperStyle: {
                gridTemplateColumns: isMobile ? '1fr' : isSmallScreen ? '1fr 1fr' : '1fr 1fr 1fr',
                backgroundColor: theme.primaryColor,
                color: textColor,
            }
        });
    }, [isMobile, isSmallScreen]);

    return <footer>
        <div style={{
            display: 'grid', padding: '2rem', ...state.sectionsWrapperStyle,
        }}>
            <div>
                <p style={titleStyle}>{companyName}</p>
                {slogan && <p style={{ marginTop: '-1rem' }}>{slogan}</p>}
                <div className={styles.mr05r} style={{ marginTop: '1.5rem' }}>
                    {facebook && <a href={facebook} rel='noreferrer'>
                        <FaFacebookMessenger style={socialIconStyle} /></a>}
                </div>
            </div>
            <div>
                <p style={titleStyle}>{t.g(RESERVED, l, makeTuple('Страници', 'Pages'))}</p>
                <div className={styles.mb1r} style={sectionWrapperStyle}>
                    {links.map(l => <div key={l.href}>
                        <ZLink href={l.href}>{l.text}</ZLink>
                    </div>)}
                </div>
            </div>
            <div>
                <p style={titleStyle}>{t.g(RESERVED, l, makeTuple('Контакти', 'Contact'))}</p>
                <div className={styles.mb1r} style={sectionWrapperStyle}>
                    {address}
                    {phone}
                    {email}
                </div>
            </div>
        </div>
        <div style={{
            backgroundColor: theme.secondaryColor,
            fontSize: '0.8rem',
            padding: '1rem',
            display: 'flex',
            justifyContent: 'space-between'
        }}>
            <div>
                <b>{companyName}</b> © {new Date().getFullYear()} {
                    t.g(RESERVED, l, makeTuple('Всички права запазени', 'All rights reserved'))}
            </div>
            <div>
                {t.g(RESERVED, l, makeTuple('Изработено от ', 'Created by '))}
                <a href='https://www.landlord.bg/' target='_blank' rel='noreferrer'>
                    Landlord
                </a>
            </div>
        </div>
    </footer>
}