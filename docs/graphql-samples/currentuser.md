### Current User Query

This is an example query that can be executed in the graphql playground to make sure that the current user retrieval process from the session cookie is working as expeected. Copy this content and go to `http://localhost:4000/graphql` to see this query in action.

Please keep this example updated till the time we keep making changes to the current user query.

Run the login mutation before validating session for an existing user.

##### Execute:

```
query{
  currentUser{
    id
    firstName
    lastName
    email
    name
  }
}
```

##### Expected outcome:

```
{
  "data": {
    "currentUser": {
      "id": "1",
      "firstName": "Test",
      "lastName": "User1",
      "email": "TestUser1@test.com",
      "name": "Test User1"
    }
  }
}
```
