import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from 'src/store/createStore';
import App from './app';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <BrowserRouter>
        <Provider store={store}>
            {/* <React.StrictMode> */}
            <App />
        </Provider>
        {/* </React.StrictMode> */},
    </BrowserRouter>
);
