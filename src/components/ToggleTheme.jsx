import { MonitorCog, Moon, Sun } from "lucide-react";
import { Button } from "./ui/button.js";
import { useTheme } from "./ThemeProvider.js";

const ToggleTheme = () => {
    const { theme, setTheme } = useTheme();

    return (
        <Button size={'icon'} variant={'outline'} onClick={() => setTheme((theme === 'dark') ? 'light' : (theme === 'light') ? 'dark' : null)}>
            {(theme === 'dark') ? (<Moon />) : (theme === 'light') ? (<Sun />) : null}
        </Button>
    );
};

export default ToggleTheme;