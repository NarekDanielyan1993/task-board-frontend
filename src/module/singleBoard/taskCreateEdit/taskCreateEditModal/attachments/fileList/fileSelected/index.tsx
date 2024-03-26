import { CloseIcon } from '@chakra-ui/icons';
import { Flex, Text } from '@chakra-ui/react';
import { IAttachmentPreview } from 'src/types';
import { generateFileUrl } from 'src/utills/helper';
import {
    StyledFileSelectImageOverlay,
    StyledFileSelectImageRemove,
    StyledFileWrapper,
    StyledFileWrapperImage,
} from './style';

function AttachmentPreview({
    image,
    register,
    onRemove,
    index,
    onFullscreen,
}: IAttachmentPreview) {
    const { name } = image;
    return (
        <Flex
            borderRadius="sm"
            boxShadow="md"
            flexDir="column"
            onClick={onFullscreen}
            overflow="hidden"
            position="relative"
            width="32"
        >
            <input {...register(`attachments.${index}.id`)} type="hidden" />
            <input {...register(`attachments.${index}.name`)} type="hidden" />
            <input {...register(`attachments.${index}.url`)} type="hidden" />
            <input
                {...register(`attachments.${index}.publicId`)}
                type="hidden"
            />
            <input
                {...register(`attachments.${index}.isUploaded`)}
                type="hidden"
            />
            <StyledFileWrapper
                cursor="pointer"
                pos="relative"
                role="presentation"
            >
                <StyledFileWrapperImage alt="" src={generateFileUrl(image)} />
                <StyledFileSelectImageOverlay>
                    <StyledFileSelectImageRemove
                        onClick={(e) => {
                            e.stopPropagation();
                            onRemove(image, index);
                        }}
                    >
                        <CloseIcon />
                    </StyledFileSelectImageRemove>
                </StyledFileSelectImageOverlay>
            </StyledFileWrapper>
            <Text p={2}>{name}</Text>
        </Flex>
    );
}

export default AttachmentPreview;
