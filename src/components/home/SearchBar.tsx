import React from 'react';
import styled from 'styled-components/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const SearchBar = () => {
    return (
        <Container>
            <FontAwesomeIcon icon={faMagnifyingGlass} size={16} color="#232323" style={{ margin: 8 }} />
            <SearchInput placeholder="Search for any talent..." placeholderTextColor="#888" />
        </Container>
    );
};

const Container = styled.View`
    flex-direction: row;
    align-items: center;
    border-color: #232323;
    border-width: 1px;
    border-radius: 30px;
    padding: 8px 16px;
    margin: 24px;
`;

const SearchInput = styled.TextInput`
    flex: 1;
    height: 30px;
    color: #232323;
`;

export default SearchBar;
