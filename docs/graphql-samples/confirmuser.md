### Confirm User Mutation

This is an example mutation that can be executed in the graphql playground to make sure that the confirmation user process is working as expeected.

Before testing this mutation make sure:

- a new user has been registered
- an confirmation email has been sent
- click on the email link from the server logs to get the token
- pass that token below to make sure that expected outputis printed in the playground

Copy this content and go to `http://localhost:4000/graphql` to see this mutation in action.

Please keep this example updated till the time we keep making changes to the Login mutation.

Run the registration mutation before doing a login.

##### Execute:

```
mutation{
  confirmUser(token: "041f10f2-dd25-4834-a708-74c58ed3f19c")
}
```

##### Expected outcome:

```
{
  "data": {
    "confirmUser": true
  }
}
```
