### Login Mutation

This is an example mutation that can be executed in the graphql playground to make sure that the login process is working as expeected. Copy this content and go to `http://localhost:4000/graphql` to see this mutation in action.

Please keep this example updated till the time we keep making changes to the Login mutation.

Run the registration mutation before doing a login.

##### Execute:

```
mutation{
  login(data: {email: "TestUser1@test.com", password: "testuser"}) {
    id
    firstName
    lastName
    email
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
