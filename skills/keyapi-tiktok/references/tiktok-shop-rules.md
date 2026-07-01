# TikTok Shop Composite Rules

## 1. Module Scope

Use this file only as a TikTok Shop router. For detailed execution rules, load product, seller, shop creator, live, or search modules.

These notes are routing guidance from `https://docs.keyapi.ai/llms.txt`. Before execution, always resolve the selected endpoint docs page and use the current method, path, parameters, pagination, and response schema.

## Table Of Contents

2. Route product requests
3. Route seller/shop requests

## 2. Route product requests

- Documentation: `https://docs.keyapi.ai/tiktok/shop/product-search.md`
- Documentation: `https://docs.keyapi.ai/tiktok/shop/product-detail.md`
- Documentation: `https://docs.keyapi.ai/tiktok/shop/product-list-analytics.md`
- Purpose: Route product search, detail, ranking, category, review, and attribution requests.

### Best Suited For

- product discovery
- product detail/reviews
- product trend/ranking
- product traffic sources

### Routing Rules

- Load tiktok-product-rules.md for product workflows.
- Load tiktok-search-rules.md first when the user provides a keyword, image, or share link.

## 3. Route seller/shop requests

- Documentation: `https://docs.keyapi.ai/tiktok/shop/shop-list-analytics.md`
- Documentation: `https://docs.keyapi.ai/tiktok/shop/shop-detail-analytics.md`
- Documentation: `https://docs.keyapi.ai/tiktok/shop/shop-products.md`
- Purpose: Route shop/seller discovery, detail, products, trends, and traffic-source requests.

### Best Suited For

- seller discovery
- shop report
- shop product inventory
- shop creator/video/live attribution

### Routing Rules

- Load tiktok-seller-rules.md for seller/shop workflows.
- Use tiktok-shop-creator-rules.md when the target is a TikTok Shop creator rather than a seller/shop.

## 4. Common Workflows

- TikTok Shop request: identify product, seller, shop creator, or image/link resolver -> load the specific module.
