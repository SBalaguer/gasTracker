import axios from 'axios'
import contractData from '../Static/contractInfo.json'

export const getData = async (name) =>{
    try{
        const response = await axios.post(`${process.env.BACKEND_URL}/gas`,{[name]:contractData[name]})
        return response
    }catch(error){
        console.log(error)
    }
}