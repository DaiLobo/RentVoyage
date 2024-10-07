import { NextApiRequest, NextApiResponse } from "next";

import { ALGOLIA_INDEX_NAME, searchClient } from "@/lib/algolia";
import { PropertyService } from "@/services/PropertyService";
import { parseDate } from "@/utils/format";

export async function getData(query: {
  localization?: string | string[] | undefined;
  from?: string | string[] | undefined;
  to?: string | string[] | undefined;
  guests?: number | null;
}) {
  const { localization, guests, from, to } = query;

  if (!localization && !guests && !from && !to) {
    const jsonData = await PropertyService.getAllProperties();
    return jsonData;
  }
  try {
    const algoliaQuery = {
      query: localization as string,
      filters: `capacity >= ${guests}`
    };

    const searchResults = await searchClient.searchSingleIndex({
      indexName: ALGOLIA_INDEX_NAME,
      searchParams: algoliaQuery
    });

    const algoliaHits = searchResults.hits;

    if (from && to) {
      const availableProperties =
        await PropertyService.filterAvailableProperties(
          algoliaHits,
          parseDate(from as string),
          parseDate(to as string)
        );
      return availableProperties;
    } else {
      return algoliaHits;
    }
  } catch (error) {
    console.error("Error during search:", error);
    return [];
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const availableProperties = await getData(req.query);
  res.status(200).json({ hits: availableProperties });
}
