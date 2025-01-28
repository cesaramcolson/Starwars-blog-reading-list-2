const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			people: JSON.parse(localStorage.getItem("people")) || [],
			peopleInfo: JSON.parse(localStorage.getItem("peopleInfo")) || {}
		},
		actions: {
			getPeople: async () => {
				const store = getStore();
				if (store.people.length === 0){
					try {
						const resp = await fetch("https://www.swapi.tech/api/people?page=1&limit=83", {
							method: "GET", 
							headers: {
								"Content-type": "application/json"
							}
						});
						if (!resp.ok) {
							throw new Error(`Error Status: ${resp.status}`);
						}
						let data = await resp.json();
						console.log(data);
						setStore({ people: data.results });
						localStorage.setItem("people", JSON.stringify(data.results));
					} catch(error) {
						console.error("Error fetching Data: ", error)
					}
				}
			},
			getPeopleInfo: async (id) => {
				const store = getStore();
				if (!store.peopleInfo[id]) {
					try {
						const resp = await fetch(`https://www.swapi.tech/api/people/${id}`, {
							method: "GET",
							headers: {
								"Content-type": "application/json"
							}
						});
						if (!resp.ok) {
							throw new Error(`Error Status: ${resp.status}`);
						}
						let data = await resp.json();
						setStore({ peopleInfo: {...store.peopleInfo, [id]: data.results.properties } });
					} catch(error) {
						console.error("Error fetching data: ", error)
					}
				}
			}
		}
	};
};

export default getState;
