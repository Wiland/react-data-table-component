import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Cell } from './Cell';
import { DataTableContext } from './DataTableContext';

const TableColStyle = styled(Cell)`
  font-size: ${props => props.theme.header.fontSize};
  user-select: none;
  font-weight: 500;
  white-space: nowrap;
  color: ${props => props.theme.header.fontColor};
  min-height: ${props => props.theme.header.height};

  &::before {
    font-size: 12px;
    padding-right: 4px;
  }

  &::after {
    font-size: 12px;
    padding-left: 4px;
  }

  &:hover {
    ${props => props.column.sortable && 'cursor: pointer'};

    ${props => (props.column.sortable && !props.sortable && !props.sortIcon
      && (props.column.right
        ?
        css`
          &::before {
            content: '\\25BC';
            color: #DDD;
          }`
        :
        css`
          &::after {
            content: '\\25BC';
            color: #DDD;
          }`
      ))};
  }
  ${props => props.sortable && !props.sortIcon
    && (props.column.right ?
      css`
        &::before {
          content: '\\25BC';
          transition-duration: 1s;
          transition-property: transform, padding;
        }`
      :
      css`
        &::after {
          content: '\\25BC';
          transition-duration: 1s;
          transition-property: transform, padding;
        }`
    )};
  ${props => props.sortable && props.sortDirection === 'asc' && !props.sortIcon
    && (props.column.right ?
      css`
        &::before {
          content: '\\25BC';
          transform: rotate(180deg);
          padding-left: 4px;
          padding-right: 0;
        }`
      :
      css`
        &::after {
          content: '\\25BC';
          transform: rotate(-180deg);
          padding-left: 0;
          padding-right: 4px;
        }`
    )};
`;

const ColumnCellWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  ${props => props.active && 'font-weight: 800'};
`;

const SortIcon = styled.span`
  line-height: 1;

  i,
  svg {
    font-size: 18px !important;
    height: 18px !important;
    width: 18px !important;
    flex-grow: 0;
    flex-shrink: 0;
    backface-visibility: hidden;
    transform-style: preserve-3d;
    transition-duration: 1s;
    transition-property: transform;
  }

  &.asc i,
  &.asc svg {
    transform: rotate(180deg);
  }
`;

class TableCol extends PureComponent {
  static propTypes = {
    onColumnClick: PropTypes.func.isRequired,
    column: PropTypes.object.isRequired,
  };

  // TODO: migrate to ueContext hook
  static contextType = DataTableContext;

  onColumnClick = e => {
    const {
      column,
      onColumnClick,
    } = this.props;
    const { sortDirection } = this.context;

    onColumnClick(column, sortDirection, e);
  }

  render() {
    const { column } = this.props;
    const { sortIcon, sortColumn, sortDirection, internalCell } = this.context;
    const sortable = column.sortable && sortColumn === column.selector;

    return (
      <TableColStyle
        id={`column-${column.selector}`}
        onClick={this.onColumnClick}
        sortable={sortable}
        sortDirection={sortDirection}
        sortIcon={sortIcon}
        column={column}
        internalCell={internalCell}
        className="rdt_TableCol"
      >
        {column.name && (
          <ColumnCellWrapper active={sortable}>
            {sortable && sortIcon && (
              <SortIcon className={sortDirection}>
                {sortIcon}
              </SortIcon>
            )}
            {column.name}
          </ColumnCellWrapper>
        )}
      </TableColStyle>
    );
  }
}

export default TableCol;
