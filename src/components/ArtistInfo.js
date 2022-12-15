/* eslint-disable jsx-a11y/alt-text */
import * as React from "react";

const ArtistInfo = ({artists}) => {

  return (
    <>
      <section className="mt-5">
        <div className="container px-0">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {artists?.map((artist, index) => (
             <div className="card m-2" style={{width: "18rem"}}>
             <div class="card-body">
               <h5 class="card-title">{artist.name}</h5>
               <p class="card-text">Listeners{artist.listeners}</p>
               <p class="card-text">Mbid {artist.mbid}</p>
               <a href={artist.url} class="btn btn-primary" target="_blank" rel="noreferrer">URL</a>
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
