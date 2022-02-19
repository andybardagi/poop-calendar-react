import axios from 'axios';

const URL = 'https://poopis-apis.herokuapp.com';

export async function getPoops(userId: string) {
  try {
    const response = await axios.get(`${URL}/poop/${userId}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function newPoop(userId: string) {
  try {
    const response = await axios.post(`${URL}/poop`, {
      _id: userId,
    });
    return response.data;
  } catch (error) {
    throw new Error('Error while saving the poop');
  }
}
