import * as Actions from '../../actions/main/index';

const initialState = {
  services: [],
  currentService: {},
  bookedServices: [],
  serviceAdded: false,
  registerProvider: false,
  providerInfo: {}
};

const serviceReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_BOOK_INFO_OF_SERVICE:
    {
      // console.log('[Reducer] GET_BOOK_INFO_OF_SERVICE', action.payload);
      return { ...state, bookInfo: action.payload };
    }
    case Actions.PROVIDER_INFO:
    {
      // console.log('[Reducer] PROVIDER_INFO', action.payload);
      return { ...state, providerInfo: action.payload };
    }
    case Actions.SERVICE_PROVIDER_SUCCESS:
    {
      // console.log('[Reducer] SERVICE_PROVIDER_SUCCESS', action.payload);
      return { ...state, registerProvider: action.payload };
    }
    case Actions.GET_BOOK_LIST_OF_SERVICE:
    {
      // console.log('[Reducer] GET_BOOK_SERVICES', action.payload);
      return { ...state, bookList: action.payload };
    }
    case Actions.GET_BOOK_SERVICES:
    {
      // console.log('[Reducer] GET_BOOK_SERVICES', action.payload);
      return { ...state, bookedServices: action.payload };
    }
    case Actions.BOOK_SERVICE:
    {
      // console.log('[Reducer] BOOK_SERVICE', action.payload);
      return { ...state, bookedServices: [...state.bookedServices, action.payload] };
    }
    case Actions.SERVICE_ADDED:
    {
      // console.log('[Reducer] SERVICE_ADDED', action.payload);
      return { ...state, serviceAdded: action.payload };
    }
    case Actions.SERVICE_LIST:
    {
      // console.log('[Reducer] SET_ALL_SERVICE', action.payload);
      return { ...state, services: action.payload };
    }
    case Actions.ADD_SERVICE:
    {
      // console.log('[Reducer] SERVICE_ADD', action.payload);
      return { ...state, services: [...state.services, action.payload] };
    }
    case Actions.SET_CURRENT_SERVICE:
    {
      // console.log('[Reducer] SET_CURRENT_SERVICE', action.payload);
      return { ...state, currentService: action.payload.service };
    }
    default:
    {
      return state;
    }
  }
};

export default serviceReducer;
