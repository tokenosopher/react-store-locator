import React, { Component } from 'react';
import ReactMapboxGl, { ZoomControl, Marker } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Map } from 'mapbox-gl';
import {LngLat} from "../../types/LngLat";

const ReactMap = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN as string,
});

interface MapState {
    lat: number,
    lng: number,
    zoom: number,
}

interface MapProps {
    currentStore: LngLat;
    onClickMarker: (marker: any) => void;
}



export default class MapComponent extends Component {

  map: any;

  state = {
    lat: 30.5,
    lng: 50.5,
    zoom: 9,
  }

  render() {
    return (
      <div className={'h-full w-full relative'}>
        <ReactMap
          style="mapbox://styles/mapbox/light-v10"
          containerStyle={{
            height: '100%',
            width: '100%',
            position: 'relative',
            display: 'block',
          }}
          onClick={() => {}}
          onMoveEnd={() => {}}
          onZoomEnd={() => {}}
        >
          <ZoomControl position={'bottom-right'} />
        </ReactMap>
      </div>
    )


  }

}