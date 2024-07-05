
# Angular assignment

==Here you will find all the information you need, just scroll a bit more :)==


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.8.

  

## Development server

  

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

  

## Code scaffolding

  

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

  

## Build

  

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

  

## Running unit tests

  

Run `ng test` to execute the unit tests via [Jest](https://jestjs.io/).

## Bottlenecks/gaps/improvements
- We should avoid huge lists like 100 items. It can spoil user experience, especially if 1 item contains heavy calculation or animation. Pagination or virtual scrolling would be a better choice.
- Since every card has animation which is being triggered at page load, it causes a lot of repaint, which could slow down First Page Rendering/First Contentful Paint. We should be careful using huge amount of animations at the same time.
- NgRx is a bit overkill for such a small project, but I implemented as it was requested :). However it always has to be considered whether state management worth to bring to the project or just simply use satefull services and data binding between components. This is why I felt to not store selected Post ID in Store, but in case this project had been bigger and ID had have been used across the application, then it would have make sense to store there.
- I chose this card flipping approach, but of course there is a more simple way to change card content - simply update a variable.
- In the current implementation post.component can be improved -> if new Post object comes as an input prop, then right now it does not refresh the card itself, because I get the keys inside ngOnInit. If needs to be dynamic, then we could use ngOnChanges like for isActive input prop.
- I implemented Loading and Error state, but didn't use it
- By using trackBy function on NgFor, we can make sure that Angular update only the item what was changed and avoid unnecessary DOM manipulation.
- By using OnPush Change Detection Strategy, we can improve performance. In this small application is not really applicable, but we can make sure Angular only checks a component and its subtree if an input prop changed, or event originated from the component or one of its children or CD triggered manually.
- Referring to the previous point: Angular new versions will provide great benefit of using signals, which could reduce unnecessary change detection cycles.
- I used old template syntax, but has a great new syntax :)
- I chose standalone approach, but I know modular ones very well as I used it over the years.
- I prefer testing component level scripts (unit test). DOM manipulations and checking using debugElement is also a common approach, however I like to test those using Cypress within E2E test.
- post.component could be created as a reusable component which is not strictly allow only Post object.
- Environment files could be set it up to store URLs and other env variables.

## Questions & Answers
1. In general using JWT tokens are safe, because it is signed using a secret key or public/private key. The signature keeps the token integrity. However, there are several considerations/aspect which need to be strictly handled to not make it unsafe:
	- Should be stored securely
	- Keep secret key in a safe place to not be exposed for malicious entity
	- Do not store sensitive information in it (can be easily decrypted using free websites)
	- Always has to be verified by backend/webservices
2. HTML injection - it meant to inject some HTML elements which has malicious script in it or prevent to be an authorized/official site (similar view). With this approach user wouldn't recognize the differences and will share personal/sensitive data or most likely bank account numbers, login username/password. Sanitizing HTML, Content-Security-Policy, validating inputs could mitigate these attacks.
XSS attack - By opening it, client computer will run the script, and could cause harmful actions or steal data. This is a bit advanced attack, because user doesn't necessarily taking any actions except opening a website. Script could stole session, login information (credentials), cookies. Attacker can act behalf of user identity. Similarly sanitizing HTML, Content-Security-Policy, validating inputs could mitigate these attacks, also using appropriate headers like Content-Type. Despite these 2 attack, it is always good practice, to run application using HTTPS (encrypted protocol) and avoid cross-site cookies.
3. Briefly mutable object are those which was modified/updated during application run like modifying an existing object property value. Immutable object which is not modified, and has the initial values. Like readonly properties -> can be assigned with value once, then later cannot be modified. Primitives are immutable like string, but an Object also can be immutable if we use freeze static method. I think the biggest advantage is predictability and stability. It does not cause side-effects, also a code-base with full of immutable approach is much simpler to debug since mutation could hide errors and issues easily. Disadvantage is sometimes boilerplate code lines as it increase the number of lines, as we need to spread original values into a new variable. Could be hard to read, and overusing could cause much more memory allocation. In my code I focused on spreading object (ngrx reducer), using const and readonly where it was possible, last but not least using many JavaScript HOF (higher-order-functions) like map() which make sure immutability. 
4. As I already mentioned before under "Bottlenecks/gaps/improvements" section there are several techniques to improve performance of an Angular app. Let me add more:
	- Lazy loading components/modules, makes application lightweight for first load, and download script when it is necessary.
	- Prevent memory leak - rxjs subscriptions should be unsubscribed if component destroyed, better way: use async pipe as it do it under the hood.
	- Use different change detection strategy (OnPush), or for external scripts run it outside of Zone as it could trigger change detection.
	- For huge lists/arrays, use pagination/virtual scrolling and trackBy function.
	- Reduce bundle size -> mitigate code duplication, create reusable components, and make reusable CSS classes (Angular tree shake the project, so unused scripts files are not included)
	- Reduce HTTP calls if possible
	- Caching (Service Workers or simply HTTP cache)
	- Load small things first, use loading spinner/skeleton to show some result to the user
	- FIRST: Measure (Core Web Vitals) metrics, and THEN act accordingly!!!!!