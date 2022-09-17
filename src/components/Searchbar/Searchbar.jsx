import { useState } from 'react';
import propTypes from 'prop-types';
import { SearchbarBox, Form, Input, SearchBtn } from './Searchbar.styled';

export default function Searchbar({ submitName }) {
  const [searchName, setSearchName] = useState('');

  const handleSearchChange = e => {
    setSearchName(e.currentTarget.value);
  };

  const submitSearchName = e => {
    e.preventDefault();
    submitName(searchName);
  };

  return (
    <SearchbarBox>
      <Form onSubmit={submitSearchName}>
        <Input type="text" onChange={handleSearchChange}></Input>
        <SearchBtn type="submit">Пошук</SearchBtn>
      </Form>
    </SearchbarBox>
  );
}

Searchbar.propTypes = {
  submitName: propTypes.func.isRequired,
};
