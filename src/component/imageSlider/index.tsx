import { ArrowLeftIcon, ArrowRightIcon, CloseIcon } from '@chakra-ui/icons';
import {
    StyledImageSliderBtn,
    StyledImageSliderWrapper,
    StyledImageSliderWrapperFullscreenImage,
} from './style';

function ImageSlider({
    filesCount,
    fileIndex,
    imageUrl,
    onNext,
    onPrev,
    onClose,
}: {
    filesCount: number;
    fileIndex: number;
    onNext: () => void;
    onPrev: () => void;
    onClose: () => void;
    imageUrl: string;
}) {
    return (
        <StyledImageSliderWrapper>
            <StyledImageSliderWrapperFullscreenImage>
                <img alt="" src={imageUrl} />
            </StyledImageSliderWrapperFullscreenImage>
            <StyledImageSliderBtn
                aria-label="close-fullscreen"
                fontSize="lg"
                icon={<CloseIcon />}
                onClick={onClose}
                right={10}
                top={10}
            />
            <StyledImageSliderBtn
                aria-label="next-image"
                display={filesCount === fileIndex ? 'none' : 'block'}
                fontSize="lg"
                icon={<ArrowRightIcon />}
                onClick={onNext}
                right="1vw"
            />
            <StyledImageSliderBtn
                aria-label="prev-image"
                display={fileIndex === 0 ? 'none' : 'block'}
                fontSize="lg"
                icon={<ArrowLeftIcon />}
                left="1vw"
                onClick={onPrev}
            />
        </StyledImageSliderWrapper>
    );
}

export default ImageSlider;
