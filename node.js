const fetch = require('node-fetch');

// Replace with your RapidAPI key
const RAPIDAPI_KEY = '404e0293ecmshad6bea346293be7p171d07jsnabb538c1b944';

/**
 * Search jobs dynamically
 * @param {string} job - Job title or keyword
 * @param {string} city - City name
 */
async function searchJobs(job, city) {
  const url = new URL('https://jsearch.p.rapidapi.com/search');
  url.search = new URLSearchParams({
    query: `${job} jobs in ${city}`,
    page: '1',
    num_pages: '1',
    country: 'us',
    date_posted: 'all'
  });

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': RAPIDAPI_KEY,
      'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error fetching jobs:', err);
  }
}

// Example usage:
searchJobs('developer', 'chicago');
