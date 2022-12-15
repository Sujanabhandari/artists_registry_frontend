import { useState } from "react";
import { toast } from "react-toastify";

const ArtistInfo = ({ artists }) => {

    const [filename, setFilename] =useState("artist-data.csv");
    const handleDownloadClick = () => {
      let csv = "name,mbid,url,image_small,image\n";
      artists.forEach(artist => {
        csv += `${artist.name},${artist.mbid},${artist.url},${artist.image_small},${artist.image}\n`;
      });
  
      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.setAttribute("download", filename);
      a.setAttribute("href", url);
      a.click();
      toast.success("Congratulations!CSV File  is successfully exported")
    };
  
    const handleFilenameChange = (event) => {
      setFilename(event.target.value);
    };
  
    return (
      <>
        <section className="mt-5">
          <div className="container px-0">
            {artists.length > 0 && (
              <div className="m-4 text-center">
                <label htmlFor="filename" className="h5">Enter a file name:</label>
                <input
                  id="filename"
                  value={filename}
                  className="ms-3 border p-2 border-opacity-50 rounded"
                  onChange={handleFilenameChange}
                />
                <button onClick={handleDownloadClick} className="btn btn-warning">
                  Download artist data
                </button>
                </div>
            )}
  
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 mt-5">
              {artists?.map((artist, index) => (
                <div className="card m-2" style={{ width: "18rem" }} key={index}>
                  <div className="card-body">
                    <h5 className="card-title">{artist?.name}</h5>
                    <p className="card-text">Listeners{artist?.listeners}</p>
                    <p className="card-text">Mbid {artist?.mbid}</p>
                    <img src={artist?.image?.find(image => image?.size === 'small')['#text']} alt={artist?.name} />
                    <a
                      href={artist?.url}
                      className="btn btn-secondary ms-5"
                      target="_blank"
                      rel="noreferrer"
                    >
                      URL
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </>
    );
  };
  
  export default ArtistInfo;