import { BASE_URL } from '../service/constant';
import axios, {AxiosResponse} from 'axios';
import { Events } from '../types/events';

    async function processRequest<T>(
        method: 'GET' | 'POST',
        url: string,
        data?: unknown
      ): Promise<T> {
        try {
          const response: AxiosResponse<T> = await axios({ method, url, data })
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
      
    export const getEvents = async () => {
        const url = BASE_URL + 'api/v1/events'
        try {
            const response = await processRequest<Events>('GET',url)
            return response
                
            } catch (error){
            console.log(error);
           
        };
    }


