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
    
    const response = await baseUrl.get('/user', {
      headers: {
        Authorization: `Bearer ${token}`, // Configura o token de acesso no cabeçalho
      },
    });
    
    console.log(response.data); // Supondo que você deseja acessar os dados da resposta
  } catch (error) {
    console.error('Erro na requisição:', error);
  }
}
