const baseUrl = "http://localhost:3001";

export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}
function login({ email, password}) {
    return fetch(`${baseUrl}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email ,password }),
    }).then(checkResponse);
  };
  
  function registerUser({ email, password, name, avatar }) {
    return fetch(`${baseUrl}/items/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },body: JSON.stringify({ email, password, name, avatar })
  
    }).then(checkResponse);
  }