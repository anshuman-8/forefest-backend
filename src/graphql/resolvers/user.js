import { hash, genSaltSync, compare } from 'bcryptjs';
import { ApolloError } from "apollo-server-express";
import { issueToken, serializeUser } from '../../functions';
import {userLoginValidator,userRegisterValidator} from '../../validator';
// import { User } from '../../models';

export default {
    Query: {
        hello: () => {return ('Hello Dev server is up and working')},


        user: async (parent, args, { User }) => {
            const {id} = args;
            return await User.findById(id).populate('events').populate('eventRegisted').populate('events').populate('likes').populate('following').populate('followers');
        },


        users: async (parent, args, { User },info) => {
            return await User.find().populate('following').populate('followers');
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
        },

        authUser: async (parent, args, {user,User, isAuth}, info) => {
            try{
                if(!isAuth || user===null){
                    throw new ApolloError("User not logged in");
                }
                // user=user.populate('events').populate('eventRegisted').populate('eventLiked');
                user=await User.findById(user).populate('events').populate('eventRegisted').populate('events').populate('likes').populate('following').populate('followers');
                return user;

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

            if(avatar===null){
                user.avatar=`https://robohash.org/${email}?gravatar=yes`
            }
            console.log(user)
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

        updateUser: async (parent, args, { User, user, isAuth }, info) => {
            try{
                if(!isAuth || user===null){
                    throw new ApolloError("User not logged in");
                }
                user=await User.findByIdAndUpdate(user.id,args.user,{new:true})
                return user;

            }catch(err){
                throw new ApolloError(err);
            }
        }

    }
};
