import algoliaSearch from "algoliasearch";

const indexName = 'tutorial-store-locator'

const searchClient = algoliaSearch(
  process.env.REACT_APP_ALGOLIA_APP_ID as string,
  process.env.REACT_APP_ALGOLIA_API_KEY as string
);

export {indexName, searchClient}