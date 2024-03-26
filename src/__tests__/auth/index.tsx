import { render, screen } from '@testing-library/react';
import MainHeader from 'src/component/layout/header';

describe('When user is sign in', () => {
    test('Logout button is visible', async () => {
        render(<MainHeader title="dsad" />);
        const logout = await screen.getByRole('button', {
            name: /logout/i,
        });

        expect(logout).toBeInTheDocument();
    });
});
