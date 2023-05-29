import { BASE_URL } from '../service/constant';
import axios, {AxiosResponse} from 'axios';
import { Events } from '../types/events';

    async function processRequest<T>(
        method: 'GET' | 'POST',
        url: string,
        data?: unknown
      ): Promise<T> {
        try {
          const response: AxiosResponse<T> = await axios({ method, url, data,
            headers: {
                Accept:'application/json'
            }
         })
          if (response.status === 200 || response.status === 201) {
            return response.data
          } else if (response.status === 400) {
            throw new Error('Bad request')
          } else if (response.status >= 500) {
            throw new Error('Server not responding')
          } else {
            throw new Error(`Server returned the status code ${response.status}`)
          }
        } catch (error) {
          throw new Error(
            `There is an error with the ${method} request to ${url}: ${error}`
          )
        }
      }

      const checkArray = (data: unknown) => {
        if (Array.isArray(data)) {
          return data
        } else {
          return []
        }
      }
      
    export const getEvents = async (): Promise<Events> => {
        const url = BASE_URL + 'api/v1/events'
        try {
            const response = await processRequest<Events>('GET',url)
            return checkArray(response)
                
            } catch (error){
            console.log(error);
            return []
        };
    }


