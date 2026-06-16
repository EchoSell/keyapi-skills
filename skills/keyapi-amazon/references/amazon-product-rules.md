# Amazon Product Module Rules

## 1. Module Scope

Use this module for Amazon product discovery, product detail, category browsing, best-seller monitoring, deals, offers, reviews, promo codes, and ASIN/GTIN conversion.

These notes are routing guidance from `https://docs.keyapi.ai/llms.txt`. Before execution, always open the linked endpoint docs page and use the current method, path, parameters, pagination, and response schema.

## 2. Product Search

- Documentation: `https://docs.keyapi.ai/amazon/product-search.md`
- Purpose: search Amazon products by keyword or ASIN.
- Best suited for product discovery, competitor lookup, and first-pass candidate collection.

### Rules

- Use this first when the user starts from a keyword, brand, ASIN-like input, or broad product idea.
- Preserve ASINs for detail, offers, reviews, and ASIN/GTIN conversion.

## 3. Product Details

- Documentation: `https://docs.keyapi.ai/amazon/product-details.md`
- Purpose: retrieve detailed product data for one or more ASINs.
- Best suited for current product profile, price, rating, images, specifications, and availability checks.

### Rules

- Use after search, category, best-seller, deals, or seller product results when selected ASINs need enrichment.
- Check the current docs for batch limits before sending multiple ASINs.

## 4. Product Category List

- Documentation: `https://docs.keyapi.ai/amazon/product-category-list.md`
- Purpose: retrieve top-level Amazon product categories for a marketplace.
- Best suited for category discovery before category-specific product or best-seller workflows.

### Rules

- Use when the user gives a broad marketplace or category request without a category ID/path.
- Preserve category identifiers or paths for downstream category products and best-seller calls.

## 5. Products By Category

- Documentation: `https://docs.keyapi.ai/amazon/products-by-category.md`
- Purpose: retrieve products inside a specific Amazon category.
- Best suited for category browsing and category-specific comparison.

### Rules

- Use after resolving the category from category list or user-provided category URL/path.
- Use product detail only for shortlisted products.

## 6. Best Seller

- Documentation: `https://docs.keyapi.ai/amazon/best-seller.md`
- Purpose: retrieve best-selling, new release, mover, wished-for, or gift idea products for a category.
- Best suited for rankings, category monitoring, and market scans.

### Rules

- Use when the user asks for top products, best sellers, new releases, movers, wish lists, or gift ideas.
- State the list type, category, marketplace, and ranking position when available.

## 7. Deals And Deal Products

- Documentation: `https://docs.keyapi.ai/amazon/deals.md`
- Documentation: `https://docs.keyapi.ai/amazon/deal-products.md`
- Purpose: find active deals and retrieve products inside a specific deal.
- Best suited for discount monitoring, Prime deal research, and deal product analysis.

### Rules

- Use `Deals` for broad deal discovery, then `Deal Products` when the user selects a deal ID.
- Enrich selected deal ASINs with product details, offers, and reviews when needed.

## 8. Product Offers

- Documentation: `https://docs.keyapi.ai/amazon/product-offers.md`
- Purpose: retrieve available purchase offers for products.
- Best suited for seller/offer comparison, condition filtering, Prime/free-shipping checks, and buy-box style analysis.

### Rules

- Use after product resolution when the user asks who sells the item, price differences, delivery options, or offer availability.
- Keep offer-level facts separate from product-level facts.

## 9. Product Reviews

- Documentation: `https://docs.keyapi.ai/amazon/product-reviews.md`
- Documentation: `https://docs.keyapi.ai/amazon/top-product-reviews.md`
- Documentation: `https://docs.keyapi.ai/amazon/product-review-details.md`
- Purpose: retrieve product reviews, top helpful reviews, or one specific review detail.
- Best suited for customer feedback analysis, quality checks, objection mining, and review evidence.

### Rules

- Use `Product Reviews` for paginated review collection.
- Use `Top Product Reviews` when helpful-review evidence is enough.
- Use `Product Review Details` only after a review ID is known.

## 10. Promo Code Detail

- Documentation: `https://docs.keyapi.ai/amazon/promo-code-detail.md`
- Purpose: retrieve products and discount information tied to a promo code.
- Best suited for coupon or promotional-code analysis.

### Rules

- Use only when the user provides or asks about a promo code.
- Enrich returned products by ASIN when the user needs product-level evidence.

## 11. ASIN To GTIN

- Documentation: `https://docs.keyapi.ai/amazon/asin-to-gtin.md`
- Purpose: convert an Amazon ASIN to GTIN.
- Best suited for catalog matching, cross-marketplace normalization, and external product database joins.

### Rules

- Use when the user's workflow requires UPC/EAN/GTIN mapping.
- Do not use this for ordinary product detail unless identifier conversion is requested.

## 12. Common Workflows

- Product discovery: `Product Search` -> `Product Details` -> `Product Offers` or `Product Reviews`.
- Category scan: `Product Category List` -> `Products By Category` or `Best Seller` -> `Product Details`.
- Deal analysis: `Deals` -> `Deal Products` -> product detail/offers/reviews.
- Review analysis: product resolution -> reviews -> selected review detail.
