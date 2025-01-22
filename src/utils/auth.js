const baseUrl = "http://localhost:3001";
import { checkResponse } from "./Api";

function logIn({ email, password}) {
    return fetch(`${baseUrl}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email ,password }),
    }).then(checkResponse);
  };
  
  function registerUser({ email, password, name, avatar }) {
    return fetch(`${baseUrl}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },body: JSON.stringify({ email, password, name, avatar })
  
    }).then(checkResponse);
  }
  const getUserProfile =(token) => {
    return fetch(`${baseUrl}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }).then(checkResponse);
  };
  const editUserProfile =({ name, avatar }, token) => {
    return fetch(`${baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, avatar }),
    }).then(checkResponse);
  };
  const addCardLike=(id,token)=>{
    return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse) };

  const removeCardLike=(id,token)=>{
    return fetch(`${baseUrl}/items/${id}/likes`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }).then(checkResponse)
  }

  export  {logIn,registerUser,getUserProfile,editUserProfile,addCardLike,removeCardLike};