import React from 'react';
import styled from 'styled-components/native';

const Divider = () => (
  <StyledDivider />
);

const StyledDivider = styled.View`
  height: 1px;
  background-color: #232323;
  width: 80%;
  margin: 10px 0;
`;

export default Divider;
