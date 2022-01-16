import { CSSProperties } from 'react';
import { Btn, BtnProps } from './button';
import { ZLink } from './link';
import styles from './shared.module.css';

export const TextCTA = ({ heading, ctaText, ctaLink, children, wrapperStyle = {}, ctaProps = {} }: {
    heading?: string, ctaText?: string, ctaLink?: string, ctaProps?: BtnProps,
    children: any, wrapperStyle?: CSSProperties,
}) => {
    return (
        <section style={{
            padding: '2rem',
            ...wrapperStyle,
        }}>
            {heading && <h2 style={{
                textAlign: 'center',
                fontSize: '2rem'
            }}>{heading}</h2>}
            <article className={styles.readable} style={{
                textAlign: 'left',
                margin: '0 auto'
            }}>{children}</article>
            {ctaText && ctaLink && <div style={{
                textAlign: 'center',
            }}>
                <Btn {...ctaProps}>
                    <ZLink href={ctaLink}>{ctaText}</ZLink>
                </Btn>
            </div>}
        </section>
    )
}