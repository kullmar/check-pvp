import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Flex } from '../../common/styled-components';
import { connect } from 'react-redux';
import { searchCharacter, selectPlayerSearchSuggestions, selectPlayerSearchLoading } from '../store';

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

const PlayerSearch: React.FunctionComponent<Props> = (props: any) => {
    const [input, setInput] = useState('');
    const searchSuggestions = selectPlayerSearchSuggestions(props.state);
    const searchLoading = selectPlayerSearchLoading(props.state);
    const searchAction = props[searchCharacter.type];

    useEffect(() => {
        if (input && !searchSuggestions[input.toLowerCase()] && !searchLoading) {
            searchAction(input);
        }
    }, [input, searchAction, searchSuggestions, searchLoading]);

    return (
        <Flex alignCenter backgroundColor="#201E21" height="70px" width="100%">
            <SearchText htmlFor="searchInput">Search player</SearchText>
            <Input
                id="searchInput"
                type="text"
                placeholder="Mosatramparen-Finreaver"
                value={input}
                onChange={event => setInput(event.target.value.trim())}
            />
            <SearchButton
                type="submit"
                onClick={() => {
                    if (!!input && validateInput(input)) {
                        props.onSearch(input);
                    }
                }}
            >
                Search
            </SearchButton>
        </Flex>
    );
};

function validateInput(input: string): boolean {
    return input.split('-').length === 2;
}

const mapStateToProps = (state: any) => {
    return {
        state,
    };
};

const mapDispatchToProps = {
    [searchCharacter.type]: searchCharacter,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlayerSearch);