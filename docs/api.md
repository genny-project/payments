# API
This documents details example requests to the API

### Create user
```POST /:provider/users```

| Providers | Supported |
| ----------| --------- |
| Assembly | Yes |
| Ripple | No |

```json
{
  "id": "a3d4565476kko6575645",
  "personalInfo": {
    "firstName": "John",
    "lastName": "Smith",
    "dob": "27/12/1970",
    "governmentNumber": "123456789"
  },
  "contactInfo": {
    "email": "john.smith@example.com",
    "mobile": "+61400012345"
  },
  "location": {
    "addressLine1": "John Smith Plumbing",
    "addressLine2": "27 Fake Street",
    "city": "Melbourne",
    "state": "VIC",
    "postcode": "3000",
    "country": "AU"
  }
}
```

| Field | Provider | Format | Required | Notes |
| ----- | -------- | ------ | -------- | ----- |
| id | Assembly | string | true | Must be unique and cannot contain '.'  |
| personalInfo.firstName | Assembly | string | true ||
| personalInfo.lastName | Assembly | string | false ||
| personalInfo.dob | Assembly | string | false | Must in format DD/MM/YYYY |
| personalInfo.governmentNumber | Assembly | string | false ||
| contactInfo.email | Assembly | string | true | Must be unique |
| contactInfo.mobile | Assembly | string | false | Must be in international number format |
| location.addressLine1 | Assembly | string | false ||
| location.addressLine2 | Assembly | string | false ||
| location.city | Assembly | string | false ||
| location.state | Assembly | string | false | Assembly don't specific a format, both VIC and Victoria work, however would recommend use of VIC (abbreviations) |
| location.postcode | Assembly | string | false ||
