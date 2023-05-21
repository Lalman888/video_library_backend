import {object,string,TypeOf} from 'zod';

export const registerUserSchema = {
    body: object({
        username: string({
            required_error: 'Username is required'
        }),
        email: string({
            required_error: 'Email is required'
        }).email('Not a valid email'),
        password: string({
            required_error: 'Password is required'
        }).min(6, 'Password must be at least 6 characters'),
        passwordConfirmation: string({
            required_error: 'Password confirmation is required'
        }).min(6, 'Password must be at least 6 characters'),
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: 'Passwords do not match',
        path: ['passwordConfirmation'],
        }),
}

export type RegisterUserBody = TypeOf<typeof registerUserSchema.body>;