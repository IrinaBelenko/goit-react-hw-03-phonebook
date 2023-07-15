import { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { nanoid } from 'nanoid';
import { Filter } from './Filter/Filter';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      filter: '',
      currentContacts: [],
    };

    this.state.currentContacts = this.state.contacts;
  }

  addContact = ({ name, number }) => {
    const checkName = this.state.contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (checkName) {
      alert(`${name} is already in contacts.`);
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
        currentContacts: newContacts,
      };
    });
  };

  filterContact = search => {
    if (search === '') {
      this.setState({ currentContacts: this.state.contacts });
      return;
    }

    this.setState({
      currentContacts: this.state.contacts.filter(contact =>
        contact.name.toLowerCase().includes(search)
      ),
    });
  };

  deleteContact = id => {
    this.setState(prev => {
      const newContacts = prev.contacts.filter(contact => contact.id !== id);
      return { contacts: newContacts, currentContacts: newContacts };
    });
  };

  render() {
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm addContact={this.addContact}> </ContactForm>
        <h2>Contacts</h2>
        <Filter filterContact={this.filterContact}> </Filter>
        <ContactList
          contacts={this.state.currentContacts}
          deleteContact={this.deleteContact}
        ></ContactList>
      </div>
    );
  }
}
