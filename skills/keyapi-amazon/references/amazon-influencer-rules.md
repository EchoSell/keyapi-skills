# Amazon Influencer Module Rules

## 1. Module Scope

Use this module for Amazon Influencer storefront profile, posts, list posts, and products featured by influencers.

These notes are routing guidance from `https://docs.keyapi.ai/llms.txt`. Before execution, always open the linked endpoint docs page and use the current method, path, parameters, pagination, and response schema.

## 2. Influencer Profile

- Documentation: `https://docs.keyapi.ai/amazon/influencer-profile.md`
- Purpose: retrieve profile details for an Amazon Influencer storefront.
- Best suited for validating storefront identity, follower count, bio, and storefront metadata.

### Rules

- Use when the user provides a storefront name or asks for influencer profile information.
- Preserve storefront identifiers for posts and post-product calls.

## 3. Influencer Posts

- Documentation: `https://docs.keyapi.ai/amazon/influencer-posts.md`
- Purpose: retrieve posts from an Amazon Influencer storefront.
- Best suited for idea lists, photos, videos, keyword filtering, and storefront content review.

### Rules

- Use after storefront resolution.
- Preserve post IDs and post types; product extraction only applies when supported by the post type.

## 4. Influencer Post Products

- Documentation: `https://docs.keyapi.ai/amazon/influencer-post-products.md`
- Purpose: retrieve products featured in a specific influencer list post.
- Best suited for extracting product recommendations from list-style influencer content.

### Rules

- Use only after an influencer post ID is known and the post type supports product extraction.
- Enrich returned ASINs through product detail, offers, and reviews when the user needs product evidence.

## 5. Common Workflows

- Influencer storefront review: `Influencer Profile` -> `Influencer Posts`.
- Product extraction: `Influencer Posts` -> `Influencer Post Products` -> product detail/reviews.
- Creator-commerce report: profile -> posts -> products -> product ranking and review evidence.
