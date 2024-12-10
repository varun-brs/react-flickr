import axios from "axios";
const BaseURL = process.env.REACT_APP_API_ENDPOINT;

export const HttpGet = async (aParams) => {
  aParams["api_key"] = process.env.REACT_APP_API_KEY;
  aParams["format"] = "json";
  aParams["method"] = "flickr.photos.search";
  aParams["extras"] = "url_h";
  aParams["nojsoncallback"] = "1";
  aParams["page"] = "1";
  const oURL = BaseURL + "?" + new URLSearchParams(aParams);
  let oResponse = await axios.get(oURL);
  return oResponse?.data;
};
