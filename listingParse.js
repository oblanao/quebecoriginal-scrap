const rp = require('request-promise');
const $ = require('cheerio');

const contactExists = (html) => {
  return !!$('.mode-contact', html).length
}

const websiteExists = (html) => {
  const nrDivs = $('.mode-contact', html).find('div').length;
  return nrDivs>1 ? true : false
}

const parseListing = (url) => {
  return new Promise((resolve, reject) => {
    rp(url)
      .then((html) => {
        if (contactExists(html) && websiteExists(html)) {
          const div = $('div', '.mode-contact', html);
          const websiteURL = $($('.mode-contact', html).find('div')[1]).find('a')[0].attribs.href
          resolve(websiteURL);
        }
        resolve('Website Link does not exist [404]');
      })
      .catch((err) => {
        reject(err);
      })
  })
}

module.exports = {
  parseListing
}