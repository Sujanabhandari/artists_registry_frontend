import { useEffect, useState, useRef } from "react";
import axios from 'axios';
import ArtistInfo from "./components/ArtistInfo";
import { debounce } from 'lodash';

function App() {
  const [artists, setArtists] = useState([]);
  const input_field = useRef(null);

  const handleChange = debounce(async (e) => {
    try {
      const { data } = await axios.get(`http://localhost:3000/api/artists?name=${e.target.value}`);
      setArtists(data);
    } catch (error) {
      console.log(error);
    }
  }, 150);

  return (
    <div className="container-fluid">
      <div className='bg-primary py-5 w-auto d-flex align-items-center justify-content-center'>
        <h3 className='text-white'>Welcome to Artist Registry</h3>
      </div>
      <form className="d-flex mx-0 mx-md-auto d-noned-md-inline-flex search col col-md-6 order-1 order-md-2 mt-5" role="search">
        <input className="form-control me-2" type="search"
          placeholder="Search" aria-label="Search"
          onChange={handleChange}
          ref={input_field}
        />
      </form>
      <ArtistInfo artists={artists} />
    </div>
  );
}

export default App;
