
//const atgUrl = "https://dutchie.com/api-0/graphql?operationName=FilteredProducts&variables=%7B%22includeEnterpriseSpecials%22%3Afalse%2C%22includeCannabinoids%22%3Atrue%2C%22productsFilter%22%3A%7B%22productIds%22%3A%5B%5D%2C%22dispensaryId%22%3A%2260f7a70dd1ffb400b844e103%22%2C%22pricingType%22%3A%22rec%22%2C%22strainTypes%22%3A%5B%5D%2C%22subcategories%22%3A%5B%5D%2C%22Status%22%3A%22Active%22%2C%22types%22%3A%5B%22Flower%22%5D%2C%22useCache%22%3Afalse%2C%22isDefaultSort%22%3Atrue%2C%22sortBy%22%3A%22weight%22%2C%22sortDirection%22%3A1%2C%22bypassOnlineThresholds%22%3Afalse%2C%22isKioskMenu%22%3Afalse%2C%22removeProductsBelowOptionThresholds%22%3Atrue%7D%2C%22page%22%3A0%2C%22perPage%22%3A50%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%224bfbf7d757b39f1bed921eab15fc7328dab55a30ad47ff8d5cc499f810ff2aee%22%7D%7D";
const ampUrl = "https://dutchie.com/api-4/graphql?operationName=FilteredProducts&variables=%7B%22includeEnterpriseSpecials%22%3Afalse%2C%22includeCannabinoids%22%3Atrue%2C%22productsFilter%22%3A%7B%22productIds%22%3A%5B%5D%2C%22dispensaryId%22%3A%22641c817250e05800259a65ce%22%2C%22pricingType%22%3A%22rec%22%2C%22strainTypes%22%3A%5B%5D%2C%22subcategories%22%3A%5B%5D%2C%22Status%22%3A%22Active%22%2C%22types%22%3A%5B%22Flower%22%5D%2C%22useCache%22%3Afalse%2C%22isDefaultSort%22%3Atrue%2C%22sortBy%22%3A%22weight%22%2C%22sortDirection%22%3A1%2C%22bypassOnlineThresholds%22%3Afalse%2C%22isKioskMenu%22%3Afalse%2C%22removeProductsBelowOptionThresholds%22%3Atrue%7D%2C%22page%22%3A0%2C%22perPage%22%3A50%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%224bfbf7d757b39f1bed921eab15fc7328dab55a30ad47ff8d5cc499f810ff2aee%22%7D%7D";
//const legalGreenUrl = "https://dutchie.com/api-0/graphql?operationName=FilteredProducts&variables=%7B%22includeEnterpriseSpecials%22%3Afalse%2C%22includeCannabinoids%22%3Atrue%2C%22productsFilter%22%3A%7B%22productIds%22%3A%5B%5D%2C%22dispensaryId%22%3A%22605d194989577500ba7990a4%22%2C%22pricingType%22%3A%22rec%22%2C%22strainTypes%22%3A%5B%5D%2C%22subcategories%22%3A%5B%5D%2C%22Status%22%3A%22Active%22%2C%22types%22%3A%5B%22Flower%22%5D%2C%22useCache%22%3Afalse%2C%22isDefaultSort%22%3Atrue%2C%22sortBy%22%3A%22price%22%2C%22sortDirection%22%3A1%2C%22bypassOnlineThresholds%22%3Afalse%2C%22isKioskMenu%22%3Afalse%2C%22removeProductsBelowOptionThresholds%22%3Atrue%7D%2C%22page%22%3A0%2C%22perPage%22%3A50%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%224bfbf7d757b39f1bed921eab15fc7328dab55a30ad47ff8d5cc499f810ff2aee%22%7D%7D";
const resp = await fetch(
  ampUrl,
  {
    headers: {
      "origin": "https://www.castleleaf.com",
      "content-type": "application/json",
      "accept-encoding": "gzip, deflate, br, zstd",
      "accept": "*/*",
    }
  }
);


// Parse
const json = await resp.json() as {
  data: {
    filteredProducts?: { products: unknown[] };
    products?: { products: unknown[] };
  };
};

const products = json.data.filteredProducts?.products ??
json.data.products?.products ??
[];

console.log("items: ", products.length);

type Slim = {
  id: string,
  name: string,
  priceCents: number,
  strainType: string,
};

const rows: Slim[] = products.map((p: any) => ({
  id: p.id,
  name: p.Name ?? p.name,
  priceCents: Math.round((p.recPrices?.[0] ?? p.Prices?.[0]) * 1.00),
  strainType: p.strainType,
}));

console.table(rows.slice(0,20));