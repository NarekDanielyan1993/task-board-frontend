/* eslint-disable @typescript-eslint/no-explicit-any */
import { Flex } from '@chakra-ui/react';
import React, { useRef } from 'react';
import { FILE_ALLOWED_FORMATS } from 'src/constant';
import { IAttachment } from 'src/types';
import { isFileExceedsSizeLimit, isFileFormatAllowed } from 'src/utills/helper';
import AttachmentList from './fileList';
import { StyledFileSelect, StyledFileText } from './style';

function Attachments({
    add,
    remove,
    images,
    register,
}: {
    add: (attachment: IAttachment) => void;
    remove: (attachment: IAttachment, index: number) => void;
    images: IAttachment[];
    register: any;
}) {
    const fileRef = useRef<HTMLInputElement>(null);
    const fileClickHandler = (event: React.MouseEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement;
        target.value = '';
    };

    const fileUploadHandler = (files: FileList | null) => {
        if (files && files.length > 0) {
            const file = files[0];
            if (isFileExceedsSizeLimit(file)) {
                return;
            }
            if (!isFileFormatAllowed(file)) {
                return;
            }

            const reader = new FileReader();
            reader.onload = (event: ProgressEvent<FileReader>) => {
                if (event.target?.result) {
                    add({
                        url: event.target?.result as string,
                        name: file.name,
                        isUploaded: false,
                    });
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const DropFileHandler = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        const imageFiles = event.dataTransfer.files;
        fileUploadHandler(imageFiles);
    };

    const dragOverHandler = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    return (
        <Flex flexDir="column" gap={4} mt={4}>
            <StyledFileSelect
                aria-label="drop-zone"
                onClick={() => fileRef.current?.click()}
                onDragOver={dragOverHandler}
                onDrop={DropFileHandler}
            >
                <StyledFileText as="p">
                    Drop file here or <b>Browse files</b>
                </StyledFileText>
                <input
                    accept={FILE_ALLOWED_FORMATS.join(',')}
                    hidden
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        fileUploadHandler(e.target.files);
                    }}
                    onClick={fileClickHandler}
                    ref={fileRef}
                    type="file"
                />
            </StyledFileSelect>
            <AttachmentList
                images={images}
                onRemove={remove}
                register={register}
            />
        </Flex>
    );
}

export default Attachments;
