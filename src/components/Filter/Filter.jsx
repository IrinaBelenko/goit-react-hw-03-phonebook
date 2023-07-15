import { Component } from 'react';

export class Filter extends Component {
  state = {
    search: '',
  };

  onChange = ({ target }) => {
    this.setState({
      search: target.value,
    });
    this.props.filterContact(target.value.toLowerCase());
  };

  render() {
    return (
      <label>
        Find contacts by name
        <input
          type="text"
          name="search"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={this.onChange}
          value={this.state.search}
        />
      </label>
    );
  }
}
