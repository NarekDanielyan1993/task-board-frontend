import { useRef, useState } from 'react';
import { FILE_ALLOWED_FORMATS } from 'src/constant/file';
import { isFileExceedsSizeLimit, isFileFormatAllowed } from 'src/utills/helper';
import { StyledFileLabels, StyledFileSelect, StyledFileText } from './style';

function FileSelect({
    name,
    onChange,
}: {
    name: string;
    onChange: (files: ArrayBuffer) => void;
}) {
    const [images, setImages] = useState<File[]>([]);
    const fileRef = useRef<HTMLInputElement>(null);
    const fileUploadHandler = (files: FileList | null) => {
        if (files && files.length > 0) {
            const file = files[0];
            if (isFileExceedsSizeLimit(file)) {
                return;
            }
            if (!isFileFormatAllowed(file)) {
                return;
            }
            setImages((prev) => [...prev, file]);
            const reader = new FileReader();
            reader.onload = (event: ProgressEvent<FileReader>) => {
                if (event.target?.result) {
                    onChange(event.target.result as ArrayBuffer);
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
        <StyledFileSelect
            aria-describedby="drop-zone"
            aria-label="drop-zone"
            mb={2}
            onClick={() => fileRef.current?.click()}
            onDragOver={dragOverHandler}
            onDrop={DropFileHandler}
        >
            <StyledFileText as="p">
                Drop file here or <b>Browse files</b>
            </StyledFileText>
            <input
                accept={FILE_ALLOWED_FORMATS.join(',')}
                id={name}
                onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                    fileUploadHandler(e.target.files)
                }
                ref={fileRef}
                style={{ display: 'none' }}
                type="file"
            />
            {images.length > 0 && (
                <StyledFileLabels>
                    {images.map((image: File) => {
                        return (
                            <StyledFileText aria-label="file-name" as="span">
                                {image.name}
                            </StyledFileText>
                        );
                    })}
                </StyledFileLabels>
            )}
        </StyledFileSelect>
    );
}

export default FileSelect;
