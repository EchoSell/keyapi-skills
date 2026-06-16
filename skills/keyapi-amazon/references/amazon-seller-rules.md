# Amazon Seller Module Rules

## 1. Module Scope

Use this module for Amazon seller profile, seller product, seller review, and marketplace offer workflows.

These notes are routing guidance from `https://docs.keyapi.ai/llms.txt`. Before execution, always open the linked endpoint docs page and use the current method, path, parameters, pagination, and response schema.

## 2. Seller Profile

- Documentation: `https://docs.keyapi.ai/amazon/seller-profile.md`
- Purpose: retrieve profile information for an Amazon seller.
- Best suited for seller identity, business profile, rating, response, and storefront checks.

### Rules

- Use after a seller ID is known from product detail, offer results, or user input.
- Do not infer seller reliability beyond returned profile and review signals.

## 3. Seller Products

- Documentation: `https://docs.keyapi.ai/amazon/seller-products.md`
- Purpose: retrieve product listings for a seller.
- Best suited for seller catalog analysis, product assortment review, and competitor storefront research.

### Rules

- Use after seller resolution.
- Enrich selected ASINs with product detail, offers, reviews, and ASIN/GTIN conversion as needed.

## 4. Seller Reviews

- Documentation: `https://docs.keyapi.ai/amazon/seller-reviews.md`
- Purpose: retrieve customer feedback for a seller.
- Best suited for seller reputation analysis, issue discovery, and positive/negative feedback review.

### Rules

- Use when the user asks about seller reputation, trust, feedback, or service quality.
- Preserve filters such as positive/negative/all and pagination if the docs support them.

## 5. Product Offers

- Documentation: `https://docs.keyapi.ai/amazon/product-offers.md`
- Purpose: compare sellers and purchase offers for one or more ASINs.
- Best suited for identifying sellers attached to a product and comparing prices, condition, delivery, and Prime/free-shipping options.

### Rules

- Use as the bridge between product workflows and seller workflows.
- Follow with seller profile or seller reviews for selected sellers.

## 6. Common Workflows

- Seller report: `Seller Profile` -> `Seller Products` -> `Seller Reviews`.
- Product-to-seller analysis: `Product Details` or `Product Offers` -> selected seller profile/reviews.
- Competitor catalog: `Seller Products` -> product detail/offers/reviews for shortlisted ASINs.
