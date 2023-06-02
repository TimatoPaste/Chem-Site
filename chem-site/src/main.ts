import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

//need to import parse to use back4app 

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));