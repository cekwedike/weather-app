import PropTypes from 'prop-types';

const SearchForm = ({ city, setCity, handleSearch }) => {
  return (
    <form onSubmit={handleSearch} className="search-form">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
        className="search-input"
      />
      <button type="submit" className="search-button">
        Search
      </button>
    </form>
  );
};

SearchForm.propTypes = {
  city: PropTypes.string.isRequired,
  setCity: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
};

export default SearchForm; 