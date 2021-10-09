import { HOSTNAME } from '../config/keys';

const addClub = async (state) => {
    state.isLoading = true;
    console.log(`name: ${state.club.name}, league: ${state.club.league}`);

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: `
                    mutation{
                        addClub(name: "${state.club.name}", league: "${state.club.league}"){
                            name 
                            league
                            id
                        }
                    }
                `
        }),
    };
    const response = await fetch(HOSTNAME, options);
    // console.log(response);
    const text = await response.text();
    const jsonRes = JSON.parse(text);
    console.log(jsonRes);
    state.isLoading = false;
    // return jsonRes.data.clubs;
}


const deleteClub = async (state, id) => {
    state.isLoading = true;


    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: `
                mutation{
                    deleteClub(id:"${id}"){
                        name
                    }
                }
                `
        }),
    };
    const response = await fetch(HOSTNAME, options);
    console.log("Delete item - ",response);
    state.isLoading = false;
    // return jsonRes.data.clubs;
}



const updateClub = async (state, id) => {
    state.isLoading = true;

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: `
                    mutation{
                        updateClub(id:"${id}", name:"${state.club.name}", league:"${state.club.league}"){
                            id
                            name
                            league
                          }
                    }
                `
        }),
    };
    const response = await fetch(HOSTNAME, options);
    console.log("Update clubs ",response);
    state.isLoading = false;
    // return jsonRes.data.clubs;
}





export { addClub, deleteClub, updateClub };