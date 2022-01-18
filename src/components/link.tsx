import Link from 'next/link';
import { useContext } from 'react';
import { Language, LanguageContext } from './lang';

export const ZLink = ({ href, children, target, withLanguage = true }: {
    href: string, children: any, target?: string, withLanguage?: boolean,
}) => {
    const { language } = useContext(LanguageContext);
    const href_ = withLanguage ?
        language === Language.BG ? href : `${href}?language=${language}` :
        href;
    return (
        <Link href={href_} passHref>
            <div>
                <a target={target}>
                    {children}
                </a>
            </div>
        </Link>
    )
}