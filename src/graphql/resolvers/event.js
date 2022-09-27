import { ApolloError } from "apollo-server-express";

export default {

  Query: {

    events: async (parent, args, { Event }, info) => {
        try {
            const events = await Event.find().populate("creator").populate("registrations").populate("likes");
            return events;
        } catch (err) {
            throw new ApolloError(err);
        }
    },

    event: async (parent, args, { Event }, info) => {
        try {
            const { eventID } = args;
            const event = await Event.findById(eventID).populate("creator").populate("registrations").populate("likes");
            return event;
        } catch (err) {
            throw new ApolloError(err);
        }
    }
  },

  Mutation: {

    createEvent: async (parent, args, { Event, user, isAuth }) => {
        try {
            const { title, description, dateTime,location, category, price, registrationLimit, tags} = args.event;
            if (!isAuth || user === null) {
                throw new ApolloError("user not logged in");
            }
            const createdAt=new Date();
            // console.log(tags)
            const event = await Event.create({
                title,
                description,
                location,
                category,
                createdAt,
                dateTime,
                price,
                tags,
                registrationLimit,
                creator: user
            });

            user.events.push(event);
            await user.save();
            // const time=new Date().toISOString();
            return {user,event};
        } catch (err) {
            throw new ApolloError(err);
        }
    },

    likeAnEvent: async (parent, args, { Event, user, isAuth }, info) => {
      try{
        const { eventID } = args;
        if(!isAuth && user===null){
            throw new ApolloError("user not logged in");
        } 
        const event = await Event.findById(eventID);
        user.likes.push(event)
        event.likes.push(user);
        await user.save()
        await event.save();
        // const time=new Date().toISOString();
        return {user,event};

      }catch(err){
        throw new ApolloError(err);
      }
    },

    unlikeAnEvent: async (parent, args, { Event, user, isAuth }, info) => {
      try{
        const { eventID } = args;
        if(!isAuth && user===null){
            throw new ApolloError("user not logged in");
        } 
        const event = await Event.findById(eventID);
        user.likes.pull(event)
        event.likes.pull(user);
        await user.save()
        await event.save();
        // const time=new Date().toISOString();

        return {user,event};
      }catch(err){
        throw new ApolloError(err);
      }
    },

    registerEvent : async (parent, args, { Event, user, isAuth }, info) => {
      try{
        const { eventID } = args;
        if(!isAuth && user===null){
            throw new ApolloError("user not logged in");
        }
        const event = await Event.findById(eventID);

        if(!event){
          throw new ApolloError("Event not found");
        }

        console.log(event.registrations.includes(user.id))
        if(event.registrationLimit<=event.registrations.length){
            throw new ApolloError("Registration limit exceeded");
        }
        if(event.registrations.includes(user.id)){
            throw new ApolloError("User has already registered");
        }
        event.registrations.push(user);
        user.eventRegisted.push(event)

        await event.save();
        await user.save();

        // const time=new Date().toISOString();
        return {user,event};
      }catch(err){
        throw new ApolloError(err);
      }
    },

    commentOnEvent: async (parent, args, { Event,Comment, user, isAuth }, info) => {
      try{
        const { eventID, text } = args;
        if(!isAuth && user===null){
            throw new ApolloError("user not logged in");
        }
        const event = await Event.findById(eventID);
        const createdAt=new Date().toISOString();
       
        const comment = await Comment.create({
          text,
          user,
          event,
          createdAt
        });
        event.comments.push(comment);
        await event.save();
        await comment.save();
        // const time=createdAt;
        return {user,event};
      }catch(err){
        throw new ApolloError(err);
      }
    }
  },

};
