export const ListCard = ({
    items,
    heading,
}: {
    items: any[],
    heading?: string,
}) => {
    return (
        <div style={{
            backgroundColor: 'white',
        }}>
            {heading && <h3 style={{
                textAlign: 'left',
                padding: '1rem'
            }}>{heading}</h3>}
            <ul style={{
                listStyleType: 'none',
                padding: '1rem',
            }}>
                {items.map((c: any, i: number) =>
                    <li key={i} style={{
                        textAlign: 'left',
                        marginBottom: '1rem'
                    }}>
                        {c}
                    </li>)}
            </ul>
        </div>
    )
}