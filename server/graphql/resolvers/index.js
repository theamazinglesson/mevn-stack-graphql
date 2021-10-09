const { GraphQLObjectType, GraphQLString, GraphQLID } = require('graphql');
const { ClubType } = require('../types');
const Club = require('../../models/Club');


const addClub = {
    name: "addClub",
    type: ClubType,
    args: { name: { type: GraphQLString }, league: { type: GraphQLString } },
    resolve: async (parent, args) => {
        // console.log(args.name, args.league);
        // console.log("New club");
        try {            
            const club = new Club({ name: args.name, league: args.league });
            console.log("New club - ");
            const new_club = await club.save();
            console.log(new_club);
            return new_club;
        } catch (error) {
            console.log(error);
        }
    }
}


const deleteClub = {
    name: "deleteClub",
    type: ClubType,
    args: { id: { type: GraphQLID } },
    resolve: async (parent, args) => {
        const deleted_club = await Club.findByIdAndDelete(args.id);
        return deleted_club;
    }
}


const updateClub = {
    name: "updatelub",
    type: ClubType,
    args: { 
        id: { type: GraphQLID },    
        name: { type: GraphQLString }, 
        league: { type: GraphQLString } 
    },
    resolve: async (parent, args) => {
        const update_club = await Club.findByIdAndUpdate(args.id, {
            name: args.name,
            league: args.league
        });
        return update_club;
    }
}




const RootMutation = new GraphQLObjectType({
    name: "RootMutation",
    fields: {
        addClub,
        deleteClub,
        updateClub
    }
});




module.exports = RootMutation;
