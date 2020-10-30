import React from 'react';
import { Navbar } from 'react-bootstrap';

type Props = {
    children: React.ReactNode;
};

const MainHeader: React.FC<Props> = ({ children }) => (
    <Navbar bg="dark" variant="dark" sticky="top">
        <Navbar.Brand>Freshheads</Navbar.Brand>
        {children}
    </Navbar>
);

export default MainHeader;
