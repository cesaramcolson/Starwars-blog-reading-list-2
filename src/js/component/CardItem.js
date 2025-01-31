import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import ImageWithFallback from "./ImageWithFallback";

export const CardItem = ({ item, type }) => {
    const { actions, store } = useContext(Context);
    const [ details, setDetails ] = useState(null);
    const [ isFavorite, setIsFavorite ] = useState(false);

    useEffect(() => {
        if(!item?.uid) return;

        const fetchDetails = async () => {
            if(type === "character"){
                await actions.getPeopleInfo(item.uid);
            } else if (type === "planet"){
                await actions.getPlanetsInfo(item.uid);
            } else if (type === "vehicle"){
                await actions.getVehiclesInfo(item.uid);
            }
        };
        fetchDetails();
    }, [item?.uid]);

    useEffect(() => {
        if (type === "character" && store.peopleInfo[item.uid]) {
            setDetails(store.peopleInfo[item.uid]);
        } else if (type === "planet" && store.planetsInfo[item.uid]) {
            setDetails(store.planetsInfo[item.uid]);
        } else if (type === "vehicle" && store.vehiclesInfo[item.uid]) {
            setDetails(store.vehiclesInfo[item.uid]);
        }
    },[store.peopleInfo, store.planestInfo, store.vehiclesInfo, item?.uid])

    useEffect(() => {
        setIsFavorite(store.favorites.some(fav => fav.name === item.name));
    }, [store.favorites, item.name]);

    const handleFavoriteClick = () => {
        if (isFavorite) {
            actions.removeFavorite(item.name);
        } else {
            actions.addFavorite(type, item.uid, item.name);
        }
        setIsFavorite(!isFavorite);
    };

    const imageUrl = type === "character" 
    ? `https://starwars-visualguide.com/assets/img/characters/${item.uid}.jpg`
    : type === "planet" 
    ? `https://starwars-visualguide.com/assets/img/planets/${item.uid}.jpg`
    : `https://starwars-visualguide.com/assets/img/vehicles/${item.uid}.jpg`; 

    return (
        <div className="card col-12 col-md m-3" style={{ minWidth: "300px" }}>
            <ImageWithFallback 
                src={imageUrl} 
                fallbackSrc="https://placehold.co/300x450"
                alt="Card image" 
                width={300}
                height={450}
            />
            <div className="card-body">
                <h5 className="card-title">{item?.name || "Unknown"}</h5>
                {details ? (
                    <>
                        {type === "character" && (
                            <>
                                <p className="card-text">Gender: {details.gender}</p>
                                <p className="card-text">Hair Color: {details.hair_color}</p>
                                <p className="card-text">Eye Color: {details.eye_color}</p>
                            </>
                        )}
                        {type === "planet" && (
                            <>
                                <p className="card-text">Climate: {details.climate}</p>
                                <p className="card-text">Terrain: {details.terrain}</p>
                                <p className="card-text">Population: {details.population}</p>
                            </>
                        )}
                        {type === "vehicle" && (
                            <>
                                <p className="card-text">Model: {details.model}</p>
                                <p className="card-text">Manufacturer: {details.manufacturer}</p>
                                <p className="card-text">Crew: {details.crew}</p>
                            </>
                        )}
                    </>
                ) : (
                    <p>Loading...</p>
                )}
                <div className="d-flex justify-content-between align-items-center">
                    <Link to={`/details/${type}/${item?.uid}`} className="btn btn-dark">Learn more!</Link>
                    <button 
                        className={`btn ${isFavorite ? 'btn-outline-warning' : 'btn-warning'}`}
                        onClick={handleFavoriteClick}
                    >
                        <i className={isFavorite ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}></i>
                    </button>
                </div>
            </div>
        </div>
    );
};
