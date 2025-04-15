import PropTypes from 'prop-types';
import './Error.css';

const Error = ({ message, onRetry }) => {
  return (
    <div className="error-container">
      <div className="error-icon">⚠️</div>
      <p className="error-message">{message}</p>
      {onRetry && (
        <button className="retry-button" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
};

Error.propTypes = {
  message: PropTypes.string.isRequired,
  onRetry: PropTypes.func,
};

export default Error; 