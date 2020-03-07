import axios from "axios";
const BASEURL = "https://api.giphy.com/v1/gifs/random?api_key=J5dNYggytT7tnI3dF9pmQCVZpg8Btui3&tag=";
// const APIKey = "J5dNYggytT7tnI3dF9pmQCVZpg8Btui3";


export default {
  search: function(content) {
    return axios.get(BASEURL + content);
  }
};