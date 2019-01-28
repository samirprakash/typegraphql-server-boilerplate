### Registration Mutation

This is an example mutation that can be executed in the graphql playground to make sure that the registration process is working as expeected. Copy this content and go to `http://localhost:4000/graphql` to see this mutation in action.

Please keep this example updated till the time we keep making changes to the Registration mutation.

##### Execute:

```
mutation{
  register(data: {
    firstName: "Test"
    lastName: "User1"
    email: "TestUser1@test.com"
    password: "testuser"
  }){
    id
    firstName
    lastName
    name
    email
  }
}
```

##### Epected outcome:

```
{
  "data": {
    "register": {
      "id": "1",
      "firstName": "Test",
      "lastName": "User1",
      "name": "Test User1",
      "email": "TestUser1@test.com"
    }
  }
}
```
