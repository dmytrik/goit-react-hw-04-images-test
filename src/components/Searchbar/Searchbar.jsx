import React, { Component } from 'react';
import propTypes from 'prop-types';
import { SearchbarBox, Form, Input, SearchBtn } from './Searchbar.styled';

class Searchbar extends Component {
  state = {
    searchName: '',
  };

  handleSearchChange = e => {
    this.setState({ searchName: e.currentTarget.value });
  };

  submitSearchName = e => {
    e.preventDefault();
    this.props.submitName(this.state.searchName);
  };

  render() {
    return (
      <SearchbarBox>
        <Form onSubmit={this.submitSearchName}>
          <Input type="text" onChange={this.handleSearchChange}></Input>
          <SearchBtn type="submit">Пошук</SearchBtn>
        </Form>
      </SearchbarBox>
    );
  }
}

export default Searchbar;

Searchbar.propTypes = {
  submitName: propTypes.func.isRequired,
};
