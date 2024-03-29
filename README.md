# Description

The objective of this project is to develop a network application based on the client/server architecture. The project involves building a web application for a simple traveling website. The website allows users to search for various traveling destinations, create an account, and manage their "want-to-go" list. The development phase of the website will initially be hosted on the local machine and later deployed online using a cloud platform.

## Components

1. Users Login (Main Page):

    * Registered users can log in using their stored username and password.
    * Unregistered users receive an error message when attempting to log in.
  
2. User Registration:

    * Users can create an account with a unique username and password.
    * User information is stored in a MongoDB database.
    * Error messages are displayed for duplicate usernames or empty fields.
    * After successful registration, users are redirected to the login page.

3. Home Page:

    * The home page displays destination categories (e.g., Beaches, Mountains).
    * Users can view their "want-to-go" list.
    * Clicking on a category redirects users to the category's page.

4. Category Page:

    * Each category page shows destinations within that category.
    * Clicking on a destination's name redirects users to the destination's page.

5. Destination Page:

    * The destination page provides a description of the destination.
    * An embedded link for a video describing the destination is available for streaming.
    * An "add to want-to-go list" button allows users to add the destination to their list.
    * Duplicate destinations in the user's list trigger an error message.

6. Want-to-Go List Page:

    * The want-to-go list page displays destinations previously added by the user.
    * A button on the home page allows users to view their own want-to-go list.

7. Search:

    * A search bar is available on all pages (except login and registration).
    * Search is performed based on destination names.
    * Search results show destinations matching the search keyword.
    * Clicking on a search result redirects users to the specific destination's page.

8. Deployment:

    * After developing the web application locally, it needs to be deployed a cloud platform.
    * The deployment will be done using Git to push the code from a repository to a Heroku app.

### Technologies

* Node.js
* Express (web application framework)
* Visual Studio Code (IDE)
* MongoDB (NoSQL database)
* Embedded JavaScript (EJS) (template engine)
* Express-Session (session management)
