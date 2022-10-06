import {config} from 'dotenv';

const { parsed } = config();

export const {
    PORT,
    MODE,
    DB_URL,
    SECRET,
    mode= MODE === 'development',
    DB=mode?"mongodb://localhost:27017/forefest":DB_URL,
} = parsed;