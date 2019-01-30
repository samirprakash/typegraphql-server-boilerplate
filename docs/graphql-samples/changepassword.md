### Change Password Mutation

This is an example mutation that can be executed in the graphql playground to make sure that the change password user flow is working as expected.

> Make sure that the forgot password mutation with a valid user has been executed and you can access the token that has been sent as a link in the forgot password email. Pass this token and a new password to update the user's password.

Copy the content below and go to `http://localhost:4000/graphql` to see this mutation in action.

Please keep this example updated till the time we keep making changes to the `forgotPassword` mutation.

##### Execute:

```
utation {
  changePassword(
    data: {
      token: "f0fdb24a-73b3-4324-97f1-e0e1c97c7ec4"
        password: "TestUser1@test.com"
    }
  ) {
    id
    name
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
    "changePassword": {
      "id": "1",
      "name": "Test User1",
      "firstName": "Test",
      "lastName": "User1",
      "email": "TestUser1@test.com"
    }
  }
}
```
