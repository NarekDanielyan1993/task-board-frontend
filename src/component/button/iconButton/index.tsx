import {
    AttachmentIcon,
    DeleteIcon,
    EditIcon,
    ViewIcon,
    ViewOffIcon,
} from '@chakra-ui/icons';
import { IconButton as ChakraIconButton, Tooltip } from '@chakra-ui/react';
// import Delete from 'public/assets/delete.svg';
import { IIconButton } from 'src/types/button';

function IconButton({
    iconName,
    onClick,
    size = 'xs',
    fontSize = 18,
    variant = 'iconPrimary',
    ariaLabel,
    isDisabled = false,
    cursor = 'pointer',
    tooltip = '',
}: IIconButton) {
    console.log(455)
    const icons = {
        delete: <DeleteIcon color="brand.error.main" />,
        edit: <EditIcon />,
        attachment: <AttachmentIcon />,
        view: <ViewIcon />,
        viewOff: <ViewOffIcon />,
    };

    return (
        <Tooltip hasArrow label={tooltip}>
            <ChakraIconButton
                aria-label={ariaLabel}
                cursor={cursor}
                fontSize={fontSize}
                icon={icons[iconName]}
                isDisabled={isDisabled}
                onClick={onClick}
                size={size}
                variant={variant}
            />
        </Tooltip>
    );
}

export default IconButton;
