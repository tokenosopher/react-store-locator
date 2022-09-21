import React, {useState} from 'react';
import {ReactComponent as Logo} from '../../assets/logo.svg'
import './App.css';
import {
    InstantSearch,
    Configure,
    Hits,
    RefinementList
} from "react-instantsearch-dom";
import {searchClient} from "../../lib/algoliaClient";
import StoreComponent from "../StoreComponent/StoreComponent";
import {GeoHit} from "../../types/StoreHit";
import Header from "../Header/Header";
import Map from "../Map/Map";


function App() {
    const [currentStore, setCurrentStore] = useState<GeoHit | null>(null)



  return (
    <div className="flex w-full h-full flex-col">

<Header/>
        
        <InstantSearch searchClient={searchClient} indexName={'tutorial-store-locator'}>
            {/*adds the one closest to home*/}
            <Configure aroundLatLngViaIP={true}/>

      <div className={'flex h-full w-full'}>
        <div className={'flex flex-col w-1/4'}>
            <div>
                <RefinementList attribute={'services'}/>
            </div>
            <Hits<GeoHit> hitComponent={(hit) => <StoreComponent key={hit.hit.objectID} store={hit.hit} onClick={(store) => setCurrentStore(store)} currentStore={currentStore}/> } />
        </div>
        <div className={'flex flex-col w-full bg-green-50'}>
            <Map />

        </div>
      </div>
        </InstantSearch>
      </div>
  );
}

export default App;
