export const Environment = { 
    devUrl:"http://localhost:8099/api",
    testUrl:"http://35.175.188.100:8099/api",
    prodUrl:"http://35.175.188.100:8099/api"
}

export const GetBaseUrl = ()=>{
    console.log("process.env.REACT_MODE",process.env.REACT_APP_API_MODE)
    console.log("Environment.testUrl",Environment.testUrl)
let url =''
switch (process.env.REACT_APP_API_MODE) {
    case "test":
        url=Environment.testUrl
        break;
    case "dev":
        url=Environment.devUrl
        break;
    case "prod":
        url=Environment.prodUrl
}
//  return "http://localhost:8099/api";
  return url;
}