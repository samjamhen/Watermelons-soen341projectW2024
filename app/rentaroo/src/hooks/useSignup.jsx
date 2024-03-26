import {useState} from 'react';
import {useAuthContext} from './useAuthContext';

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const {dispatch} = useAuthContext();

    const signup = async (name, email, password, phoneNumber) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('/api/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name, email, password, phoneNumber})
            });
            const json = await response.json();
            if (!response.ok) {
                setIsLoading(false);
                setError(json.error);
            }
            if (response.ok) {
                //Save the user to local storage
                localStorage.setItem('user', JSON.stringify(json));

                //Update the auth context
                dispatch({type: 'LOGIN', payload: json});

                setIsLoading(false);
            }
        } catch (error) {
            setError(error.message);
            setIsLoading(false);
        }
    }

    return {signup, error, isLoading};
}