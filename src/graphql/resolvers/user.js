import { hash, genSaltSync, compare } from 'bcryptjs';
import { ApolloError } from "apollo-server-express";
import { issueToken, serializeUser } from '../../functions';
// import {loginUserValidator,registerNewUserVadidator} from '../../validators';

export default {
    Query: {
        hello: () => {return ('Hello World')}
    },
    Mutation: {

        registerNewUser: async (parent, args, context, info) => {
            try{
                const { name, email, password} = args.user;
                console.log(args.user);
                const User = context.user;

            // const { errors, valid } = registerNewUserVadidator(args.user);
            // if (!valid) {
            //     throw new ApolloError(errors);
            // }
            
            let user= await User.findOne({where: {email} });
            if (user) {
                throw new ApolloError("User already exists");
            }

            user = new User(args.user);

            const salt = await genSaltSync(10);
            user.password = await hash(password, salt);

            let result = await user.save();

            result= result.toObject();
            result.id=result._id;

            result=serializeUser(result);

            let token = await issueToken(result);
            // const newUser = new User({
            //     name,
            //     email,
            //     password: hashedPassword,
            // });
            // const res = await newUser.save();
            // const token = issueToken(res);

            console.log({token,User:result})
            return {token,user:result};

            }catch(err){
                throw new ApolloError(err);
            }
            
            
        },
    }
};