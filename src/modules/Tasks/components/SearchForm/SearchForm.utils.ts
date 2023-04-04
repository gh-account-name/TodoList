import { SearchFormEntity } from 'domains/index';
import { FILTER_TYPES } from 'constants/index';

export const DEFAULT_VALUES: SearchFormEntity = {
  searchValue: '',
  filterType: FILTER_TYPES.ALL,
};
