import { ButtonProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

export type LinkVariantTypes = 'primary' | 'secondary' | 'tertiary';

export interface ILink extends ButtonProps {
    to: string;
    className?: string;
    children: ReactNode;
    variant: LinkVariantTypes;
}

export type ButtonVariantUnion = 'primary' | 'secondary';

export interface IButtonProps {
    variant?: ButtonVariantUnion;
    children: React.ReactNode;
    onClick: () => void;
}

export type IIconTypes = 'delete' | 'edit' | 'attachment' | 'view' | 'viewOff';

export interface IIconButton extends ButtonProps {
    iconName: IIconTypes;
    ariaLabel: string;
    isDisabled?: boolean;
    tooltip?: string;
}
