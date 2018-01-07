# Auth tokens

## Overview
When making requests to the API some requests may require authentication. This is accomplished by the use of
an authentication token for the particular tenant.

## Sending Auth tokens
An auth token is submitted as an **Authorization** header in the request.

```json
{ "Authorization": "TOKEN_HERE" }
```

## Auth token format
An auth token is made up of the tenant ID, access token and access secret and then is Base64 encoded
before being sent as a header.

For example if we have the following information:
```json
{
  "tenant": "acme-corp",
  "token": "ne9TnIA39JwbJz48QOfN1ER55egc5etA",
  "secret": "UdZ5fx63LyJUBpfKw0EEkHXF7FD60FxO"
}
```

We can convert this into a token by Base64 encoding the above. In JS this is done as follows.

```javascript
/* Define the data */
const data = {
  "tenant": "acme-corp",
  "token": "ne9TnIA39JwbJz48QOfN1ER55egc5etA",
  "secret": "UdZ5fx63LyJUBpfKw0EEkHXF7FD60FxO"
};

/* Convert the object into a JSON string and Base64 encode */
const token = btoa(JSON.stringify( data ));
```

Printing the token would result in the following output.

`eyJ0ZW5hbnQiOiJhY21lLWNvcnAiLCJ0b2tlbiI6Im5lOVRuSUEzOUp3Ykp6NDhRT2ZOMUVSNTVlZ2M1ZXRBIiwic2VjcmV0IjoiVWRaNWZ4NjNMeUpVQnBmS3cwRUVrSFhGN0ZENjBGeE8ifQ==`
