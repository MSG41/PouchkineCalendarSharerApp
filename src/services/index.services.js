import charactersServices from './characters.services'
import LocationService from './location.services'
import postsService from './posts.service'


//In this file we create a function that returns an object of services. We can then access the different services by using services.[serviceName].[serviceMethod()] for example services.characters.getAllCharacters().
// The postsService is an example with Fetch.
// The charatersService uses an Axios instance (middleware). Both use the .then() notation.
class Services {
    constructor() {
        this.characters = new charactersServices() //uses Axios
        this.posts = new postsService() // uses Fetch
        this.locations = new LocationService() // uses Axios
    }
}

export default new Services();