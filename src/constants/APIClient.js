export default {
  API_BASE_URL: 'http://192.168.1.27:3002',
  API_HEADERS: {
    headers: {
        'authorization': sessionStorage.getItem("stsToken"),
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
}

};
