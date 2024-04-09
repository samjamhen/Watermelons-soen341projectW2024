import {useAuthContext} from './useAuthContext';

export const useLogout = () => {
    const {dispatch} = useAuthContext();

    const logout = () => {

        //Remove user from storage
        localStorage.removeItem('user');

        // Dispatch logout action
        dispatch({type: 'LOGOUT'});

        // Redirect to home page
        window.location.href = '/Home';
    }

    return {logout};
}