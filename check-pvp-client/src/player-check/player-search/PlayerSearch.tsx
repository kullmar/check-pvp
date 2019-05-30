import React from 'react';
import styled from 'styled-components';
import { Flex } from '../../common/styled-components';

const SearchText = styled.label`
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

interface Props {
    onSearch: (id: string) => void;
}

const PlayerSearch: React.FunctionComponent<Props> = ({ onSearch }) => {
    let input = React.createRef<HTMLInputElement>();

    return (
        <Flex alignCenter backgroundColor="#201E21" height="70px" width="100%">
            <SearchText htmlFor="searchInput">Search player</SearchText>
            <Input id="searchInput" type="text" placeholder="Mosatramparen-Finreaver" ref={input}></Input>
            <SearchButton type="submit" onClick={() => {
                if(input.current && !!input.current.value) {
                    onSearch(input.current.value);
                }
            }}>Search</SearchButton>
        </Flex>
    );
};

export default PlayerSearch;