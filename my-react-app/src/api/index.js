import axios from "axios"
const BASE_URL = "https://fitnesstrac-kr.herokuapp.com/api/";

// export const api = axios.create({
//     baseURL: `${BASE_URL}/api`,
//   })
//   export const callApi = async ({url, method, token, body}) => {

//     console.log({url: `${BASE_URL}/api${url}`, method, token, body})

//     try {
//       const options = {
//         method: method ? method.toLowerCase() : 'get',
//         url: `${BASE_URL}/api${url}`,
//         data: body,
//       };
//       if(token) {
//         options.headers = {'Authorization': `Bearer ${token}`};
//       }
//       const {data} = await api(options);
//       if(data.error) throw data.error;

//       return data;
//     } catch (error) {
//       const errToThrow = error?.response?.data?.error; // handle axios 400- and 500-level errors
//       console.error(errToThrow);
//     }
//   }

export const fetchRoutines = async () => {

    try{
        const { data } = await axios.get(`${BASE_URL}/routines`);
        return data;

    } catch(error){
        console.error(error);
    }
}


