# HTTP ROUTING:

For this project, we felt that the default
Lumen router was not clean enough to support our
needs. Due that, we have extended it in favor
of something more Readable and Maintainable allowing
us to have more control over the existing endpoints.

We Have a set of route configuration files from which lumen routes
are created, so we have centralized in one place all the related
rules and needs for a single route.

Note: In the future we Hope to have the chance to 
create a documentation builder that will read those
route files and will generate the API
documentation  

# How To Create a Route:  

Routes are added according to its module,
for example, to create a new route for the 
MovementCategories Create action, you should create a 
configuration file on app/Http/Routes/Movement-Categories
Folder.

You can start the configuration file from scratch and complete it 
using the instructions below, but it is always recommendable
to pick a file from  ./app/Http/Routes/Examples
and edit it according to your needs.

# Route configuration explained
    
* *identifier* : Should be same as file name without it extension, it allows us to
    map the request to its configuration, Identifiers should be unique per module
    so you can have two files with the identifier "create" as long as you have it 
    on different modules.
    
* *requestType* : Define  Method of the request Valid values are "GET, POST, 
    PUT, PATCH and DELETE"
    
* *endpoint* : Define the route endpoint, valid values are any valid Lumen route value. (https://lumen.laravel.com/docs/5.4/routing)

* *controller* : Define Which will be the controller that will be the responsible to handle request against this endpoint/route. 

* *action* : Define which will be the controller action that will handle the Incoming request to this endpooit. 

* *authorizationMiddleWare* : Accepts "true" or "false" Define if the authorization middleware should be used for this request,
The authorization middleware Checks if the user have the proper privileges to execute the proposed action.

* *authenticationMiddleware* : Accepts "true" or "false" Define if the AuthenticationMiddleware should be used on his request, if used, 
the user should be logged (sending a Valid Token) to be able to execute the proposed action.

* *validationMiddleware* : Accepts "true" or "false" it define if the ValidationMiddleware should be used on this request.
If used, a set of validation will be run (defined in *ValidationRules*) if the validation do not pass, the proposed action will 
not be executed and the request will be rejected as Bad Request informing about the validation errors.

* *validationRules* : A Json object that defines as properties the values that could be on the request body and its type.
You can see documentation at: https://laravel.com/docs/5.5/validation
       
The following is an example of a configuration file content intended to be used for handling a Request POST to Example/ endpoint (Create Example)
    
    {
      "identifier" : "create",
      "requestType": "POST",
      "endpoint": "/",
      "controller": "ExamplesController",
      "action": "create",
      "purifyInput" : 1
      "authorizationMiddleware": "false",
      "authenticationMiddleware": "false",
      "validationMiddleware": "true",
      "validationRules": {
        "example": "required|string"
      }
    } 
# Check Out our Example routes!

We have created a list of MCVE 
(Minimal Complete Verifiable Example) 
for several different routing use cases, 
That includes a routing configuration file,
A controller that handle the routing action
and the code to retrieve / work with the request
in each different case, Try to use those examples as a guide of Good practices to implement when working with the request object.

See [Routing Configuration Files Examples](./../../backend/app/Http/Routes/Examples).

See [Example Controller](./../../backend//app/Http/Controllers/ExamplesController.php).

Check it out!