import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Icon = styled.span`
  padding: 0 4px;
  color: inherit;
  flex-grow: 0;
  flex-shrink: 0;
  transition: 200ms transform;
  ${props => (props.sortActive ? 'opacity: 1' : 'opacity: 0')};
  ${props => props.sortDirection === 'desc' && 'transform: rotate(180deg)'};
`;

const NativeSortIcon = ({ sortActive, sortDirection, sortIcon, className }) => (
  <Icon sortActive={sortActive} sortDirection={sortDirection} className={className}>{sortIcon}</Icon>
);

NativeSortIcon.propTypes = {
  sortDirection: PropTypes.string.isRequired,
  sortActive: PropTypes.bool,
  sortIcon: PropTypes.node,
  className: PropTypes.string,
};

NativeSortIcon.defaultProps = {
  sortActive: false,
  sortIcon: <>&#9650;</>,
  className: '',
};

export default NativeSortIcon;
