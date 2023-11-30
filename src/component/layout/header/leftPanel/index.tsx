import { Flex } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import Link from 'src/component/button/link';
import BOARD_ROUTES from 'src/constant/route';

function LeftPanel() {
    const { id } = useParams();
    return (
        <Flex flex={1} justify="left">
            {id ? (
                <Link to={BOARD_ROUTES.boards} variant="primary">
                    All boards
                </Link>
            ) : null}
        </Flex>
    );
}

export default LeftPanel;
