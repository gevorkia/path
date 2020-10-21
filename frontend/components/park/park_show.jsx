import React from "react";
import SearchSuggestions from "../search/search_suggestions";

import TrailIndexContainer from "../trail/trail_index_container"



class ParkShow extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
      // debugger
      this.props.fetchPark(this.props.match.params.parkId);
      // this.props.fetchParkTrails(this.props.match.params.parkId);
      
      
      // debugger;
      // console.log(this.props)
      
    }

    render() {
      // debugger
      // console.log(this.props.park)


      
      const { park } = this.props;

     
        if (!this.props.park) return null;

        // const tagsArr = ["hiking", "forest", "nature-trips", "river"]

        // const tags = tagsArr.map((tag,idx) => {
        //   return <ul className="park-tag" key={idx}>{tag}</ul>
        // })   

        // const parkInfoTitlesArr = ["Acreage", "Contact", "Link"]
        

        
        // const parkInfoTitles = parkInfoTitlesArr.map((title, idx) => {
        //   return <ul className="park-info-title" key={idx}>{title}</ul>
        // })
        
        
        // const parkInfoRes = park..map((res, idx) => {
        //   return <ul className="park-info-res" key={idx}>{res}</ul>
        // })

        const parkPhotos = this.props.park.photoUrls.map((url) => {
          return <img src={url} className="park-photo"></img>
        })

        const reviewStars = [];
        for (let i = 1; i < 6; i++) {
            reviewStars.push(<span key={i}>
              <img className="star" src="https://cdn-assets.alltrails.com/assets/packs/media/icons/icons_stars_active_lrg-940ee31d.svg"></img>
            </span>)
        }


        return (
          <>
            <section className="sec-nav-wrapper">
              <div className="sec-nav">
                <div className="left-wrapper">
                  <div className="left-content">
                    <div className="location">United States of America ></div>
                    <div className="location">California ></div>
                    <div className="location">{park.name}</div>
                  </div>
                </div>
                <div className="right-wrapper">
                  <div className="right-content">
                    {/* <SearchSuggestions/> */}
                    <div className="secNav-input-holder">
                      <input
                        className="secNav-home-search-bar"
                        type="text"
                        placeholder="Enter a park or trail name"
                        autoComplete="off"
                        aria-label="text search input"
                      ></input>
                      <button className="secNav-search-button">
                        <div className="secNav-magnifying-glass"></div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <div className="park-content-wrapper">
              <section className="park-content">
                <div className="photo-carousel-wrapper">
                  <div className="photo-carousel">
                    {/* PHOTO CAROUSEL */}
                    {parkPhotos}
                  </div>
                </div>
                <div className="title-wrapper">
                  <div className="title">
                    <h1>Best Trails in {park.name}</h1>
                  </div>
                </div>
                <div className="ratings-wrapper">
                  <div className="ratings-star">{reviewStars}</div>
                  <div className="ratings-num">1,045 Reviews</div>
                </div>
                <div className="park-text-wrapper">
                  <div className="park-summary">{park.summary}</div>
                  <div className="park-desc-header">Description</div>
                  <div className="park-desc">{park.description}</div>
                </div>
                <section className="park-tags"><></></section>
                <div className="park-static-map">
                  <img
                    src={`https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/static/${park.lng},${park.lat},13.55,0/800x240?access_token=pk.eyJ1IjoiZ2V2b3JraWEiLCJhIjoiY2tnZ3hrdGxjMDAwdzJ0c2FldnNjYWRnZyJ9.WHAlo3XQoW9zZj9ObJ5qCQ`}
                    alt="park-map-preview"
                  />
                  {/* <img
                    src={`https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/static/-121.7825,36.2456,14.55,0/500x200?access_token=pk.eyJ1IjoiZ2V2b3JraWEiLCJhIjoiY2tnZ3hrdGxjMDAwdzJ0c2FldnNjYWRnZyJ9.WHAlo3XQoW9zZj9ObJ5qCQ`}
                    alt="park-map-preview"
                  /> */}
                  {/* <img
                    src={`https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/static${staticMapPinStr}/${park.lng},${park.lat},8,0/${staticMapWidth}x240@2x?access_token=${window.mapboxAPIKey}`}
                    alt="map-preview"
                  /> */}
                </div>
                <div className="park-links-wrapper">
                  <div className="park-links">
                    <a
                      href={`https://www.google.com/maps/dir/Current+Location/${park.lat},${park.lng}`}
                      className="park-action"
                    >
                      <div className="directions-btn"></div>
                      <p className="direction-btn-text">Directions</p>
                    </a>
                  </div>
                </div>

                <section className="park-info-wrapper">
                  <h2 className="park-info-main-header">Park Information</h2>
                  <div className="park-info-details">
                    <div>
                      <article className="park-info-pairs">
                        <h3 className="park-info-header">Acreage</h3>
                        <p className="park-info-subheader">
                          {park.acreage} acres
                        </p>
                      </article>
                      <article>
                        <h3 className="park-info-header">Contact</h3>
                        <p className="park-info-subheader">{park.contact}</p>
                      </article>
                      <article>
                        <h3 className="park-info-header">Website</h3>
                        <a
                          href={`${park.website}`}
                          className="park-info-subheader"
                        >
                          link
                        </a>
                      </article>
                    </div>
                  </div>
                </section>
              </section>
              <section className="filters-trails-list-wrapper">
                <div className="filters-trails-list">
                  <div className="filters-wrapper">
                    <div className="filters"></div>
                  </div>
                </div>
              </section>
              <section>
                <div className="trails-index-wrapper">
                  <div className="trails-index">
                    <h2 className="trails-header-text">
                      {/* Top Trails ({Object.keys(park.trails).length}) */}
                      Top Trails in Big Sur
                    </h2>
                    {/* <TrailIndex trails={trails} parkName={park.name} /> */}
                    <TrailIndexContainer
                      parkId={park.id}
                      parkName={park.name}
                    />
                    {/* <TrailIndexItem/> */}
                  </div>
                </div>
              </section>
            </div>
          </>
        );
    }
}

export default ParkShow;