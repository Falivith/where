import axios from 'axios';
import Cookies from 'js-cookie';

export const baseUrl = axios.create({
  baseURL: 'http://localhost:3000'
});

export async function createEvent(formdata: FormData) {
  try {

    const token = Cookies.get('where-access-token');

    const response = await baseUrl.post('/events', formdata, {
      headers: {
        'where-access-token': token,
      },
    });

    console.log("Res (EventCreate): ", response);
    
    return response.data;
  } catch (error) {
    console.error("Erro ao criar evento: ", error);
    throw error;
  }
}

export async function getEvents() {
  try {

    const token = Cookies.get('where-access-token');

    const response = await baseUrl.get('/events/all', {
      headers: {
        'where-access-token': token,
      },
    });
    
    return response.data;
  } catch (error) {
    console.error("Erro ao Pegar eventos ", error);
    throw error;
  }
}

export async function getOneEvent(id: string) {
  try {
    const token = Cookies.get('where-access-token');

    const response = await baseUrl.get(`/events/${id}`, {
      headers: {
        'where-access-token': token,
      },
    });
    
    return response.data;
  } catch (error) {
    console.error("Erro ao Pegar eventos ", error);
    throw error;
  }
}

export async function confirmarParticipacao(codEvento: number, confirmed: boolean) {
  try {
    const token = Cookies.get('where-access-token');

    const json = {
      codEvento_fk: codEvento,
      confirmado: confirmed
    }

    const response = await baseUrl.post(`/participate`, json, {
      headers: {
        'where-access-token': token,
      },
    });
    
    return response.data;
  } catch (error) {
    console.error("Erro ao confirmar participação ", error);
    throw error;
  }
}



