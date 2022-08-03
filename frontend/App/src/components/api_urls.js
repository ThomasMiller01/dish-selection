let api_base_url = "https://api.thomasmiller.info";

let auth_api = api_base_url + "/auth";
let backend_api = api_base_url + "/healthcheck";

backend_api = "http://localhost:5000/graphql";

export { auth_api, backend_api };
