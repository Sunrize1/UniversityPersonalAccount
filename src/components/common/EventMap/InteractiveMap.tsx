import { FC } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { InteractiveMapProps } from '../../../types/components/common/InteractiveMapProps';
import styles from './InteractiveMap.module.css';

export const InteractiveMap: FC<InteractiveMapProps> = ({
  latitude,
  longitude,
  addressName,
  eventTitle
}) => {
  return (
    <div className={styles.mapContainer}>
      <div className={styles.mapWrapper}>
        <MapContainer
          center={[latitude, longitude]}
          zoom={15}
          className={styles.leafletMap}
          scrollWheelZoom={false} 
          zoomControl={true}
          attributionControl={false}
        >
          <TileLayer
            attribution=""
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[latitude, longitude]}>
            <Popup className={styles.customPopup}>
              <div className={styles.popupContent}>
                <h5>{eventTitle}</h5>
                <p>{addressName}</p>
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}; 