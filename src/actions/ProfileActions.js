import axios from 'axios'
import { ENDPOINT_ACCOUNT_INFO, ENDPOINT_USER_INFO, ENDPOINT_PROFILE, ENDPOINT_CHANGE_PASSWORD, ENDPOINT_USER_EDUCATION, ENDPOINT_USER_WORK, ENDPOINT_NOTIFICATION, ENDPOINT_COUNTRIES } from '../constants/Api'

export const UPDATE_AUTH_USER_START = 'UPDATE_AUTH_USER_START';
export const UPDATE_AUTH_USER_SUCCESS = 'UPDATE_AUTH_USER_SUCCESS';
export const UPDATE_AUTH_USER_FAILED = 'UPDATE_AUTH_USER_FAILED';
export const UPDATE_ACCOUNT_INFO_START = 'UPDATE_ACCOUNT_INFO_START';
export const UPDATE_ACCOUNT_INFO_SUCCESS = 'UPDATE_ACCOUNT_INFO_SUCCESS';
export const UPDATE_ACCOUNT_INFO_FAILED = 'UPDATE_ACCOUNT_INFO_FAILED';
export const RETRIEVE_PROFILE_START = 'RETRIEVE_PROFILE_START';
export const RETRIEVE_PROFILE_SUCCESS = 'RETRIEVE_PROFILE_SUCCESS';
export const RETRIEVE_PROFILE_FAILED = 'RETRIEVE_PROFILE_FAILED';
export const UPDATE_PROFILE_START = 'UPDATE_PROFILE_START';
export const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS';
export const UPDATE_PROFILE_FAILED = 'UPDATE_PROFILE_FAILED';
export const UPDATE_PASSWORD_START = 'UPDATE_PASSWORD_START';
export const UPDATE_PASSWORD_SUCCESS = 'UPDATE_PASSWORD_SUCCESS';
export const UPDATE_PASSWORD_FAILED = 'UPDATE_PASSWORD_FAILED';
export const CREATE_WORK_START = 'CREATE_WORK_START';
export const CREATE_WORK_SUCCESS = 'CREATE_WORK_SUCCESS';
export const CREATE_WORK_FAILED = 'CREATE_WORK_FAILED';
export const UPDATE_WORK_START = 'UPDATE_WORK_START';
export const UPDATE_WORK_SUCCESS = 'UPDATE_WORK_SUCCESS';
export const UPDATE_WORK_FAILED = 'UPDATE_WORK_FAILED';
export const GET_COUNTRIES_START = 'GET_COUNTRIES_START';
export const GET_COUNTRIES_SUCCESS = 'GET_COUNTRIES_SUCCESS';
export const GET_COUNTRIES_FAILED = 'GET_COUNTRIES_FAILED';

export function updateAuthUser(user) {
    return dispatch => {
        dispatch(updateAuthUserStart());
        if(user.image) {
            var data = new FormData();
            Object.keys(user).map((key, idx) => {
                data.append(key, user[key]);
            });

            $.ajax({
                url: ENDPOINT_USER_INFO,
                type: "PATCH",
                data: data,
                processData: false,
                contentType: false
            }).then(function (data) {
                dispatch(updateAuthUserSuccess(data))
            }, function (data) {
                dispatch(updateAuthUserFailed(data));
            });
        } else {
            return axios.patch(ENDPOINT_USER_INFO, user)
                .then(function(response) {
                    dispatch(updateAuthUserSuccess(response.data))
                }).catch(function(response) {
                    dispatch(updateAuthUserFailed(response.data))
                });
        }
    }
}

export function updateAuthUserStart() {
    return {
        type: UPDATE_AUTH_USER_START
    }
}

export function updateAuthUserSuccess(user) {
    return {
        type: UPDATE_AUTH_USER_SUCCESS,
        user
    }
}

export function updateAuthUserFailed(error) {
    return {
        type: UPDATE_AUTH_USER_FAILED,
        error
    }
}

export function updateAccountInfo(user) {
    return dispatch => {
        dispatch(updateAccountInfoStart());
        return axios.patch(ENDPOINT_ACCOUNT_INFO, user)
            .then(function(response) {
                dispatch(updateAccountInfoSuccess(response.data))
            }).catch(function(response) {
                dispatch(updateAccountInfoFailed(response.data))
            });
    }
}

export function updateAccountInfoStart() {
    return {
        type: UPDATE_ACCOUNT_INFO_START
    }
}

export function updateAccountInfoSuccess(user) {
    return {
        type: UPDATE_ACCOUNT_INFO_SUCCESS,
        user
    }
}

export function updateAccountInfoFailed(error) {
    return {
        type: UPDATE_ACCOUNT_INFO_FAILED,
        error
    }
}

export function retrieveProfile() {
    return dispatch => {
        dispatch(retrieveProfileStart());
        return axios.get(ENDPOINT_USER_INFO)
            .then(function(response) {
                dispatch(retrieveProfileSuccess(response.data))
            }).catch(function(response) {
                dispatch(retrieveProfileFailed(response.data))
            });
    }
}

export function retrieveProfileStart() {
    return {
        type: RETRIEVE_PROFILE_START
    }
}

export function retrieveProfileSuccess(user) {
    return {
        type: RETRIEVE_PROFILE_SUCCESS,
        profile: user.profile,
        work: user.work,
        education: user.education
    }
}

export function retrieveProfileFailed(error) {
    return {
        type: RETRIEVE_PROFILE_FAILED,
        error
    }
}

export function updateProfile(id, profile) {
    return dispatch => {
        dispatch(updateProfileStart(id));
        if(id) {
            return axios.patch(ENDPOINT_PROFILE + id + '/', profile)
                .then(function(response) {
                    dispatch(updateProfileSuccess(response.data))
                }).catch(function(response) {
                    dispatch(updateProfileFailed(response.data))
                });
        } else {
            return axios.post(ENDPOINT_PROFILE, profile)
                .then(function(response) {
                    dispatch(updateProfileSuccess(response.data))
                }).catch(function(response) {
                    dispatch(updateProfileFailed(response.data))
                });
        }
    }
}

export function updateProfileStart(id) {
    return {
        type: UPDATE_PROFILE_START,
        id
    }
}

export function updateProfileSuccess(profile) {
    return {
        type: UPDATE_PROFILE_SUCCESS,
        profile
    }
}

export function updateProfileFailed(error) {
    return {
        type: UPDATE_PROFILE_FAILED,
        error
    }
}

export function updatePassword(credentials) {
    return dispatch => {
        dispatch(updatePasswordStart());
        return axios.post(ENDPOINT_CHANGE_PASSWORD, credentials)
            .then(function(response) {
                dispatch(updatePasswordSuccess())
            }).catch(function(response) {
                dispatch(updatePasswordFailed(response.data))
            });
    }
}

export function updatePasswordStart() {
    return {
        type: UPDATE_PASSWORD_START
    }
}

export function updatePasswordSuccess() {
    return {
        type: UPDATE_PASSWORD_SUCCESS
    }
}

export function updatePasswordFailed(error) {
    return {
        type: UPDATE_PASSWORD_FAILED,
        error
    }
}

export function getCountries() {
    return dispatch => {
        dispatch(getCountriesStart());
        return axios.get(ENDPOINT_COUNTRIES)
            .then(function(response) {
                dispatch(getCountriesSuccess(response.data))
            }).catch(function(response) {
                dispatch(getCountriesFailed(response.data))
            });
    }
}

export function createWork(work) {
    return dispatch => {
        dispatch(createWorkStart(work));
        return axios.post(ENDPOINT_USER_WORK, work)
            .then(function(response) {
                dispatch(createWorkSuccess(response.data))
            }).catch(function(response) {
                dispatch(createWorkFailed(response.data))
            });
    }
}

export function createWorkStart(work) {
    return {
        type: CREATE_WORK_START,
        work
    }
}

export function createWorkSuccess(work) {
    return {
        type: CREATE_WORK_SUCCESS,
        work
    }
}

export function createWorkFailed(error) {
    return {
        type: CREATE_WORK_FAILED,
        error
    }
}

export function updateWork(id, data) {
    return dispatch => {
        dispatch(updateWorkStart(id));
        return axios.patch(ENDPOINT_USER_WORK + id + '/', data)
            .then(function(response) {
                dispatch(updateWorkSuccess(response.data))
            }).catch(function(response) {
                dispatch(updateWorkFailed(response.data))
            });
    }
}

export function updateWorkStart(id) {
    return {
        type: UPDATE_WORK_START,
        id
    }
}

export function updateWorkSuccess(work) {
    return {
        type: UPDATE_WORK_SUCCESS,
        work
    }
}

export function updateWorkFailed(error) {
    return {
        type: UPDATE_WORK_FAILED,
        error
    }
}

export function getCountriesStart() {
    return {
        type: GET_COUNTRIES_START
    }
}

export function getCountriesSuccess(countries) {
    return {
        type: GET_COUNTRIES_SUCCESS,
        countries
    }
}

export function getCountriesFailed(error) {
    return {
        type: GET_COUNTRIES_FAILED,
        error
    }
}
