
import { useCallback, useEffect, useState } from "react";
import type { Planets } from "../types/planets";
import { useNavigate } from "react-router-dom";


function PlanetsList() {
    const [planets, setPlanets] = useState<Planets[]>([]);
    const navigate = useNavigate();

    //loob ühenduse controlleriga, mille nimi on PlanetsController
    const fetchPlanets = useCallback(async () => {
        try {
            const response = await fetch("/api/planets");
            if (response.ok) {
                const data = await response.json();
                setPlanets(data);
            }
        } catch (error) {
            console.error("Fetch error: ", error);
        }
    }, []);

    const openCreate = () => {
        navigate("/planets/create")
    }

    useEffect(() => {

        (async () => {
            await fetchPlanets();
        })();
    }, [fetchPlanets]);

    return (
        <div className="page-card">
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <h1 style={{ margin: 0 }}>Planets List</h1>
                <button type="button" className="success" onClick={openCreate}>
                    + Create
                </button>
            </div>

            {!loading && !error && (
                <table border={1} cellPadding={8} style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    marginTop: 16
                }}>
            )}
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Types</th>
                    </tr>
                </thead>
                <tbody>
                    {planets.length > 0 ? (
                        planets.map((planet) => (
                            <tr key={planet.planetsId}>
                                <td>{planet.planetsId}</td>
                                <td>{planet.name}</td>
                                <td>{planet.type}</td>
                                <td>
                                    siia teha nupp detaili vaatesse
                                </td>
                            </tr>
                        ))
                    ) : (
                            <tr>
                                <td>Loading planets or data not found...</td>
                            </tr>
                    )}
                </tbody>
            </table>
        </>

  );
}

export default PlanetsList;