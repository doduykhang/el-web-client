import React from 'react';
import { SearchIcon } from '../../../icons';

const SearchInputCommon = () => {
  return (
    <div className="ring-2 ring-black rounded-md p-1 flex w-fit">
      <input className="focus:outline-none" type="text" placeholder="search" />
      <button>
        <SearchIcon />
      </button>
    </div>
  );
};

export default SearchInputCommon;
