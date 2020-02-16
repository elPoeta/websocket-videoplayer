const WS_URL = location.origin;
const VIDEO_URL = `${location.origin}/video`;
const parseJsonObject = str => {
  try {
    const strParsed = JSON.parse(str);
    return strParsed;
  } catch (error) {
      console.log("Error :: ", error.message);
      return {};
    }
} 

export  {
  WS_URL,
  VIDEO_URL,
  parseJsonObject
}