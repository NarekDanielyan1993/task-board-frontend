const globalStyles = {
    global: {
        body: {
            display: 'flex',
            flexDirection: 'column',
            fontFamily: 'Arial, sans-serif',
            fontSize: '62.5%',
            lineHeight: 1.4,
            height: '100vh',
        },
        '#root': {
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
        },
        a: {
            textDecoration: 'none',
        },
        '*': {
            boxSizing: 'border-box',
        },
    },
};

export default globalStyles;
