import rootService from './root.service';

class LocationService extends rootService {
   //
    getAllLocations = async () => {
        return await this.api.get('/location').then((response) => response.data)
    }


    // I prefer .then because we catch the errors in the store. And also less code ;)

    // getAllLocations = async () => {
    //     const res = await this.api.get('/locations')
    //     return res.data
    // }
}

export default LocationService;