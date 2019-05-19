import React, { SFC } from 'react';
import styled from 'styled-components';
import { Flex } from '../../common/styled-components';

const Span = styled.span`
    color: white;
    margin: 10px;
`;

const Input = styled.input`
    background-color: transparent;
    border: 1px solid #676af7;
    color: #a6afb8;
    font-weight: 700;
    line-height: 15px;
    min-width: 220px;
    padding: 10px;
`;

const SearchButton = styled.button`
    background-color: #676af7;
    border: 1px solid #676af7;
    color: white;
    height: 30px;
    padding: 0 20px;
`;

const PlayerSearch: SFC<{}> = (props) => {
    return (
        <Flex justifyAround alignCenter backgroundColor="#201E21" height="70px" width="100%">
            <Span>Search player</Span>
            <Input type="text" placeholder="Mosatramparen-Finreaver"></Input>
            <SearchButton type="submit">Search</SearchButton>
        </Flex>
    );
};

export default PlayerSearch;