import axios from 'axios'
import contractData from '../Static/contractInfo.json'

const api = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    withCredentials: true
  });

export const getData = async (name) =>{
    try{
        const response = await api.post(`/gas`,{[name]:contractData[name]})
        return response
    }catch(error){
        console.log(error)
    }
}

export const getSummary = async () =>{

    try{
        const response = await api.get(`/data/summary`)
        return response.data
    }catch(error){
        console.log(error)
    }
}

export const addProject = async (body) =>{

    try{
        const response = await api.post(`/contracts/create`, {body})
        return response.data
    }catch(error){
        console.log(error)
    }
}

export const getProjectInfo = async (id) =>{

    try{
        const response = await api.get(`/data/${id}`)
        return response.data
    }catch(error){
        console.log(error)
    }
}