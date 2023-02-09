import rootService from './root.service';

class characterService extends rootService {
    //We extend the root service where this.api is created. therefore we have access to it here.
    getAllCharacters = () => {
        // API code to get all posts
        return this.api.get('/character') // Axios uses the baseUrl and appends the string we pass here (results in rickandmortyapi/api/characters)
            //Axios always returns a response object and in .data is the actual response data.
            .then((response) => response.data)

            //Since we use .then() we do not have to await.
    }

    getSingleCharacter = (id) => {
        return this.api.get(`/character/${id}`).then((response) => response.data)
    }

}

export default characterService;