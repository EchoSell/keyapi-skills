# Twitter Content And Search Module Rules

## 1. Module Scope

Use this module for Twitter/X tweet detail, tweet thread, timelines, replies, search, trends, inspiration posts, and jobs search.

These notes are routing guidance from `https://docs.keyapi.ai/llms.txt`. Before execution, always open the linked endpoint docs page and use the current method, path, parameters, pagination, and response schema.

## 2. Tweet Detail And Thread

- Documentation: `https://docs.keyapi.ai/twitter/tweet-info.md`
- Documentation: `https://docs.keyapi.ai/twitter/tweet-thread.md`
- Purpose: retrieve a tweet or the surrounding thread.
- Best suited for post-level analysis, conversation context, and quoted/threaded content review.

### Rules

- Use tweet info for one tweet and tweet thread when context across a thread is needed.
- Preserve tweet IDs for replies, retweets, and relationship checks.

## 3. Timelines And Replies

- Documentation: `https://docs.keyapi.ai/twitter/user-timeline.md`
- Documentation: `https://docs.keyapi.ai/twitter/latest-replies.md`
- Documentation: `https://docs.keyapi.ai/twitter/user-replies.md`
- Purpose: retrieve user timelines and reply streams.
- Best suited for account activity analysis and recent reply monitoring.

### Rules

- Use user timeline for authored posts and user replies/latest replies for reply behavior.
- Enrich selected tweets with tweet info or thread context.

## 4. Search, Trends, Inspiration, And Jobs

- Documentation: `https://docs.keyapi.ai/twitter/search.md`
- Documentation: `https://docs.keyapi.ai/twitter/trends.md`
- Documentation: `https://docs.keyapi.ai/twitter/inspiration-posts.md`
- Documentation: `https://docs.keyapi.ai/twitter/jobs-search.md`
- Purpose: search content, monitor trends, retrieve inspiration posts, or search jobs.
- Best suited for topic monitoring, trend discovery, content ideation, and job lookup.

### Rules

- Use search for keyword/topic discovery.
- Use trends when the user asks what is trending.
- Use jobs search only for job-related requests.

## 5. Common Workflows

- Tweet report: tweet info -> thread -> replies/retweets when needed.
- Account activity: profile resolution -> user timeline/replies -> selected tweet detail.
- Topic monitor: search or trends -> tweet detail/thread for selected results.
