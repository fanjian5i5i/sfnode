import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Map } from '@esri/react-arcgis';
import FeatureLayer from './FeatureLayer';
function App() {
  return (
    <div>
    <Map style={{ width: '100vw', height: '100vh' }}
    mapProperties={{ basemap: 'gray-vector' }} 
    viewProperties={{
          center: [-71.0589, 42.3601],
          zoom: 12
      }}>
      <FeatureLayer />
    </Map>
    </div>
  );
}

export default App;
