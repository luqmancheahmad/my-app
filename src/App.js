import './App.css';
import './styles/globals.css';
import { useMemo , useState} from 'react';
import { useLoadScript, GoogleMap, Marker } from '@react-google-maps/api';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

// function App() {
//   const {isLoaded} = useLoadScript({ 
    
//     GoogleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
//   });


//   if ( !isLoaded ) return (<div>Loading ..... </div>); 
//   return <Map />;
// }

// function Map(){
//   const center = useMemo(() => ({lat: 3.15916, lng: 101.71366}), [])

//   // return <div>Map</div>;
//   return (
//     <GoogleMap
//         zoom={15}  
//         center={center} 
//         mapContainerClassName= "map-container"
//     >

//       <Marker position={{lat: 3.15916, lng: 101.71366}} />    

//     </GoogleMap>


//   );
// }

export default function Places() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}

function Map(){
  const center = useMemo(() => ({lat: 3.15916, lng: 101.71366}), [])
  const [selected, setSelected] = useState(null);

  return (
    <>
      <div className="places-container">
        <PlacesAutocomplete setSelected={setSelected} />  
      </div>

      <GoogleMap
        zoom= {15}
        center= {center}
        mapContainerClassName="map-container"
      >
        {selected && <Marker position = {selected} />}
      </GoogleMap>
    </>
  );
}

const PlacesAutocomplete = ({ setSelected }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setSelected({ lat, lng });
  };

  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        className="combobox-input"
        placeholder="Search an address"
      />
      <ComboboxPopover>
        <ComboboxList>
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption key={place_id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};
