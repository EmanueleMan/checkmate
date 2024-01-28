function getCookie(cookie, valore) {
    console.log(cookie)
    for (let i = 0; i < cookie.length; i++) {
        const element = cookie[i].split("=");
        if (element[0] == valore) 
            return element[1];
    }
    return 
}