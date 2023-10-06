import { FC, useContext } from 'react';
import { ThemeContext } from '../../contexts/theme-context';

import logoIcon from './../../images/ball.png';
import './styles.scss';
import { Switch } from '@mui/material';

const Header: FC = () => {
    const { theme, setTheme } = useContext(ThemeContext);

    const handleThemeChange = () => {
        const isCurrentDark = theme === 'dark';
        setTheme(isCurrentDark ? 'light' : 'dark');
        localStorage.setItem('default-theme', isCurrentDark ? 'light' : 'dark');
    };

    return (
        <header className="header">
            <div className="header-content">
                <a href="/" className="logo-section">
                    <img src={logoIcon} alt="logo" />
                    <span>The Cricketer App</span>
                </a>
                <div className="toggle-btn-section">
                    <div className={`toggle-checkbox`}>
                        <p>Dark/Light</p>
                         <Switch checked={theme === 'light'} onChange={handleThemeChange} name='theme-ctr'></Switch>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
