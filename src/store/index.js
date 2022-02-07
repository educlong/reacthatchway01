import { createStore, applyMiddleware, combineReducers } from "redux";
import loggerMiddleware from "redux-logger";
import thunkMiddleware from "redux-thunk";
import sentenceObject from "./sentence";
/**
 * @date Jan 07, 2022
 * @author DUC LONG NGUYEN (Paul)
 * @returns 
 */
const reducerHatchways =combineReducers({
    sentenceObject
})

export default createStore(reducerHatchways, applyMiddleware(thunkMiddleware, loggerMiddleware));
