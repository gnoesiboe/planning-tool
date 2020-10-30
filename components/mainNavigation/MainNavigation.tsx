import React from 'react';

import { Nav } from 'react-bootstrap';
import { home, projectOverview } from '../../routing/routes';
import MainNavigationItem from './components/MainNavigationItem';

const MainNavigation: React.FC = () => (
    <Nav className="mr-auto">
        <MainNavigationItem path={home} title="Planning" />
        <MainNavigationItem path={projectOverview} title="Projects" />
    </Nav>
);

export default MainNavigation;
