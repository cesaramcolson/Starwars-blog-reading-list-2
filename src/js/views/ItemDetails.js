import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Context } from "../store/appContext";

export const ItemDetails = () => {
    const { store, actions } = useContext(Context)
    const { type, id } = useParams();
    const [ details, setDetails ] = useState(null);

    useEffect(() => {
        if (!id) return;
        
        const fetchDetails = async () => {
            if (type === "character") {
                await actions.getPeopleInfo(id);
            } else if (type === "planet") {
                await actions.getPlanetsInfo(id);
            } else if (type === "vehicle") {
                await actions.getVehiclesInfo(id);
            }
        };

        fetchDetails();
    }, [type, id])

    useEffect(() => {
        if (type === "character" && store.peopleInfo[id]) {
            setDetails(store.peopleInfo[id]);
        } else if (type === "planet" && store.planetsInfo[id]) {
            setDetails(store.planetsInfo[id]);
        } else if (type === "vehicle" && store.vehiclesInfo[id]) {
            setDetails(store.vehiclesInfo[id]);
        }
    }, [store.peopleInfo, store.planetsInfo, store.vehiclesInfo, id]);

    if (!details) {
        return <div className="text-center mt-5">Loading...</div>;
    }


    const imageUrl =
    type === "character"
        ? `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`
        : type === "planet"
        ? `https://starwars-visualguide.com/assets/img/planets/${id}.jpg`
        : `https://starwars-visualguide.com/assets/img/vehicles/${id}.jpg`;

        return (
            <div className="container m-5">
                <div className="row">
                    <div className="col-md-4">
                        <img src={imageUrl} className="img-fluid" alt={details.name} />
                    </div>
                    <div className="col-md-8">
                        <h1>{details.name}</h1>
                        <p>
                            {type === "character"
                                ? "A person within the Star Wars universe"
                                : type === "planet"
                                ? "A planet within the Star Wars universe"
                                : "A vehicle within the Star Wars universe"}
                        </p>
                        <div className="row">
                            {type === "character" && (
                                <>
                                    <div className="col-md-4">
                                        <strong>Birth Year:</strong>
                                        <p>{details.birth_year}</p>
                                    </div>
                                    <div className="col-md-4">
                                        <strong>Gender:</strong>
                                        <p>{details.gender}</p>
                                    </div>
                                    <div className="col-md-4">
                                        <strong>Height:</strong>
                                        <p>{details.height}</p>
                                    </div>
                                    <div className="col-md-4">
                                        <strong>Skin Color:</strong>
                                        <p>{details.skin_color}</p>
                                    </div>
                                    <div className="col-md-4">
                                        <strong>Eye Color:</strong>
                                        <p>{details.eye_color}</p>
                                    </div>
                                </>
                            )}
                            {type === "planet" && (
                                <>
                                    <div className="col-md-4">
                                        <strong>Climate:</strong>
                                        <p>{details.climate}</p>
                                    </div>
                                    <div className="col-md-4">
                                        <strong>Diameter:</strong>
                                        <p>{details.diameter}</p>
                                    </div>
                                    <div className="col-md-4">
                                        <strong>Gravity:</strong>
                                        <p>{details.gravity}</p>
                                    </div>
                                    <div className="col-md-4">
                                        <strong>Population:</strong>
                                        <p>{details.population}</p>
                                    </div>
                                    <div className="col-md-4">
                                        <strong>Terrain:</strong>
                                        <p>{details.terrain}</p>
                                    </div>
                                </>
                            )}
                            {type === "vehicle" && (
                                <>
                                    <div className="col-md-4">
                                        <strong>Model:</strong>
                                        <p>{details.model}</p>
                                    </div>
                                    <div className="col-md-4">
                                        <strong>Manufacturer:</strong>
                                        <p>{details.manufacturer}</p>
                                    </div>
                                    <div className="col-md-4">
                                        <strong>Cost in Credits:</strong>
                                        <p>{details.cost_in_credits}</p>
                                    </div>
                                    <div className="col-md-4">
                                        <strong>Length:</strong>
                                        <p>{details.length}</p>
                                    </div>
                                    <div className="col-md-4">
                                        <strong>Max Speed:</strong>
                                        <p>{details.max_atmosphering_speed}</p>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
};