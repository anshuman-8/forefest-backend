import * as yup from 'yup';

export const userSchema = yup.object().shape({
    email: yup.string().email("Email must be a valid email").required(),
    password: yup.string().required().min(5,'Password must be at least 5 characters').max(20,'Password must be at most 20 characters'),
    name: yup.string().required(),
    avatar: yup.string().required(),
    bio: yup.string().required(),
});