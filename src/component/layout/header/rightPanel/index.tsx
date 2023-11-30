import { Button, Flex } from '@chakra-ui/react';
import { logout } from 'src/store/auth/action';
import { useAppDispatch } from 'src/store/createStore';
import { StyledTitle } from '../style';

function RightPanel({ title }: { title: string }) {
    const dispatch = useAppDispatch();
    const onLogout = () => {
        dispatch(logout());
    };
    return (
        <Flex flex={1} justify="space-between">
            <StyledTitle>{title}</StyledTitle>
            <Flex>
                <Button onClick={onLogout} variant="tertiary">
                    Logout
                </Button>
            </Flex>
        </Flex>
    );
}

export default RightPanel;
