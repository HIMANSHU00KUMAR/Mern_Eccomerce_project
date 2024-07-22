import React from 'react';
import TextField from '@mui/material/TextField';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <TextField
      label="Search Products"
      variant="outlined"
      fullWidth
      margin="normal"
      value={searchTerm}
      onChange={onSearchChange}
    />
  );
};

export default SearchBar;
