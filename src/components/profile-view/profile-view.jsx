import React from "react";
import { useState } from "react";

export function ProfileView({ movies, onUpdatedUserInfo }) {
    const [user, setUser] = useState({
        Username: null,
        Password: null,
        Email: null,
        Birthday: null,
        FavoriteMovies: [],
    })
}
