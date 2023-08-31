import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { network } from "../config/network";

export default function SaveUser() {
    
    const { token } = useParams();
    const history = useHistory();

    useEffect(async () => {
        localStorage.setItem('@token', token);

        const config = {
            headers: {
              'x-access-token': token
            }
        };
      
        const apiUrl = network.api+'/user/yourinfo';    
        axios.get(apiUrl, config)
        .then(response => {
            localStorage.setItem('@user', JSON.stringify(response.data));
            history.push('/');
        })
        .catch(error => {
            console.error(error);
        });
    }, [token]);


    
    return (
        <div>
            loading...
        </div>
    )
}