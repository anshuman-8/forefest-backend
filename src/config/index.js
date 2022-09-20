import {config} from 'dotenv';

const { parsed } = config();

export const {
    PORT,
    MODE,
    mode= MODE === 'development',
    DB="mongodb://localhost:27017/forefest",
} = parsed;