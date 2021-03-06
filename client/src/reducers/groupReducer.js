import {GET_GROUP,GET_GROUPS,GET_POSTS} from "../actions/types";

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
            return {
                ...state,
                groups: action.payload,
                loading: false
            };
        case GET_POSTS:
            return {
                ...state,
                groups: action.payload,
                loading: false
            };
        default:
            return state;
    }

}