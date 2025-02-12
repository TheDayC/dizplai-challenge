# API Routes

For the creation of this API I've added several endpoints, those requested in the requirements and extras to supplement the UI. All endpoints leverage Prisma for their connection to the database and are type protected by Zod. Below is a list of the endpoints and their functionality with example payloads.

## Polls

All poll related endpoints are prefixed with `/polls`.

### List Polls

```
/polls/list
```