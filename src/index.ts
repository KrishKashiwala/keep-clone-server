import 'reflect-metadata';
import { ApolloServer, gql, UserInputError } from 'apollo-server'
const logger = require('morgan');
const Express = require('express')
const cors = require('cors');
require('dotenv').config();
require('./server');
const Notes = require('./Model/Note')
const resolvers = {
	Query: {
		notes: async () => {
			return await Notes.find({})
		}
	},
	Mutation: {
		createNote: async (_: any, args: any) => {
			const newNote = await new Notes({
				title: args.title,
				des: args.des
			})
			const returnData = {
				title: args.title,
				des: args.des
			}
			await newNote.save()
			console.log(newNote)
			return returnData
		},
		updateNote: async (_: any, args: any): Promise<any> => {
			try {
				console.log(args)
				const newlyData = await Notes.updateOne({ _id: args.id }, { title: args.title, des: args.des }, {
					upsert: true
				})
				console.log(`newDAta is here : ${newlyData}`)
				return 'Record Updated!..'

			} catch (e: any) {
				console.log(e)
				return 'Record not updated@!>..'
			}
		},
		deleteNote: async (_: any, args: any) => {
			try {
				const deleteNote = await Notes.deleteOne({ _id: args.id })
				console.log(deleteNote)
				return 'note deleted!..'
			} catch (e: any) {
				return e;
			}
		}
	}
}
const typeDefs = gql`
	type Note{
		title : String,
		id : String,
		des : String
	}
	type Query {
		notes : [Note]
	}
	type Mutation {
		createNote(title : String , des : String) : Note 
		updateNote(id : String , title : String , des : String) : String
		deleteNote(id : String) : String
	}
`
const main = async () => {
	const app = Express()
	app.use(
		cors({
			credentials: true,
			origin: true
		})
	);
	app.use(logger('dev'));
	app.use(Express.json());
	app.use(Express.urlencoded({ extended: true }));
	const server = new ApolloServer({
		typeDefs, resolvers, context: ({ req }) => req
	})
	server.listen().then(({ url }) => {
		console.log(`🚀  Server ready at ${url}`);
	});
}
main()