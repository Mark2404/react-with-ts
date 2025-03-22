import { useEffect, useState } from "react";
import API from "./API";
import { Usertype } from "./types";
import { AxiosResponse } from "axios";
import Header from "./components/header/header";
import "./App.scss"; 

const App = () => {
    const [data, setData] = useState<Usertype[]>([]);

    useEffect(() => {
        async function getData() {
            try {
                const response: AxiosResponse<Usertype[]> = await API.get('/users', {
                    params: { _limit: 100 }
                });

                setData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        getData();
    }, []);

    return (
        <div className="app-container">
            <Header />
            <div className="user-list">
                {data.map((user) => (
                    <div key={user.id} className="user-card">
                        <h2>{user.name}</h2>
                        <p>{user.email}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;
