import NextHead from 'next/head'
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { H1, LanguageContext, SEO_DESCRIPTION, SEO_TITLE } from './lang'

export const Head = () => {
    const { pathname } = useRouter();
    const { translation: t, language: l } = useContext(LanguageContext);
    const heading = t.g(H1, l);
    const title = t.g(SEO_TITLE, l);
    const description = t.g(SEO_DESCRIPTION, l);

    if (title.length > 60) {
        throw `SEO title must be 60 or fewer characters. Current: ${pathname}/${title.length}`;
    }
    if (description.length < 70 || description.length > 150) {
        throw `SEO description must be between 70 and 150 characters. Current: ${pathname}/${description.length}`;
    }

    return (
        <>
            <NextHead>
                <title>{title}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="description" content={description} />
                <meta name="author" content='https://landlord.bg' />
                <meta httpEquiv='content-language' content={l} />
                <meta property="og:title" content={title} key="title" />
                <meta property="og:description" content={description} key="description" />
                <meta property="og:language" content={l} key="language" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
            </NextHead>
            {heading && <h1 style={{
                textAlign: 'center',
                fontSize: '2.8rem',
                wordBreak: 'break-word',
                textTransform: 'uppercase',
            }}>{heading}</h1>}
        </>
    )
}