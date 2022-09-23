import { hash, genSaltSync, compare } from 'bcryptjs';
import { ApolloError } from "apollo-server-express";
import { issueToken, serializeUser } from '../../functions';
import {userLoginValidator,userRegisterValidator} from '../../validator';

export default {
    Query: {
        hello: () => {return ('Hello World')},


        user: async (parent, args, { User }) => {
            const {id} = args;
            return await User.findById(id);
        },


        users: async (parent, args, { User },info) => {
            return await User.find();
        },


        loginUser: async (parent, args, {User}, info) => {
            try{
                const { email, password } = args;

                userLoginValidator.validate({email:email,password:password},);
               

                let user = await User.findOne({email} );
                if (!user) {
                    throw new ApolloError("User not found");
                }

                const match = await compare(password, user.password);
                if (!match) {
                    throw new ApolloError("Invalid password");
                }

                user = user.toObject();
                user.id = user._id;

                user = serializeUser(user);

                let token = await issueToken(user);

                return {token,user};

            }catch(err){
                throw new ApolloError(err);
            }
        }
    },
    Mutation: {
        
        working: () => {
            return ('Working  hard for your fest!!');
        },


        registerNewUser: async (parent, args, { User }, info) => {
            try{
                const { name, email, password, avatar, bio} = args.user;
               
            userRegisterValidator.validate({email:email,password:password,name:name,bio:bio,avatar:avatar},{abortEarly:false});
            
            
            let user= await User.findOne({email});
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

            // console.log({token,User:result})
            return {token,user:result};

            }catch(err){
                throw new ApolloError(err);
            }
            
        },

        registerEvent: async (parent, args, { User }, info)=>{
            try{
                const eventId=args.eventID;
                

            }catch(err){

            }

        }

    }
};
