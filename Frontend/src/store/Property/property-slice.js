import {createSlice} from "@reduxjs/toolkit"

const propertySlice = createSlice({
    name:"property",
    initialState:{
        properties:[],
        totalProperties:0,
        searchParams:{},
        loading:false,
        error:null
    },
    reducers:{
        getRequest(state){
            state.loading = true
        },
        getProperties(state,action){
            state.properties = action.payload.data;
            state.totalProperties = action.payload.all_Properties;
            state.loading = false;
        },
        updateSearchParams:(state,action) => {
            state.searchParams = Object.keys(action.payload).length === 0 ?{}: {
                ...state.searchParams,
                ...action.payload
            }
        },
        getError(state, action){
            state.error = action.payload
        }

    }
    



})

export const propertyActions = propertySlice.actions;
export default propertySlice

