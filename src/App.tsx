import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import API from "./API";
import { Usertype } from "./types";
import { AxiosResponse } from "axios";
import Header from "./components/header/header";
import UserDetails from "./components/details"; 
import "./App.scss";
import { UserOutlined } from "@ant-design/icons";

const App = () => {
    const [data, setData] = useState<Usertype[]>([]);
    const [selectedUser, setSelectedUser] = useState<Usertype | null>(null);

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
        <Router>
            <div className="app-container">
        
                <Header setSelectedUser={setSelectedUser} />
                <Routes>
                    <Route path="/" element={
                        <div className="user-list">
                            {/* ✅ Если выбран пользователь — показываем его */}
                            {selectedUser ? (
                                <a key={selectedUser.id} href={`/user/${selectedUser.id}`} className="user-card">
                                    <UserOutlined style={{ fontSize: '48px' }}/>
                                    <h2>{selectedUser.name}</h2>
                                    <p>{selectedUser.email}</p>
                                </a>
                            ) : (
                                data.map((user) => (
                                    <a key={user.id} href={`/user/${user.id}`} className="user-card">
                                        <UserOutlined style={{ fontSize: '48px' }}/>
                                        <h2>{user.name}</h2>
                                        <p>{user.email}</p>
                                    </a>
                                ))
                            )}
                        </div>
                    } />
                    <Route path="/user/:id" element={<UserDetails />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
