/**
 * Generate A random string of any length
 * Excludes some special characters
 *
 * @author Yusuff Mustapha
 * @returns {String} - random string
 */
const randomStringGen = (length) => {
  const pass = 'qwertyuopasdfghjklzxcvbnmQWERTYUOPASDFGHJKLZXCVBNM234567890$*';
  return Array(length).fill(pass).map((x) => x[Math.floor(Math.random() * x.length)]).join('');
};


/**
 * Generate UNIX-time string
 *
 * @author Yusuff Mustapha
 * @returns {String} - UNIX-time string as string
 */
const dateTimeString = () => new Date().getTime().toString();


/**
* Send us back in time in One day
*
* @author Yusuff Mustapha
* @param {Date} datetime - A valid ISO8601 date Object
* @returns {Date} - The day of the future past :)
*/
function setDateToYesterday(datetime) {
  return new Date(datetime.setDate(datetime.getDate() - 1));
}

function base64tostr(base64str) {
  return Buffer.from(base64str, 'base64').toString('ascii');
}

module.exports = {
  randomStringGen,
  dateTimeString,
  setDateToYesterday,
  base64tostr,
};
