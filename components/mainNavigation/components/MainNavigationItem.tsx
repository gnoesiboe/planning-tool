import React from 'react';
import { Nav } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';

type Props = {
    path: string;
    title: string;
};

const MainNavigationItem: React.FC<Props> = ({ path, title }) => {
    const router = useRouter();

    const active = router.pathname === path;

    return (
        <Link href={path}>
            <Nav.Link href={path} active={active}>
                {title}
            </Nav.Link>
        </Link>
    );
};

export default MainNavigationItem;
