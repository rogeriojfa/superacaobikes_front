import { useReducer } from 'react'

const STATE_INICIAL = {
    Resultado: ''
}

const somaReducer = (state, action) => {
    switch (action.type) {
        case 'SUBTRACAO': 
        case 'SOMA': 
            return {...state, resultado: action.payload}
        default:
            return state;
    }

}

const useStore = () => useReducer(somaReducer, STATE_INICIAL)

export default useStore