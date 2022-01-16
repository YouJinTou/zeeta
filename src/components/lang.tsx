import Image from 'next/image';
import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useState } from 'react';
import { ZLink } from './link';

export const H1 = '_h1';
export const SEO_TITLE = '_seot';
export const SEO_DESCRIPTION = '_seod';
export const RESERVED = '___RESERVED___';
export enum Language { BG = "bg", EN = "en" };
export type Tuple = { [Language.BG]: string, [Language.EN]: string };
export const makeTuple = (bg: string, en: string): Tuple => {
    return { [Language.BG]: bg, [Language.EN]: en };
}
export class Translation {
    private merged: Map<string, Tuple>;

    constructor(public path: string,
        nodes: Map<string, Tuple>,
        nav: Map<string, Tuple>) {
        this.merged = new Map();
        nodes.forEach((value: Tuple, key: string) => this.merged.set(key, value));
        nav.forEach((value: Tuple, key: string) => this.merged.set(key, value));
    }

    g(node: string, language: Language, fallback?: Tuple) {
        const result = this.merged.get(node) || fallback || {
            [Language.BG]: '', [Language.EN]: ''
        }
        return result[language];
    }
}
export const LanguageContext = createContext({
    translation: new Translation('/', new Map(), new Map()),
    language: Language.BG,
    setLanguage: (_: Language) => { }
});
export const LanguageContextWrapper = ({ translations, children }: {
    translations: Translation[],
    children: any
}) => {
    const pathLanguage = useLanguage();
    const { pathname } = useRouter();
    const [_, setLanguage] = useState(Language.BG);
    const translation = translations.find(t => t.path === pathname) ||
        new Translation(pathname, new Map(), new Map());

    return (
        <LanguageContext.Provider value={{ translation, language: pathLanguage, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    )
};
export const Lang = () => {
    const { setLanguage } = useContext(LanguageContext);
    const d = 35;

    return (
        <div style={{ display: 'flex' }}>
            <div style={{ marginRight: '0.5rem', cursor: 'pointer' }}
                onClick={() => setLanguage(Language.BG)}>
                <ZLink href='/' withLanguage={false}>
                    <Image src='/bg.svg' width={d} height={d - 3} alt='Bulgarian' />
                </ZLink>
            </div>
            <div style={{ cursor: 'pointer' }} onClick={() => setLanguage(Language.EN)}>
                <ZLink href='/?language=en' withLanguage={false}>
                    <Image src='/uk.svg' width={d} height={d} alt='English' />
                </ZLink>
            </div>
        </div>
    )
}
export const useLanguage = () => {
    const { query, asPath } = useRouter();
    const [language, setLanguage] = useState(Language.BG);

    useEffect(() => {
        const isEnglish = query.language === Language.EN || asPath.includes('?en');
        setLanguage(isEnglish ? Language.EN : Language.BG);
    }, [query, asPath]);

    return language;
}
