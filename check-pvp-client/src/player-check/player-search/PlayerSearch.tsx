import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {
    searchCharacter,
    selectPlayerSearchSuggestions,
    selectPlayerSearchLoading,
    selectAllCharacterEntities,
} from '../store';
import { Flex } from '../../common/styled-components';
import { Character } from '../../../../check-pvp-common/models';
import Downshift from 'downshift';
import { useDebounce } from '../../common/util';

const SearchText = styled.label`
    color: white;
    margin: 0 20px;
`;

const InputContainer = styled.div`
    margin-left: auto;
    position: relative;
`;

const Input = styled.input`
    font-weight: 700;
    font-family: 'Poppins', 'Questrial', 'Century Gothic';
    font-size: 12px;
    color: #a6afb8;
    background-color: transparent;
    border: 1px solid #676af7;
    padding: 8px 10px;
    width: 220px;
    line-height: 15px;
`;

const Dropdown = styled.ul`
    color: #dcdcdc;
    background-color: rgba(0, 0, 0, 0.9);
    text-align: left;
    font-family: 'Poppins', 'Questrial', 'Century Gothic';
    font-size: 13px;
    font-weight: 700;
    width: 100%;
    position: absolute;
    list-style: none;
    margin: 0;
    padding: 0;
`;

const DropdownItem = styled.li`
    padding: 3px 0px 3px 12px;
    text-align: left;
    border: 0;
    z-index: 1;
    width: 222px;
    color: #dcdcdc;
    cursor: Pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
    const debouncedInput = useDebounce(input, 200);
    const searchSuggestionIds = selectPlayerSearchSuggestions(props.state);
    const searchLoading = selectPlayerSearchLoading(props.state);
    const searchAction = props[searchCharacter.type];
    const allCharacters = selectAllCharacterEntities(props.state);
    const characters: Character[] = searchSuggestionIds[input]
        ? searchSuggestionIds[input].map(id => allCharacters[id])
        : [];

    useEffect(() => {
        if (
            debouncedInput &&
            !searchSuggestionIds[debouncedInput.toLowerCase()] &&
            !searchLoading
        ) {
            searchAction(debouncedInput);
        }
    }, [debouncedInput, searchAction, searchSuggestionIds, searchLoading]);

    const handleSelect = (selectedOption: Character) => {
        props.onSearch(input);
    };

    return (
        <Downshift
            onChange={handleSelect}
            onInputValueChange={val => setInput(val.trim())}
            inputValue={input}
            itemToString={(val) => `${val.name}-${val.realm}`}
        >
            {({
                getInputProps,
                getItemProps,
                getLabelProps,
                getMenuProps,
                getRootProps,
                isOpen,
                highlightedIndex,
            }) => (
                <Flex
                    {...getRootProps()}
                    alignCenter
                    backgroundColor="#201E21"
                    height="70px"
                    width="100%"
                >
                    <SearchText {...getLabelProps()}>Search player</SearchText>
                    <InputContainer>
                        <Input {...getInputProps()} />
                        <Dropdown {...getMenuProps()}>
                            {isOpen
                                ? characters.map((char, index) => (
                                      <li
                                          {...getItemProps({
                                              item: char,
                                              key: char.name,
                                          })}
                                      >
                                          {char.name}
                                      </li>
                                  ))
                                : null}
                        </Dropdown>
                    </InputContainer>

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
            )}
        </Downshift>
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
