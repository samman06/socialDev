import {GET_GROUP,GET_GROUPS,ADD_GROUP} from "../actions/types";

const initialState = {
    group: null,
    groups: null,
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_GROUP:
            return {
                ...state,
                group: action.payload,
                loading: false
            };
        case GET_GROUPS:
            console.log(action.payload);
            return {
                ...state,
                groups: action.payload,
                loading: false
            };
        default:
            return state;
    }

}