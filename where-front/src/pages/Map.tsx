import Header from '../components/Header';
import styles from './Map.module.css';
import MapComponent from '../components/MapComponent';

function Map() {

  return (
    <>
        <Header/>
        <div className = { styles.mapContainer }>
          <div className = { styles.map }>
            <MapComponent/> 
          </div> 
        </div>
    </>
  )
}

export default Map
