import React, { SFC } from 'react';
import styled from 'styled-components';
import { Flex } from '../../common/styled-components';

const SearchText = styled.div`
    color: white;
    margin: 0 20px;
`;

const Input = styled.input`
    background-color: transparent;
    border: 1px solid #676af7;
    color: #a6afb8;
    font-weight: 700;
    line-height: 15px;
    margin-left: auto;
    min-width: 220px;
    padding: 10px;
`;

const SearchButton = styled.button`
    background-color: #676af7;
    border: 1px solid #676af7;
    color: white;
    height: 30px;
    margin: 0 20px;
    padding: 0 20px;
`;

const PlayerSearch: SFC<{}> = (props) => {
    return (
        <Flex alignCenter backgroundColor="#201E21" height="70px" width="100%">
            <SearchText>Search player</SearchText>
            <Input type="text" placeholder="Mosatramparen-Finreaver"></Input>
            <SearchButton type="submit">Search</SearchButton>
        </Flex>
    );
};

export default PlayerSearch;