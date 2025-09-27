import axios from "axios"
import { ACCESS_TOKEN } from "./constants"

const api = axios.create({
    baseURL:import.meta.env.VITE_API_URL,
    withCredentials: true

})
api.interceptors.request.use(
    (config)=>{
        const token =localStorage.getItem(ACCESS_TOKEN);
        if(token){
            config.headers.Authorization=`Bearer ${token}`;
        }
        return config;
    },
    (error)=>{
        return Promise.reject(error)
    }
)

// Video Call APIs
export const initiateCall = (providerUsername) => 
  api.post('/api/initiate-call/', { provider_username: providerUsername });

export const getCallHistory = () => 
  api.get('/api/call-history/');

export const markAsSeen = (notificationIds) => 
    api.post('/api/mark-seen/', { notification_ids: notificationIds });
// Profile APIs
export const getProviderProfile = () => 
  api.get('/provider-profile/');

export const getSeekerProfile = () => 
  api.get('/seeker-profile/');


export default api