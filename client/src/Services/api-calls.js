import axios from 'axios'
import contractData from '../Static/contractInfo.json'

const api = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    withCredentials: true
  });

export const getData = async (name) =>{
    console.log(process.env.REACT_APP_BACKEND_URL)
    try{
        const response = await api.post(`/gas`,{[name]:contractData[name]})
        return response
    }catch(error){
        console.log(error)
    }
}