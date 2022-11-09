import { createContext, useReducer } from "react"

const INITIAL_STATE = {
    city:undefined,
    date:[],
    options:{
        adult:undefined,
        children:undefined,
        room:undefined,
    },
}

export const SearchContext = createContext(INITIAL_STATE);
const SearchReducer = (state,action) => {
    console.log(action.data,"data is here");
    console.log(action.type,"data is type");

    switch(action.type){
        case "NEW_SEARCH":
            return action.payload;
            case "RESET_SEARCH":
                return INITIAL_STATE
                default :
                return state;
    }
}

export const SearchContextProvider = ({children}) => {
    const [state,dispatch] = useReducer(SearchReducer,INITIAL_STATE);
    return (
        <SearchContext.Provider value={{city:state.destination,date:state.date,options:state.options,dispatch}}>
           {children}
        </SearchContext.Provider>
    )
}