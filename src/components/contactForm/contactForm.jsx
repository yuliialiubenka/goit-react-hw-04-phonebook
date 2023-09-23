import PropTypes from 'prop-types';
import { useStyles } from "./contactFormStyles";
import { useState } from 'react';
import { nanoid } from 'nanoid';
import PhoneIcon from '../../data/phone-icon.svg';
import NameIcon from "../../data/name-icon.svg";

export const ContactForm = ({ onSubmit, ...PropTypes }) => {
    const classes = useStyles();
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    
    // Generation of unique identifiers for form fields
    const nameInputId = nanoid();
    const numberInputId = nanoid();
    
    // Form submission processing
    const handleSubmit = event => {
        event.preventDefault();

        onSubmit({ name, number });
        setName('');
        setNumber('');
    };
    
    // Processing of changes to form field values
    const  handleChange = event => {
        const { name, value } = event.target;
        if (name === 'name') {
            setName(value);
        } else if (name === 'number') {
            setNumber(value);
        }
    };

    return (
        <form className={classes.form} onSubmit={handleSubmit}>
            <label className={classes.label} htmlFor={nameInputId}>
                <img 
                    className={classes.labelImg}
                    src={NameIcon} alt="Name" 
                    width={32}
                />
                <input
                    className={classes.formInput}
                    type="text"
                    name='name'
                    value={name}
                    onChange={handleChange}
                    placeholder='Name'
                    pattern="^[a-zA-Zа-яА-Я]+((['\-][a-zA-Zа-яА-Я])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                />
            </label>
            <label className={classes.label} htmlFor={numberInputId}>
                <img
                    className={classes.labelImg}
                    src={PhoneIcon} 
                    alt="Phone" 
                    width={32}
                />
                <input
                    className={classes.formInput}
                    type="tel"
                    name="number"
                    value={number}
                    onChange={handleChange}
                    placeholder='Number'
                    pattern="\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                />
            </label>
            <button className={classes.formButton} type="submit">{PropTypes.btnText}</button>
        </form>
    );
};

ContactForm.propTypes = {
    btnText: PropTypes.string,
};