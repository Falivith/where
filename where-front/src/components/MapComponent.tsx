import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapComponent = () => {
  const containerStyle = {
    width: '1200px',
    height: '500px'
  };

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const initialCenter = {
    lat: -31.7649,
    lng: -52.3376
  };

  const initialZoom = 15;

  const data = [
    { lat: -31.7649, lng: -52.3376, name: 'Local 1' },
    { lat: -31.7650, lng: -52.3377, name: 'Local 2' },
    { lat: -31.7651, lng: -52.3378, name: 'Local 3' },
    // Outros pontos
  ];

  const mapOptions = {
    disableDefaultUI: true,
  };

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap mapContainerStyle={containerStyle} center={initialCenter} zoom={initialZoom} options={mapOptions}>
      <Marker position={initialCenter} title="Marcador Inicial" />
        {data.map((location, index) => (
          <Marker key={index} position={{ lat: location.lat, lng: location.lng }} title={location.name} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
