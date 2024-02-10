import { API_URL } from "../utils/constants";

export async function getUsers({ searchTerm, page }) {
  try {
    const start = (page - 1) * 10;
    let url = `${API_URL}/users`;

    if (searchTerm) {
      url += `/search?q=${searchTerm}&skip=${start}&limit=${10}`;
    } else {
      url += `?skip=${start}&limit=${10}`;
    }

    const response = await fetch(url);

    if (!response.ok) throw new Error("Could not load the users Data!");

    const data = await response.json();
    return data;
  } catch (err) {
    throw err;
  }
}

export async function getUser({ id }) {
  try {
    const response = await fetch(`${API_URL}/users/${id}`);

    if (!response.ok) throw new Error("Could not load the user Data!");

    const data = await response.json();
    return data;
  } catch (err) {
    throw err;
  }
}

export async function addUser(newUserData) {
  try {
    const response = await fetch(`${API_URL}/users/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUserData),
    });
    console.log(response);
    if (!response.ok) {
      throw new Error("Could not create a new user. Please try again!");
    }

    const data = await response.json();

    return data;
  } catch (err) {
    throw err;
  }
}
