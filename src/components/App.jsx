import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Wrapper } from './wrapper/wrapper';
import data from '../data/data.json';
import { ContactForm } from './contactForm/contactForm';
import { ContactList } from './contactList/contactList';
import ContactFilter from './contactFilter/contactFilter';

export class App extends Component {
  state = {
    contacts: [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    filter: '',
    name: '',
    number: ''
  }

  // Adding a new contact to your contact list
  addContact = contact => {
    const isInContacts = this.state.contacts.some(
      ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
    );

    if (isInContacts) {
      alert(`${contact.name} is already in contacts`);
      return;
    }
    this.setState(prevState => ({
      contacts: [{ id: nanoid(), ...contact }, ...prevState.contacts],
    }));
  };

  // Changing the filter value
  changeFilter = event => {
    this.setState({ filter: event.target.value });
  };

  // Getting the filtered contacts
  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  // Removing a contact from your list
  removeContact = contactId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(({ id }) => id !== contactId),
      };
    });
  };

  render() {

    const visibleContacts = this.getVisibleContacts();
    const { filter } = this.state;

    return (
      <>
        <Wrapper
          title={data.title}
        >
          <ContactForm 
            onSubmit={this.addContact} 
            btnText={data.btnText}
          />
            {this.state.contacts.length > 0 ? (
              <ContactFilter 
                value={filter} 
                onChangeFilter={this.changeFilter}
                title={data.filterTitle}
              />
            ) : (
              <div className='emptyBlock'>
                <p>{data.emptyText1}</p>
                <p>{data.emptyText2}</p>
              </div>
            )}
            {this.state.contacts.length > 0 && (
              <ContactList
                contacts={visibleContacts}
                onRemoveContact={this.removeContact}
              />
            )}
        </Wrapper>
      </>
    )
  }
}