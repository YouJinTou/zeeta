import NextHead from 'next/head'
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { H1, LanguageContext, SEO_DESCRIPTION, SEO_TITLE } from './lang'

export const Head = ({
    heading = undefined,
    title = undefined,
    description = undefined,
}: {
    heading?: string,
    title?: string,
    description?: string,
}) => {
    const { pathname } = useRouter();
    const { translation: t, language: l } = useContext(LanguageContext);
    const heading_ = heading || t.g(H1, l);
    const title_ = title || t.g(SEO_TITLE, l);
    const description_ = description || t.g(SEO_DESCRIPTION, l);

    if (title_.length > 60) {
        throw `SEO title must be 60 or fewer characters. Current: ${pathname}/${title_.length}`;
    }
    if (description_.length < 70 || description_.length > 150) {
        throw `SEO description must be between 70 and 150 characters. Current: ${pathname}/${description_.length}`;
    }

    return (
        <>
            <NextHead>
                <title>{title_}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="description" content={description_} />
                <meta name="author" content='https://landlord.bg' />
                <meta httpEquiv='content-language' content={l} />
                <meta property="og:title" content={title_} key="title" />
                <meta property="og:description" content={description_} key="description" />
                <meta property="og:language" content={l} key="language" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
            </NextHead>
            {heading_ && <h1 style={{
                textAlign: 'center',
                fontSize: '2.8rem',
                wordBreak: 'break-word',
                textTransform: 'uppercase',
            }}>{heading_}</h1>}
        </>
    )
}