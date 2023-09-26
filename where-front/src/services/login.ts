import axios from 'axios';
import Cookies from 'js-cookie';

export const baseUrl = axios.create({
  baseURL: 'http://localhost:3000'
});

export async function login(email: string, password: string) { // Tipando os parâmetros como string
  const credentials = {
    email,
    password
  };

  try {
    const response = await baseUrl.post('/login', credentials);
    console.log("Resposta do servidor:", response);
    
    return response.data;
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    throw error;
  }
}

export async function testRoute() {
  try {
    const token = Cookies.get('where-access-token');
    
    const response = await baseUrl.get('/user', token);
    
    console.log(response.data);
  } catch (error) {
    console.error('Erro na requisição:', error);
  }
}

export async function TESTEROTASAFONSO() {
  try {
    const token = Cookies.get('where-access-token');
    
    const response = await baseUrl.get('/user', token);
    
    console.log(response.data);
  } catch (error) {
    console.error('Erro na requisição:', error);
  }
}
