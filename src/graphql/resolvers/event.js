import { ApolloError } from "apollo-server-express";

export default {

  // Query: {

  // },
  Mutation: {

    createEvent: async (parent, args, { Event, user, isAuth }) => {
        try {
            const { title, description, location, date, category, price,  } = args.event;
            if (!isAuth || user === null) {
                throw new ApolloError("user not logged in");
            }
            const eventDate=new Date();
            const dateTime=eventDate;   // has to be removed later for demo only
            const event = await Event.create({
                title,
                description,
                location,
                // category,
                eventDate,
                dateTime,
                price,
                creator: user.id
            });
            user.events.push(event);
            await user.save();
            const time=new Date().toISOString();
            return {user,event,time};
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
        const time=new Date().toISOString();
        return {user,event,time};

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

        const time=new Date().toISOString();
        return {user,event,time};
      }catch(err){
        throw new ApolloError(err);
      }
    }
  },

};
