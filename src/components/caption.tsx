import Image from 'next/image';
import styles from './shared.module.css';

export const Caption = ({
    imagePath,
    caption,
    subtext,
    zoomOnHover = false,
    smallCaption = false,
    withBorderBox = false,
    withImagePadding = false, }: {
        imagePath?: string,
        caption: string,
        subtext?: any,
        zoomOnHover?: boolean
        smallCaption?: boolean,
        withBorderBox?: boolean,
        withImagePadding?: boolean,
    }) => {
    return (
        <div style={{
            display: 'inline-block',
            padding: '5px',
            backgroundColor: 'white',
            cursor: 'pointer',
            ...(withBorderBox && {
                boxShadow: '4px 4px 5px 0px rgba(0,0,0,0.75)',
            }),
        }}>
            {imagePath && <div className={zoomOnHover ? styles.zoomImageOnHover : ''}
                style={{ padding: withImagePadding ? '1rem' : undefined, }}>
                <Image src={imagePath} width={320} height={200} alt={caption} />
            </div>}
            <p style={{
                fontWeight: 500,
                padding: '1rem',
                margin: 0,
                fontSize: smallCaption ? '1rem' : '2rem',
                textTransform: 'uppercase'
            }}>{caption}</p>
            {subtext && <div style={{
                marginTop: 0,
                fontSize: '1.2rem',
                padding: '1rem'
            }}>{subtext}</div>}
        </div>
    )
}