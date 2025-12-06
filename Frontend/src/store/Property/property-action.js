import { propertyActions } from "./property-slice";
import { axiosInstance } from "../../utils/axios";
export const getAllProperties =() => async(dispatch,getstate)=>{
try{
dispatch(propertyActions.getRequest())
const{searchParams} = getstate().properties;
const response = await axiosInstance.get(`/v1/rent/listing`,{params : {...searchParams}})
if(!response){
    throw new Error("Could not fetch any properties")
}

const{data}= response;
dispatch(propertyActions.getProperties(data))
}catch(error){
    dispatch(propertyActions.getError(error.response?.data?.error || error.message))
}

}


    
