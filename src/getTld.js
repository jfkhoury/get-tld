export default function getTld() {
    const parts = location.hostname.toLowerCase().split(".");
    const cookieName = "_FIND_DOMAIN_" + (new Date()).getTime(); // Add timestamp to make it unique.

    if (parts.length === 1) { // If no `.` found, then maybe we're on localhost.
        return "";
    }
    
    function isCookieNotFound() {
        return global.document.cookie.indexOf(cookieName+'='+cookieName) === -1;
    }

    function getArrayItemsFromEnd(arr, nbrOfItems) {
        return arr.slice(-nbrOfItems);
    }

    function findTld() {
        let i = 0;
        let domain = "";

        function expireCookie(domain) {
            global.document.cookie = cookieName + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=" + domain + ";";
        }

        while(i < (parts.length - 1) && isCookieNotFound()) {
            domain = getArrayItemsFromEnd(parts, 1 + (++i)).join(".");
            global.document.cookie = cookieName + "=" + cookieName + ";domain=" + domain + ";";
        }

        expireCookie(domain);
        return domain;
    }

    return findTld();
}
