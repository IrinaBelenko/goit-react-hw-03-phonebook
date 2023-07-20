import { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { nanoid } from 'nanoid';
import { Filter } from './Filter/Filter';
const KEY = 'contacts';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem(KEY));
    if (contacts) {
      this.setState({ contacts });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.filter !== '') {
      return;
    }

    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem(KEY, JSON.stringify(this.state.contacts));
    }
  }

  addContact = ({ name, number }) => {
    const checkName = this.state.contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (checkName) {
      alert(`${name} is already in contacts.`);
      return;
    }

    if (this.state.filter !== '') {
      alert('filter needs to be cleaned');
      return;
    }

    const contact = {
      id: nanoid(),
      name,
      number,
    };

    this.setState(prev => {
      const newContacts = [...prev.contacts, contact];
      return {
        contacts: newContacts,
      };
    });
  };

  onFilter = ({ target }) => {
    this.setState({
      filter: target.value,
    });
    this.filterContact(target.value.toLowerCase());
  };

  filterContact = filter => {
    const contacts = JSON.parse(localStorage.getItem(KEY));

    if (filter === '') {
      this.setState({ contacts: contacts });
      return;
    }

    this.setState({
      contacts: contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter)
      ),
      filter,
    });
  };

  deleteContact = id => {
    if (this.state.filter !== '') {
      alert('filter needs to be cleaned');
      return;
    }
    this.setState(prev => {
      const newContacts = prev.contacts.filter(contact => contact.id !== id);
      return { contacts: newContacts };
    });
  };

  render() {
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm addContact={this.addContact}> </ContactForm>
        <h2>Contacts</h2>
        <Filter filter={this.state.filter} onFilter={this.onFilter}></Filter>
        <ContactList
          contacts={this.state.contacts}
          deleteContact={this.deleteContact}
        ></ContactList>
      </div>
    );
  }
}
