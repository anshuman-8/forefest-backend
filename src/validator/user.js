import * as yup from 'yup';


const name= yup.string().min(2,'Password must be at least 2 characters').required();

const email= yup.string().email("Email must be a valid email").required();

const password= yup.string().required().min(6,'Password must be at least 6 characters').max(20,'Password must be at most 20 characters').matches(/^[a-zA-Z0-9 ]+$/,'Name must be alphanumeric');

const confirmPassword= yup.string().oneOf([yup.ref('password'),null],'Passwords must match').required();

const avatar = yup.string().url('Avatar must be a valid url');

const bio= yup.string().max(250,'Bio must be at most 250 characters');

export const userRegisterValidator = yup.object().shape({
    email,
    name,
    password,
    avatar,
    bio,
});

export const userLoginValidator = yup.object().shape({
    email,
    password,
});

