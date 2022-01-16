import { createContext } from "react";

interface ITheme {
    primaryColor: string,
    secondaryColor: string,
    neutralColor: string,
    linkColor: string,
    textOnImageColor: string,
}

export class Verdure implements ITheme {
    primaryColor = '#4a7c59';
    secondaryColor = '#ffc857';
    neutralColor = '#eeeeff';
    linkColor = 'white';
    textOnImageColor = 'white';
}

export const ThemeContext = createContext(new Verdure());
