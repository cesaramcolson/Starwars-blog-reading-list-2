import React, { useContext } from "react";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import { CardForCharacters } from "../component/CardItem";

export const Home = () => {
	const { store } = useContext(Context);

	const eachCharacter = store.people.map((people, index) => (
		<CardForCharacters key={index} people={people} />
	));

	return (
		<>
				<div className="m-5">
					<h1>Characters</h1>
					<div className="scrollmenu d-flex">
						{eachCharacter}
					</div>
				</div>
				<div className="m-5">
					<h1>Planets</h1>
					<div className="scrollmenu d-flex">
						eachPlanet
					</div>
				</div>
				<div className="m-5">
					<h1>Vehicles</h1>
					<div className="scrollmenu d-flex">
						eachVehicle
					</div>
				</div>
			</>
	);
}
