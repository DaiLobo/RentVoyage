import { SearchClient, algoliasearch } from "algoliasearch";

const ALGOLIA_APP_ID = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!;
const ALGOLIA_SEARCH_API_KEY = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY!;
const ALGOLIA_INDEX_NAME = "firebase-rentproperty";

if (!ALGOLIA_APP_ID || !ALGOLIA_SEARCH_API_KEY) {
  throw new Error(
    "Algolia App ID ou Search API Key estão faltando nas variáveis de ambiente."
  );
}

const searchClient: SearchClient = algoliasearch(
  ALGOLIA_APP_ID,
  ALGOLIA_SEARCH_API_KEY
);

export { searchClient, ALGOLIA_INDEX_NAME };
