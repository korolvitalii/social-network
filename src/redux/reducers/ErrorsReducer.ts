import { ActionsType } from '../actions/ErrorsActions';

const SET_ERROR = 'SN/ERRORACTIONS/SET_ERROR';
const RESET_ERROR = 'SN/ERRORACTIONS/RESET_ERROR';

const initialState = {
  errors: '' as string,
};

type InitialStateType = typeof initialState;

export const ErrorsReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case SET_ERROR: {
      return { ...state, errors: action.payload.error };
    }
    case RESET_ERROR: {
      return { ...state, errors: '' };
    }
    default:
      return state;
  }
};
