import { GoLocation } from 'react-icons/go';
import { FiPhoneCall } from 'react-icons/fi';
import { MdOutlineEmail } from 'react-icons/md';
import Image from 'next/image';
import { useWindowDimensions } from '../utils/dom';
import { CSSProperties, useEffect, useState } from 'react';
import { Lang } from './lang';

const WrapperPadding = '1.75rem';
const IconStyle = {
    marginRight: '0.75rem',
    fontSize: 40,
};

export const ContactBar = ({ address, addressSubtext, phones, email,
    textLeft = undefined, logoPath = undefined }: {
        address: string, addressSubtext: string, phones: string[], email: string,
        textLeft?: string, logoPath?: string
    }) => {
    const { isMobile, isSmallScreen } = useWindowDimensions();
    const [state, setState] = useState({
        wrapperStyle: {},
        iconsWrapperStyle: {},
        holderStyle: {},
    });

    useEffect(() => {
        setState({
            wrapperStyle: isMobile ? { padding: WrapperPadding } :
                isSmallScreen ?
                    { display: 'grid', gridTemplateColumns: '1fr 1fr', padding: WrapperPadding } :
                    { display: 'flex', justifyContent: 'space-between', padding: WrapperPadding },
            iconsWrapperStyle: isSmallScreen ? {} : { display: 'flex', justifyContent: 'flex-end' },
            holderStyle: isSmallScreen ? { padding: '1rem' } : { marginRight: '3rem' },
        })
    }, [isMobile, isSmallScreen]);

    return (
        <div style={state.wrapperStyle}>
            <div>
                {logoPath && <Image src={logoPath} width={100} height={100} alt='logo' />}
                {textLeft &&
                    <p style={{ fontSize: '2rem', margin: 0, marginLeft: '0.5rem' }}>{textLeft}</p>}
            </div>
            <div style={state.iconsWrapperStyle}>
                <Address address={address} addressSubtext={addressSubtext}
                    wrapperStyle={state.holderStyle} />
                <Phone phones={phones} wrapperStyle={state.holderStyle} />
                <Email email={email} wrapperStyle={state.holderStyle} />
            </div>
            <Lang />
        </div>
    )
}

export const Address = ({ address, addressSubtext, wrapperStyle, iconStyle }: {
    address: string, addressSubtext: string, wrapperStyle?: CSSProperties,
    iconStyle?: CSSProperties
}) => {
    return <section style={{ display: 'flex', ...wrapperStyle }}>
        <GoLocation style={iconStyle || IconStyle} />
        <address>
            <a href={`https://www.google.com/maps/place/${address}, ${addressSubtext}`}
                target='_blank' rel='noreferrer'>
                <div><b>{address}</b></div>
                <div>{addressSubtext}</div>
            </a>
        </address>
    </section>
}

export const Phone = ({ phones, wrapperStyle, iconStyle }: {
    iconStyle?: CSSProperties
    phones: string[], wrapperStyle?: CSSProperties,
}) => {
    return <div style={{ display: 'flex', ...wrapperStyle }}>
        <FiPhoneCall style={iconStyle || IconStyle} />
        <div>
            {phones.map((p, i) => <div key={p}>
                <a href={`tel:${p}`}>{i === 0 ? <b>{p}</b> : p}</a>
            </div>)}
        </div>
    </div>
}

export const Email = ({ email, wrapperStyle, iconStyle }: {
    iconStyle?: CSSProperties,
    email: string, wrapperStyle?: CSSProperties
}) => {
    return <div style={{ display: 'flex', ...wrapperStyle }}>
        <MdOutlineEmail style={iconStyle || IconStyle} />
        <a href={`mailto:${email}`}>{email}</a>
    </div>
}