import axios from "axios";
import { getSentence } from "./sentence";
/**
 * @date Jan 07, 2022
 * @author DUC LONG NGUYEN (Paul)
 * @returns 
 */
export const searchSentences= (numberSentence) => async(dispatch) =>{
    try{
        const {data} = await axios.get(`https://api.hatchways.io/assessment/sentences/${numberSentence}`);
        dispatch(getSentence(data));
    } catch(error){
        console.log(error);
    }
}