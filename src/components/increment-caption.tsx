import { useContext, useEffect, useRef, useState } from "react"
import { useOnScreen } from "../utils/dom";
import { ThemeContext } from "./theme";

export const IncrementCaption = ({ value, text }: {
    value: number, text: any,
}) => {
    const theme = useContext(ThemeContext);
    const ref = useRef() as React.MutableRefObject<HTMLInputElement>;
    const isVisible = useOnScreen(ref);
    const [value_, setValue] = useState(0);
    const [state, setState] = useState({ wrapperStyle: {} });
    const [handle, setHandle] = useState<NodeJS.Timer | null>(null);

    useEffect(() => {
        if (isVisible) {
            const stepsCount = value < 100 ? 1 :
                value < 1000 ? 10 :
                    value < 10000 ? 100 :
                        value < 100000 ? 1000 :
                            10000;
            const interval = value < 10 ? 100 :
                value < 100 ? 30 :
                    20;
            const handle = setInterval(() => {
                setValue(v => v + stepsCount);
            }, interval);
            setHandle(handle);
        } else {
            setValue(0);
        }
    }, [isVisible]);

    useEffect(() => {
        if (value_ >= value) {
            setValue(value);
            clearInterval(handle!);
        }
    }, [value_, handle, value]);

    return (
        <section ref={ref} style={{
            backgroundColor: 'white',
            padding: '1rem',
            height: 320,
            width: 320,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            ...state.wrapperStyle,
        }}
            onMouseEnter={() => setState({
                ...state,
                wrapperStyle: { backgroundColor: theme.neutralColor, cursor: 'pointer' }
            })}
            onMouseLeave={() => setState({
                ...state, wrapperStyle: {}
            })}
        >
            <div style={{
                textAlign: 'center'
            }}>
                <h3 style={{
                    fontSize: '3.5rem',
                    marginBottom: '1rem',
                    color: theme.primaryColor
                }}>{value_}</h3>
                <h4 style={{
                    fontSize: '2rem',
                    margin: 0,
                    fontWeight: 400
                }}>{text}</h4>
            </div>
        </section>
    )
}