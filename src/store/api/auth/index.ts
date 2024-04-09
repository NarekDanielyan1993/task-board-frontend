import { AxiosResponse } from 'axios';
import { AUTH_API } from 'src/constant';
import { ILogInResponse } from 'src/types/auth';
import { axiosInstance } from 'src/utills/apiRequest';

const refresh = async (): Promise<ILogInResponse> => {
    const { data }: AxiosResponse<ILogInResponse> = await axiosInstance.put(
        AUTH_API.REFRESH_TOKEN,
        {},
        { withCredentials: true }
    );
    return data;
};

export default refresh;
