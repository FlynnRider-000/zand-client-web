import * as Actions from '../../actions/main/index';

const initialState = {
  docTypes: [],
  comments: [],
  documents: [],
  editHistory: []
};

const requestReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.PRODUCT_CATEGORY_TYPES:
    {
      // console.log('[Reducer] PRODUCT_CATEGORY_TYPES', action.payload);
      return { ...state, productCategories: action.payload };
    }
    case Actions.EDIT_REQUEST:
    {
      // console.log('[Reducer] EDIT_REQUEST', action.payload);
      return { ...state, editHistory: [...state.editHistory, action.payload] };
    }
    case Actions.DOC_TYPES:
    {
      // console.log('[Reducer] DOC_TYPES', action.payload);
      return { ...state, docTypes: action.payload };
    }
    case Actions.ADD_COMMENT:
    {
      // console.log('[Reducer] ADD_COMMENT', action.payload);
      return {
        ...state, comments: [...state.comments, action.payload]
      };
    }
    case Actions.SET_RUQUEST_CONTENT:
    {
      // console.log('[Reducer] SET_RUQUEST_CONTENT', action.payload);
      return {
        ...state, documents: action.payload.documents, files: action.payload.files, comments: action.payload.comments, editHistory: action.payload.editHistory
      };
    }
    case Actions.SET_CURRENT_REQUEST:
    {
      // console.log('[Reducer] SET_CURRENT_REQUEST', action.payload);
      return { ...state, currentRequest: action.payload.req, backUrl: action.payload.url };
    }
    default:
    {
      return state;
    }
  }
};

export default requestReducer;
