import { baseUrl } from "./Constants";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

function getItems() {
  return fetch(`${baseUrl}/items`, {
    headers: {
      "Content-Type": "application/json",
    },
  }).then(checkResponse);
}

function addItem({name,weather,imageUrl},token) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:`Bearer ${token}`
    },
    body: JSON.stringify({name,weather,imageUrl}),
  }).then(checkResponse);
}

function deleteItem(item,token) {
  return fetch(`${baseUrl}/items/${item._id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization:`Bearer ${token}`
      
    },
  }).then(checkResponse);
}
function login({ email, password}) {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ email ,password }),
  }).then(checkResponse);
};

function registerUser({ email, password, name, avatar }) {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`
    },body: JSON.stringify({ email, password, name, avatar })
    
  }).then(checkResponse);
}
 const checkTokenValidity = (token)=>{
  return fetch(`${baseUrl}/users/me`,{
    method:"GET",
    headers:{
      "content-type":"application/json",
      authorization:`bearer${token}`,
    },
  }).then(checkResponse)
}
export { getItems, addItem, deleteItem,checkResponse};