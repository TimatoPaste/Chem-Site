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
	
	
	function add(resourceName: string, link: string){
		
		//extend gets db address of a specific class/list. Makes new class/list if it doesn't exist
		//can create and write to new classes because they are public by default
		//auth-only classes will require some ACL config stuff
		let list = Parse.Object.extend("Links");
		
		//creates new object in the class/list (adding data)
		let add = new list();
		
		//sets attributes of the data point (attribute, value)
		add.set("Link",link.trim());
		add.set("resourceName",resourceName.trim());
		
		//pushes the change to the db
		add.save();
	}
	//let ask = new Parse.Query(person);
	//ask.get(id); returns the object at this id value in the class
	
//saved some useful stuff in bookmarks to help with ACL and querying + custom object id

	
	