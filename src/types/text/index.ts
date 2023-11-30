import { ReactNode } from 'react';

export type FontSizesTypes = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
export interface IText {
    fontSizes?: FontSizesTypes;
    children: ReactNode;
}
