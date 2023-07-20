export const Filter = ({ filter, onFilter }) => {
  return (
    <label>
      Find contacts by name
      <input
        type="text"
        name="search"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        onChange={onFilter}
        value={filter}
      />
    </label>
  );
};
