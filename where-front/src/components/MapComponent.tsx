import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapComponent = () => {
  const containerStyle = {
    width: '1200px',
    height: '500px'
  };

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const center = {
    lat: -31.7649,
    lng: -52.3376
  };

  return (
    <LoadScript googleMapsApiKey= {apiKey} >
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
