
const baseUrl = 'https://rickandmortyapi.com/api' // Normally this URL goes into your .env file. read more here: https://create-react-app.dev/docs/adding-custom-environment-variables/


//Axios api config, see: https://axios-http.com/docs/req_config . To keep it fairly simple, I (for now) only include a baseUrl and transformRequest.
export const apiConfig = {
    baseURL: baseUrl,
    transformRequest: [function (data, headers) {
      // Do whatever you want to transform the data
  
      return data;
    }],
  
}