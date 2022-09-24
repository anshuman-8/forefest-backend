import { ApolloError } from "apollo-server-express";

export default {

  Query: {

  },
  Mutation: {

    createEvent: async (parent, args, { models, user }) => {
        try {
            const { name, description, location, date, time, category, price,  } = args;
            const event = await models.Event.create({
                name,
                description,
                location,
                date,
                time,
                category,
                price,
                creator: user.id
            });
            const creator = await models.User.findById(user.id);
            if (!creator) {
                throw new ApolloError("User not found");
            }
            creator.createdEvents.push(event);
            await creator.save();
            return event;
        } catch (err) {
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

        // const user = await User.findById(userID);
        // if(!user){
        //   throw new ApolloError("User not found");
        // }

        if(event.registrationLimit<=event.registrations.length){
            throw new ApolloError("Registration limit exceeded");
        }
        event.registrations.push(user);
        user.event.push(eventRegisted)

        await event.save();
        user.save();

        return event;
      }catch(err){
        throw new ApolloError(err);
      }
    }
  },

};
