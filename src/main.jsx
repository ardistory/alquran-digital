import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ThemeProvider } from './components/ThemeProvider.js';

createRoot(document.getElementById('root')).render(
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <App />
    </ThemeProvider>
);
