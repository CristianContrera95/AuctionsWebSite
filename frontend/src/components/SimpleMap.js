import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => (
  <div style={{
    color: 'white',
    background: 'grey',
    padding: '15px 10px',
    display: 'inline-flex',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '100%',
    transform: 'translate(-50%, -50%)'
  }}>
    {text}
  </div>
);

class SimpleMap extends Component {
  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '75vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyDAg8BpHLF8F2Pn4_wX4rMnM3zQW7hbDBk' }}
          defaultCenter={{lat: 59.95, lng: 30.33}}
          defaultZoom={11}
           >
          <AnyReactComponent
            text="maps" />
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;
