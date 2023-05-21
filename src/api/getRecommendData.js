import { AxiosError } from 'axios';
import { axiosInstance } from './axiosInstance';

export const getRecommendData = async KeywordInput => {
  if (KeywordInput.length === 0) return;

  try {
    const response = await axiosInstance.get('/search-conditions/', {
      params: {
        name: KeywordInput,
      },
    });
    // eslint-disable-next-line no-console
    console.info('calling api');
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response;
    }
    // eslint-disable-next-line no-console
    console.error(error);
  }
};
