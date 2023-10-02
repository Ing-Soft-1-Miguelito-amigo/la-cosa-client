import { httpRequest } from "../services/HttpService";

//Check if name has quotation marks
export const valueHasQuotationMarks = (name) => {
  const nameTrimmed = name.trim();
  return nameTrimmed.includes('"');
};

//Make the request to the server
export const createGame = async (data) => {
  try {
    const response = await httpRequest({
      method: "POST",
      service: "game/create",
      payload: data,
    });
    return response;
  } catch (error) {
    return error; 
  }
};

//Make the request to the server
export const JoinGame = async (data) => {
  try {
    const response = await httpRequest({
      method: "POST",
      service: "game/join",
      payload: data,
    });
    return response;
  } catch (error) {
    return error; 
  }
};
