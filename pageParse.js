const fs = require('fs');

const rp = require('request-promise');

const cheerioAdv = require('cheerio-advanced-selectors');
const $ = cheerioAdv.wrap(require('cheerio'));

const { parseListing } = require('./listingParse');


const parsePage = (url) => {
  rp(url)
    .then((html) => {
      let listingsOnPage = $('#mosaic ul li', html);
      listingsOnPage.each((index, listing) => {
        const hyperlink = $('a:first', listing)[0].attribs.href;
        parseListing(hyperlink)
          .then((data) => {
            fs.appendFile('results.txt', `${index}. ${hyperlink} : ${data} \n`, (err) => {
              if (err) {
                console.log(err)
              }
            });
          })
          .catch((err) => {
            console.log(err);
          })
      })
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = {
  parsePage
}