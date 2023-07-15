import PropTypes from 'prop-types';

export const ContactListItem = ({ name, number, id, onDelete }) => {
  return (
    <li>
      <p>{name}</p>
      <p>{number}</p>
      <button type="button" onClick={() => onDelete(id)}>
        Delete
      </button>
    </li>
  );
};

ContactListItem.propTypes = {
  name: PropTypes.string,
  number: PropTypes.string,
  id: PropTypes.string,
  onDelete: PropTypes.func,
};
