import { useEffect, useState, useRef } from "react";
import axios from 'axios';
import ArtistInfo from "./components/ArtistInfo";
import { debounce } from 'lodash';
import PacmanLoader from "react-spinners/ClipLoader";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const override = {
    display: "block",
    margin: "0 auto",
    position: "fixed",
    top: "50%",
    left: "50%",
    borderWidth: "3px"
};

function App() {
    const [artists, setArtists] = useState([]);
    const input_field = useRef([]);
    let [loading, setLoading] = useState(false);


    const handleSubmit = (event) => {
        event.preventDefault();
    };

    const handleChange = debounce(async (e) => {
        if (e.target.value !== '') {
            try {
                setLoading(true)
                const { data } = await axios.get(`http://localhost:3000/api/artists?name=${e.target.value}`);
                setArtists(data);
                setLoading(false)
            } catch (error) {
                setLoading(false)
                console.log(error);
            }
        } else {
            setArtists([]);
        }
    }, 300);

    return (
        <>
            <ToastContainer limit={5} />
            <div className="main_page">
                <div className='py-5 w-auto d-flex align-items-center justify-content-center container-fluid ' style={{ backgroundColor: "#8e02ef" }}>
                    <h3 className='text-white'>Welcome to Artist Registry</h3>
                </div>
                <form className="d-flex mx-0 mx-md-auto d-noned-md-inline-flex search col col-md-6 order-1 order-md-2 mt-5" role="search"
                    onSubmit={handleSubmit}>
                    <input className="form-control p-3 border rounded-5 border-2" type="search"
                        placeholder="Search Artist" aria-label="Search"
                        onChange={handleChange}
                        ref={input_field}
                    />
                </form>
                <PacmanLoader
                    color={"#ffc008"}
                    loading={loading}
                    cssOverride={override}
                    size={150}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
                <ArtistInfo artists={artists} />
            </div>
        </>
    );
}

export default App;
