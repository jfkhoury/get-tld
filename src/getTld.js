export default function getTld() {
    const parts = location.hostname.toLowerCase().split(".");
    const cookieName = `_FIND_DOMAIN_${(new Date()).getTime()}`; // Add timestamp to make it unique.

    if (parts.length === 1) { // If no `.` found, then maybe we're on localhost.
        return "";
    }
    
    const isCookieNotFound = () => document.cookie.indexOf(cookieName+'='+cookieName) === -1;
    const getArrayItemsFromEnd = (arr, nbrOfItems) => arr.slice(-nbrOfItems);
    const expireCookie = domain =>
        document.cookie = `${cookieName}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=${domain};`;

    function findTld() {
        let i = 0;
        let domain = "";

        while(i < (parts.length - 1) && isCookieNotFound()) {
            domain = getArrayItemsFromEnd(parts, 1 + (++i)).join(".");
            document.cookie = cookieName + "=" + cookieName + ";domain=" + domain + ";";
        }

        expireCookie(domain);
        return domain;
    }

    return findTld();
}
