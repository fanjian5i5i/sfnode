import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Scene ,WebScene  } from '@esri/react-arcgis';
import FeatureLayer from './FeatureLayer';
function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>

    <WebScene id="ebd695da5f2b46e3b1bd9aebee839037" >
    <FeatureLayer/></WebScene>
    </div>
  );
}

export default App;
