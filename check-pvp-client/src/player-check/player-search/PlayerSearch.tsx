import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { searchCharacter, selectPlayerSearchSuggestions, selectPlayerSearchLoading } from '../store';
import { Flex } from '../../common/styled-components';
import Select from 'react-select';
import { ValueType } from 'react-select/lib/types';


const SearchText = styled.label`
    color: white;
    margin: 0 20px;
`;

const Search = styled(Select)`
    color: #a6afb8;
    margin-left: auto;
    min-width: 300px;
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

    const handleSelect = (selectedOption: ValueType<string>) => {
        console.log(selectedOption as string);
        setInput(selectedOption as string);
    }

    return (
        <Flex alignCenter backgroundColor="#201E21" height="70px" width="100%">
            <SearchText htmlFor="searchInput">Search player</SearchText>
            <Search
                id="searchInput"
                backspaceRemovesValue={false}
                components={{
                    DropdownIndicator: null
                }}
                onChange={handleSelect}
                onInputChange={(val: string) => { setInput(val.trim()); }}
                options={searchSuggestions[input]}
                placeholder="Mosatramparen-Finreaver"
                value={input}
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