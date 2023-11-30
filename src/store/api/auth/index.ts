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

// const useAuthWithGoogle = () => {
//     const { value, toggle } = useToggle(false);
//     const loginWithGoogle = async () => {
//         toggle();
//         try {
//             const { data } = await axiosInstance.get(AUTH_API.LOGIN_GOOGLE);
//             return data;
//         } catch (error) {
//             console.log(error);
//         }
//         toggle();
//     };

//     return {
//         isLoading: value,
//         loginWithGoogle,
//     };
// };

// const loginWithGoogle = async (): Promise<ILogInResponse> => {
//     const { data }: AxiosResponse<ILogInResponse> = await axiosInstance.get(
//         AUTH_API.LOGIN_GOOGLE
//     );
//     return data;
// };

export default refresh;
