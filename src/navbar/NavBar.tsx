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

const UL = styled.ul`
    list-style-type: none;
    margin: 0;
    padding: 0;
`;

const LI = styled.li`
    display: inline;
    margin: 10px;
    font-weight: bold;
    text-transform: uppercase;
`;

const NavBar:React.SFC<NavBarProps> = (props) => {
    return (
        <Row>
            <UL>
                <LI>Home</LI>
                <LI>Ranking</LI>
                <LI>Guild</LI>
                <LI>Addon</LI>
                <LI>Contact</LI>
                <LI>Register</LI>
                <LI>Sign In</LI>
                <LI>Register</LI>
            </UL>
        </Row>
    );
}

export default NavBar;