import styled from 'styled-components';
import { colors } from '../../config/colors';
export const PaginationContainer = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-weight: 500;
  font-size: 15px;
`;
export const PaginationButtons = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  height: 40px;
  width: 40px;
  text-decoration: none;
  transition: background-color 0.2s;
  border: 1px solid #ddd;
  cursor: pointer;

  &:active {
    background-color: #007bff;
    color: white;
    border: 1px solid #7cbddb;
  }
  &:disabled {
    opacity: 0.2;
  }
  &:a:hover:not(.active) {
    background-color: rgb(238, 238, 238);
  }
`;
