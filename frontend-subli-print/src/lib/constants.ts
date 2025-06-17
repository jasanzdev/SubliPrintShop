export const SITE_NAME = "Jasanz Print Studio";
export const COMPANY_NAME = "Jasanz Company";

export enum VercelSortKeys {
  RELEVANCE = "RELEVANCE",
  BEST_SELLING = "BEST_SELLING",
  CREATED_AT = "CREATED_AT",
  PRICE = "PRICE",
}

export type SortFilterItem = {
  title: string;
  slug: string | null;
  sortKey: keyof typeof VercelSortKeys;
  reverse: boolean;
};

export const defaultSort: SortFilterItem = {
  title: "Relevance",
  slug: null,
  sortKey: "RELEVANCE",
  reverse: false,
};

export const sorting: SortFilterItem[] = [
  defaultSort,
  {
    title: "Trending",
    slug: "trending-desc",
    sortKey: "BEST_SELLING",
    reverse: false,
  }, // asc
  {
    title: "Latest arrivals",
    slug: "latest-desc",
    sortKey: "CREATED_AT",
    reverse: true,
  },
  {
    title: "Price: Low to high",
    slug: "price-asc",
    sortKey: "PRICE",
    reverse: false,
  }, // asc
  {
    title: "Price: High to low",
    slug: "price-desc",
    sortKey: "PRICE",
    reverse: true,
  },
];
