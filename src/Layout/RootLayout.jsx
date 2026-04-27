
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router';

const RootLayout = () => {
    return (
        <div>
            <header>
            <Navbar></Navbar>
            </header>
            <main>
            <Outlet></Outlet>
            </main>
        </div>
    );
};

export default RootLayout;