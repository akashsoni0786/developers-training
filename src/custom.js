export const fetching = (url) => {
    return fetch(url)
    .then((response) => response.json());
};
