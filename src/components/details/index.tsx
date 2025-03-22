import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../API";
import { Usertype } from "../../types";
import "./index.scss";


const Details = () => {
    const { id } = useParams();
    const [user, setUser] = useState<Usertype | null>(null);

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await API.get(`/users/${id}`);
                setUser(response.data);
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        }
        fetchUser();
    }, [id]);

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <div className="user-details">
            <h1>{user.name}</h1>
         
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <p>Website: {user.website}</p>
            <a href="/">← Back to list</a>
        </div>
    );
};

export default Details;
