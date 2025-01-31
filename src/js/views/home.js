import React, { useContext } from "react";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import { CardItem } from "../component/CardItem";

export const Home = () => {
	const { store } = useContext(Context);

	return (
		<>
				<div className="m-5">
					<h1>Characters</h1>
					<div className="scrollmenu d-flex">
						{store.people.map((character, index) => (
							<CardItem key={index} item={character} type="character" />
						))}
					</div>
				</div>
				<div className="m-5">
					<h1>Planets</h1>
					<div className="scrollmenu d-flex">
						{store.planets.map((planet, index) => (
							<CardItem key={index} item={planet} type="planet" />
						))}
					</div>
				</div>
				<div className="m-5">
					<h1>Vehicles</h1>
					<div className="scrollmenu d-flex">
						{store.vehicles.map((vehicle, index) => (
							<CardItem key={index} item={vehicle} type="vehicle" />
						))}
					</div>
				</div>
			</>
	);
}
