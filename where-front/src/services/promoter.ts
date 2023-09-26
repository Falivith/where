import axios from 'axios';
import Cookies from 'js-cookie';

export const baseUrl = axios.create({
  baseURL: 'http://localhost:3000'
});

export async function turnOnPromoter() {

  try {

    const token = Cookies.get('where-access-token');

    const response = await baseUrl.post('/user/upgrade', {
        headers: {
            'where-access-token': token,
        },
    });

    console.log("Resposta do servidor:", response);
    
    return response.data;
  } catch (error) {
    console.error("Erro ao se tornar promoter.", error);
    throw error;
  }
}

export async function turnOffPromoter() {

    try {
  
      const token = Cookies.get('where-access-token');
  
      const response = await baseUrl.post('/user/downgrade', {
          headers: {
              'where-access-token': token,
          },
      });
  
      console.log("Resposta do servidor:", response);
      
      return response.data;
    } catch (error) {
      console.error("Erro ao se tornar promoter.", error);
      throw error;
    }
}

export async function promoterChecker() {

    try {
  
      const token = Cookies.get('where-access-token');
  
      const response = await baseUrl.get('/user/promoter', {
          headers: {
              'where-access-token': token,
          },
      });
  
      console.log("Resposta do servidor:", response);
      
      return response.data.isPromoter;
    } catch (error) {
      console.error("Erro ao checar se o user é promoter.", error);
      throw error;
    }
}
