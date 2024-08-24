
import axios, { AxiosError } from 'axios';
import { useUserStore } from '../../store/user/user';


export const handleHttpError = async (error: unknown) => {
    const logOut = useUserStore.getState().logOut;
    if (axios.isAxiosError(error)) {
      // Handle HTTP errors
      switch (error.response?.status) {
        case 401:
          console.log('Unauthorized access - 401');
          logOut()
          // Perform specific action for 401 Unauthorized, e.g., redirect to login
          window.location.href = '/auth/login'; // Redirect to login page using window.location
          break;
  
      }
    } else {
      // Handle non-HTTP errors
      console.log('Error:', error);
    }
  };