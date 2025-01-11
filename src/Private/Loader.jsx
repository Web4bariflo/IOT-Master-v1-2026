import HashLoader from "react-spinners/HashLoader";

const Loader = () => {
  return (
    <div 
      className="d-flex justify-content-center align-items-center vh-100" 
      style={{ 
        backgroundColor: '#f0f0f0', // Light gray background for contrast
        color: '#333' // Darker text color for better readability
      }}
    >
      <div className="text-center p-5 rounded" style={{
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)', // Enhanced shadow
        backgroundColor: '#ffffff', // White background for the inner div
        borderRadius: '10px'
      }}>
        <HashLoader
          color={'#39ff14'}
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
          cssOverride={{ display: 'block', margin: '0 auto' }}
        />
        <p className="mt-4 mb-0" style={{ fontSize: '18px', fontWeight: '500', color: '#333' }}>
          We are connecting to server ...
        </p>
      </div>
    </div>
  );
}

export default Loader;
