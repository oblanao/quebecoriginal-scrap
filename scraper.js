const baseUrl = 'https://www.quebecoriginal.com/en-ca/search/section/lodging/category/cottages-apartments-tourist-homes/region/montreal'

const { parsePage } = require('./pageParse');

for (i = 0; i < 19; i++) {
  let pageUrl = baseUrl;
  if (i !== 0) {
    pageUrl += `?page=${i}`
  }
  parsePage(pageUrl)
}