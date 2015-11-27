import Bacon from 'baconjs';

/**
 * Make a GET request and parse JSON response
 *
 * @param {String} url         URL to request
 * @return {Bacon.Observable}  Response observable
 */
export default function request(url) {
  return Bacon.fromPromise(
    window.fetch(url)
      .then(response => {
        return response.json();
      })
  );
}
