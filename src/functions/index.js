import {sign} from 'jsonwebtoken';
import { SECRET } from '../config/'; 
import { pick } from 'lodash';

export const issueToken=async (user)=> {

    let token = await sign(user,SECRET,{expiresIn: 60*60*24*7});
    return `Bearer ${token}`;
};

export const serializeUser = user => pick(user,['id','name','email','avatar',"location","bio","phone"]);
