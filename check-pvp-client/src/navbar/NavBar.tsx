import React from 'react';
import styled from 'styled-components';

export interface NavBarProps {
}

const Row = styled.nav`
    background-color: #090909;
    color: white;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 50px;
    width: 100vw;
`;

const List = styled.ul`
    margin: 0;
    padding: 0;
`;

const NavItem = styled.li`
    display: inline;
    margin: 10px;
    font-weight: bold;
    text-transform: uppercase;
`;

const NavBar:React.SFC<NavBarProps> = (props) => {
    return (
        <Row>
            <List>
                <NavItem>Home</NavItem>
                <NavItem>Ranking</NavItem>
                <NavItem>Guild</NavItem>
                <NavItem>Addon</NavItem>
                <NavItem>Contact</NavItem>
                <NavItem>Register</NavItem>
                <NavItem>Sign In</NavItem>
                <NavItem>Register</NavItem>
            </List>
        </Row>
    );
}

export default NavBar;