import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
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
                const response: AxiosResponse<Usertype[]> = await API.get('/users');
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
                <div className="content">
                    <Routes>
                        <Route path="/" element={
                            <div className="user-list">
                                {selectedUser ? (
                                    <Link to={`/user/${selectedUser.id}`} className="user-card selected">
                                        <UserOutlined className="user-icon" />
                                        <h2>{selectedUser.name}</h2>
                                        <p>{selectedUser.email}</p>
                                    </Link>
                                ) : (
                                    data.map((user) => (
                                        <Link key={user.id} to={`/user/${user.id}`} className="user-card">
                                            <UserOutlined className="user-icon" />
                                            <h2>{user.name}</h2>
                                            <p>{user.email}</p>
                                        </Link>
                                    ))
                                )}
                            </div>
                        } />
                        <Route path="/user/:id" element={<UserDetails />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
