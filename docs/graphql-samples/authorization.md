### Authorization flow query

This is an example flow to verify that the authorization logic implemented in the code base works as expected.

Before testing this flow on the playground, make sure:

- browser cookies are clean i.e. there is should be no cookie named as `qid`
- execute the below query to get an error
- now login with a user and verify that the `qid` cookie has been added in the browser
- execute the query again to verify that a positive response is returned

Copy this content and go to `http://localhost:4000/graphql` to see this mutation in action.

Please keep this example updated till the time we keep making changes to the Login mutation.

Run the registration mutation before doing a login.

##### Execute:

```
{
  defaultQueryToMakeGraphqlHappy
}
```

##### Expected outcome:

```
{
  "data": {
    "defaultQueryToMakeGraphqlHappy": "Graphql is happy now!"
  }
}
```
