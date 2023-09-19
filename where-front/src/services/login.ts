import axios from 'axios';

export const baseUrl = axios.create({
  baseURL: 'http://localhost:3000'
});

const credentials = {
  "email": "adm@adm.com",
  "password": "12345678"
}

export async function login() {
  //let cookie = document.cookie.split(';');
  const response = await baseUrl.post('/login', credentials)

  console.log("Alo", response);
}
