import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

//NEED TO ADD ACL TO MAKE IT SO THAT ONLY THIS APP CAN ACCESS THE DB

	platformBrowserDynamic().bootstrapModule(AppModule)
	  .catch(err => console.error(err));
	

	//database access reference

	//parse is for the back4app database
	import * as Parse from 'parse'

	//connects to the specific database and connects parse api (Parse as any) is for some reason required in order to change the URL
	Parse.initialize('FgJsXpqyLH852BBw5DnuccJOUXLMsysjccWNcBIC', 'h6TiU187AcIgJfQN9sRXildBMvUFiIiBmUP3GtTm');
	(Parse as any).serverURL = 'https://parseapi.back4app.com/';


	export async function add(listName:string, Id: string,resourceName: string, link: string){

		//extend gets db address of a specific class/list. Makes new class/list if it doesn't exist
		//can create and write to new classes because they are public by default
		//auth-only classes will require some ACL config stuff
		let list = Parse.Object.extend(listName);

		//creates new object in the class/list (adding data)
		let add = new list();

		//sets attributes of the data point (attribute, value)
		add.set("Id", Id);
		add.set("Link",link.trim());
		add.set("resourceName",resourceName.trim());

		//pushes the change to the db
		add.save();
	}
	
	export class attributeHolder{ 
		resourceName:string;
		Link:string;
		
		constructor(resourceName:string, Link: string){
			this.resourceName = resourceName;
			this.Link = Link;
		}
	}
	export async function read(listName: string, attribute: string, val: string|number){
		//references db list/class for reading later
		let list = Parse.Object.extend(listName);

		//reader for db
		let query = new Parse.Query(list);

		//primes Parse.Query object to find all objects that have an attribute value that is the same as the input parameters
		query.equalTo(attribute,val);

		//query.find returns Parse.object[], in this case, it pipes into the first function of the then
		//.then returns a promise object that takes one or two functions. Runs 1st one if promise resolved (parameter will be array of Parse.object). Runs 2nd if promise rejected
		let unwrappedObjects: attributeHolder[] = [];
		query.find()
			.then((results)=>{
				for(let a = 0;a<results.length;a++){
					unwrappedObjects.push(new attributeHolder(results[a].get("resourceName"), results[a].get("Link")));
				}
			}).catch((error)=>{
				console.log(error);
			})
		return unwrappedObjects;
		
	}
	let main = async(): Promise<void>=>{
	//figure out how to enable top-level awaits during summer. for now, can just use a main function


	//adds value to database in class Links with Id val 2, resourceName val and Link val
		add("Links","2","Never Gonna Give You Up","https://www.youtube.com/watch?v=dQw4w9WgXcQ");
		
			let thing:attributeHolder[] = await read("Links", "Id","2");
			
			for(let a = 0;a<thing.length;a++){
				console.log(thing[a].resourceName);
				console.log(thing[a].Link);
				console.log("");
			}
	}
	main();
	
	
	//saved some useful stuff in bookmarks to help with ACL and querying + custom object id


	/* notes for arrow notation

		function name(input1,input2){
			[code]
			return input1+input2;
		}

		is the same as

		let name = (input1,input2) => {
			[code]
			return input1+input2;
		}

		or

		let name = (input1,input2) => input1 + input2;

		expression after the arrow in single line is assumed to be returned;




	*/
export{}