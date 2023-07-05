import logo from './logo.svg';
import './App.css';
import { useMemo } from 'react';
import { useLoadScript, GoogleMaps, Marker } from '@react-google-maps/api';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React you 
//         </a>
//       </header>
//     </div>
//   );
// }

function App() {
  const {isLoaded} = useLoadScript({ 
    
    GoogleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });


  if ( !isLoaded ) return (<div>Loading ..... </div>); 
  return <Map />;
}

function Map(){

  return <div>Map</div>
}
export default App;
