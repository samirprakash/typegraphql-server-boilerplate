### Confirm User Mutation

This is an example mutation that can be executed in the graphql playground to make sure that the confirmation user process is working as expeected.

> Before testing this mutation make sure to register a new user

Copy the content below and go to `http://localhost:4000/graphql` to see this mutation in action.

Please keep this example updated till the time we keep making changes to the confirmUser mutation.

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

##### Server logs:

```
Message sent: <306e9cd6-82b9-fbe6-eaf3-b0c4963a9aee@gmail.com>
Preview URL: https://ethereal.email/message/XFD4XODfsg1deBCnXFD4YdUFLVSxBHVxAAAAAQkHVIseJNALT2uZqE-Q4I8
```

After execution, to verify:

- Check the server logs to see that the email has been sent.
- Click on the link from the server `(as show above)` to view the email
- Click on the link in the email to see the redirection to `localhost:3000`
- Copy and keep the token with you to validate the user confirmation flow during registration
