import React, { MouseEvent, memo } from 'react';
import { CLASSNAMES } from './StatusFilter.constants';
import { StatusFilterProps } from './StatusFilter.types';
import { FiltersType } from 'domains/index';
import { FILTER_TYPES } from 'constants/index';

function StatusFilterProto({ onChange, tasksType, disabled }: StatusFilterProps) {
  const onFilterChange = (evt: MouseEvent<HTMLDivElement> & { target: HTMLButtonElement }) => {
    if (!disabled) onChange(evt.target.textContent as FiltersType);
  };

  return (
    <div className="btn-group" onClick={onFilterChange}>
      {Object.values(FILTER_TYPES).map((filterValue, ind) => {
        return (
          <button
            key={ind}
            type="button"
            className={tasksType === filterValue ? CLASSNAMES.ACTIVE : CLASSNAMES.SECONDARY}>
            {filterValue}
          </button>
        );
      })}
    </div>
  );
}

export const StatusFilter = memo(StatusFilterProto);
