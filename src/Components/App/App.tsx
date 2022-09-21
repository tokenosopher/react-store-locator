import React, {useState} from 'react';
import {ReactComponent as Logo} from '../../assets/logo.svg'
import './App.css';
import {InstantSearch, Hits, Configure, RefinementList} from 'react-instantsearch-dom'
import {indexName, searchClient} from "../../lib/algoliaClient";
import {GeoHit} from "../../types/StoreHit";
import StoreComponent from "../StoreComponent/StoreComponent";
import Header from "../Header/Header";
import Map from "../Map/Map"
import {LngLat} from "../../types/LngLat";
import Autocomplete from "../Autocomplete/Autocomplete";
import {
    useCallback, useMemo
} from 'react';
import {Hit} from '../../Interfaces';

const countries = ['GB']

function App() {

    const [searchState, setSearchState] = useState<Record<string, any>>({});
    const [currentStoreCoordinates, setCurrentStoreCoordinates] = useState<[number, number] | null>(null)
    const [currentStoreName, setCurrentStoreName] = useState<string | null>(null)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [selectedContent, setSelectedContent] = useState<'map' | 'list'>('list')
  const [currentStore, setCurrentStore] = useState<GeoHit | null>(null)

    const onSubmit = useCallback(({state}) => {
        setSearchState((searchState) => ({
            ...searchState,
            query: state.query
        }))
    },[])

    const plugins = useMemo(() => {
      const mapboxGeocodingPlugin = createMapboxGeocodingPlugin(
          {
          fuzzyMath: true,
          autocomplete: true,
          types: ['country', 'place', 'poi'],
          country: countries,
          access_token: process.env.REACT_APP_MAPBOX_TOKEN,
          })
    }, [])


    const querySuggestionPlugin = createSuggestionsPlugin({
        searchClient,
        indexName as string,
    (query) => {
            setSearchState((searchState) => ({
                ...searchState,
                query: query,
            }));
    },
    (item) => console.log(item),
        SuggestionComponent
    )
    return [mapboxGeocodingPlugin, querySuggestionPlugin];
}, [])

    const handleClick= (hit: Hit) => {
      // 1. Move map
        const {lat, lng} = hit._geoloc
        const coordinates: [number, number] = [lng, lat]
        setCurrentStoreCoordinates(coordinates)
        setCurrentStoreName(hit.name)
        setIsOpen(true)
    }


  return (
    <div className="flex w-full h-full flex-col">

      <Header/>
        <Autocomplete
            initialState={{
                query: searchState.query,
            }}
            placeholder={"Enter address, zip code or store name"}
            openOnFocus={true}
            onStateChange={onSubmit}
            onSubmit={onSubmit}
            onReset={onReset}
            plugins={plugins}
         />

      <InstantSearch searchClient={searchClient} indexName={indexName}>
        <Configure
          aroundLatLngViaIP={!currentStore}
          aroundLatLng={currentStore ? `${currentStore._geoloc.lng},${currentStore._geoloc.lat}` : ''}
          analytics={true}
        />
        <div className={'flex h-full w-full'}>
          <div className={'flex flex-col w-1/4'}>
            <div className={'m-2'}>
              <RefinementList attribute={'services'}/>
            </div>

            <Hits<GeoHit> hitComponent={hit => <StoreComponent store={hit.hit} onClick={(store) => setCurrentStore(store)} currentStore={currentStore}  key={hit.hit.objectID}/>}/>
          </div>
          <div className={'flex flex-col w-full'}>
            <Map currentStore={currentStore ? [currentStore._geoloc.lng, currentStore._geoloc.lat] : null} onClickMarker={(storeCoordinate => {})}/>
          </div>
        </div>
      </InstantSearch>

      </div>
  );
}

export default App;
