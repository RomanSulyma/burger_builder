import axiosInstance from "./axiosConfig";

export const getOrderCustomer = async (token) => {
    return await axiosInstance.get('/burger/customer', {
        headers: {'Authorization': token}
    });
};

export const getBurger = async () => {
    return await axiosInstance.get('/burger');
};

export const fetchValidationInputs = async () => {
    return await axiosInstance.get('/validation-inputs');
};

export const fetchLastBurger = async () => {
    return await axiosInstance.get('/burger/last');
};

export const buyBurger = async (token, burgerForm) => {
    return await axiosInstance.post('/burger', burgerForm, {
        headers: {'Authorization': token}
    });
};

export const signIn = async (signInForm) => {
    return await axiosInstance.post('/auth/signin', signInForm);
};

export const signUp = async (signUpForm) => {
    return  await axiosInstance.post('/auth/signup', signUpForm);
};

export const getIngredients = async () => {
    return await axiosInstance.get('/ingredients');
};
