import React from 'react';
import styled from 'styled-components/native';

const Logo = () => {
    return <LogoImage source={require('../../../assets/images/SYN_black.png')} />;
};

const LogoImage = styled.Image`
    width: 240px;
    height: 144px;
    margin-bottom: 10px;
`;

export default Logo;
