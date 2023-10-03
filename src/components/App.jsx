import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Wrapper } from './wrapper/wrapper';
import data from '../data/data.json';
import { ContactForm } from './contactForm/contactForm';
import { ContactList } from './contactList/contactList';
import ContactFilter from './contactFilter/contactFilter';
import { EmptyBlock } from './emptyBlock/emptyBlock';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts'));
  });

  const [filter, setFilter] = useState('');

  // Saving contacts in localStorage 
  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  // Adding a new contact to your contact list
  const addContact = contact => {
    const isInContacts = contacts.some(
      ({ name }) => name.toLowerCase() === contact.name.toLowerCase().trim()
    );

    if (isInContacts) {
      alert(`${contact.name} is already in contacts`);
      return;
    }

    setContacts(prevContacts => [ ...prevContacts, { id: nanoid(), ...contact },]);
  };

  // Changing the filter value
  const changeFilter = event => {
    setFilter(event.target.value.trim());
  };

  // Getting the filtered contacts
  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter));
  };

  // Removing a contact from your list
  const removeContact = contactId => {
    setContacts(prevContacts => prevContacts.filter(contact => contact.id !== contactId));
  };

  const visibleContacts = getVisibleContacts();
  let filterContent;

  if (contacts.length > 0) {
    filterContent = <ContactFilter 
                      value={filter} 
                      onChangeFilter={changeFilter}
                      title={data.filterTitle}
                    />
  } else if(contacts.length === 0) {
    filterContent = <EmptyBlock
                      emptyText1={data.emptyText1}
                      emptyText2={data.emptyText2}
                    />
  }

  return (
    <>
      <Wrapper
        title={data.title}
      >
        <ContactForm 
          onSubmit={addContact} 
          btnText={data.btnText}
        />
          {filterContent}
          {contacts.length > 0 && (
            <ContactList
              contacts={visibleContacts}
              onRemoveContact={removeContact}
            />
          )}
      </Wrapper>
    </>
  )
}