import './Loading.css';

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>Loading weather data...</p>
    </div>
  );
};

export default Loading; 