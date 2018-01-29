# API
This documents details example requests to the API

---

### Create user
Creates a new user

`POST /:provider/users`

##### Supported providers

| Providers | Supported |
| ----------| --------- |
| Assembly | Yes |
| Ripple | No |

##### Request body

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

##### Fields

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
| location.country | Assembly | string | true | 2 or 3 character ISO standard country code |

---

### Get users
Returns a list of all the users

`GET /:provider/users`

##### Supported providers

| Providers | Supported |
| --------- | --------- |
| Assembly | Yes |
| Ripple | No |

##### URL Parameters

| Field | Provider | Format | Required | Notes |
| ----- | -------- | ------ | -------- | ----- |
| limit | Assembly | number | false | Number of records to retrieve. Max 200. Default 20. |
| offset | Assembly | number | false | Numbers of records to offset. Used for pagination. |
| search | Assembly | string | false | Attempts to match users based on the search string |

---

### Get single user
Retrieves a single user by ID

`GET /:provider/users/:id`

| Providers | Supported |
| --------- | --------- |
| Assembly | Yes |
| Ripple | No |

##### URL Parameters
| Field | Provider | Format | Required | Notes |
| ----- | -------- | ------ | -------- | ----- |
| id | Assembly | string | true ||

---

### Update user
Updates a user by ID

`PUT /:provider/users/:id`

##### Request body

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

##### Fields

| Field | Provider | Format | Required | Notes |
| ----- | -------- | ------ | -------- | ----- |
| id | Assembly | string | true | Must be unique and cannot contain '.'  |
| personalInfo.firstName | Assembly | string | false ||
| personalInfo.lastName | Assembly | string | false ||
| personalInfo.dob | Assembly | string | false | Must in format DD/MM/YYYY |
| personalInfo.governmentNumber | Assembly | string | false ||
| contactInfo.email | Assembly | string | false | Must be unique |
| contactInfo.mobile | Assembly | string | false | Must be in international number format |
| location.addressLine1 | Assembly | string | false ||
| location.addressLine2 | Assembly | string | false ||
| location.city | Assembly | string | false ||
| location.state | Assembly | string | false | Assembly don't specific a format, both VIC and Victoria work, however would recommend use of VIC (abbreviations) |
| location.postcode | Assembly | string | false ||
| location.country | Assembly | string | false | 2 or 3 character ISO standard country code |

---

### Get companies
Returns a list of all the companies

`GET /:provider/companies`

| Providers | Supported |
| --------- | --------- |
| Assembly | Yes |
| Ripple | No |

##### URL Parameters

| Field | Provider | Format | Required | Notes |
| ----- | -------- | ------ | -------- | ----- |
| limit | Assembly | number | false | Number of records to retrieve. Max 200. Default 20. |
| offset | Assembly | number | false | Numbers of records to offset. Used for pagination. |

---

###  Get company by ID
Retrieves a single company by ID

`GET /:provider/companies/:id`

| Providers | Supported |
| --------- | --------- |
| Assembly | Yes |
| Ripple | No |

##### URL Parameters
| Field | Provider | Format | Required | Notes |
| ----- | -------- | ------ | -------- | ----- |
| id | Assembly | string | true ||

---

### Create company
Creates a new company

`POST /:provider/companies`

##### Request body

```json
{
  "name": "Acme",
  "legalName": "Acme Corp",
  "taxNumber": "1234567890",
  "chargesTax": true,
  "contactInfo": {
    "phone": "+61388888888"
  },
  "location": {
    "addressLine1": "Acme Corp",
    "addressLine2": "27 Fake Street",
    "city": "Melbourne",
    "state": "VIC",
    "postcode": "3000",
    "country": "AU"
  },
  "user": {
    "id": "123"
  }
}
```

##### Fields

| Field | Provider | Format | Required | Notes |
| ----- | -------- | ------ | -------- | ----- |
| name | Assembly | string | false ||
| legalName | Assembly | string | false ||
| taxNumber | Assembly | string | false | The ACN / ABN of the business |
| chargesTax | Assembly | boolean | false ||
| contactInfo.phone | Assembly | string | false | Must be in international number format |
| location.addressLine1 | Assembly | string | false ||
| location.addressLine2 | Assembly | string | false ||
| location.city | Assembly | string | false ||
| location.state | Assembly | string | false | Assembly don't specific a format, both VIC and Victoria work, however would recommend use of VIC (abbreviations) |
| location.postcode | Assembly | string | false ||
| location.country | Assembly | string | true | 2 or 3 character ISO standard country code |
| user.id | Assembly | string | true | The ID of the user who owns this company |

---

### Update company
Updates the details of the company with the specified ID

`POST /:provider/companies/:id`

##### Request body

```json
{
  "id": "c3d4565476kko6575645",
  "name": "Acme",
  "legalName": "Acme Corp",
  "taxNumber": "1234567890",
  "chargesTax": true,
  "contactInfo": {
    "phone": "+61388888888"
  },
  "location": {
    "addressLine1": "Acme Corp",
    "addressLine2": "27 Fake Street",
    "city": "Melbourne",
    "state": "VIC",
    "postcode": "3000",
    "country": "AU"
  },
  "user": {
    "id": "123"
  }
}
```

##### Fields

| Field | Provider | Format | Required | Notes |
| ----- | -------- | ------ | -------- | ----- |
| id | Assembly | string | true ||
| name | Assembly | string | false ||
| legalName | Assembly | string | false ||
| taxNumber | Assembly | string | false | The ACN / ABN of the business |
| chargesTax | Assembly | boolean | false ||
| contactInfo.phone | Assembly | string | false | Must be in international number format |
| location.addressLine1 | Assembly | string | false ||
| location.addressLine2 | Assembly | string | false ||
| location.city | Assembly | string | false ||
| location.state | Assembly | string | false | Assembly don't specific a format, both VIC and Victoria work, however would recommend use of VIC (abbreviations) |
| location.postcode | Assembly | string | false ||
| location.country | Assembly | string | false | 2 or 3 character ISO standard country code |
| user.id | Assembly | string | false | The ID of the user who owns this company |

---


### Get tokens
Returns auth tokens used by front end clients to authenticate with a payment provider directly.

`POST /:provider/tokens`

##### Request body

```json
{
  "type": "bank",
  "user": {
    "id": "123"
  }
}
```

##### Fields

| Field | Provider | Format | Required | Notes |
| ----- | -------- | ------ | -------- | ----- |
| type | Assembly | string | true | Either "card" or "bank" |
| user.id | Assembly | string | true | ID of the user for which these tokens are for. |

---

### Create Item
Creates a new item

`POST /:provider/items`

##### Request Body

```json
{
  "id": "abc123",
  "name": "10T Container",
  "amount": "25000",
  "currency": "AUD",
  "paymentType": "escrow",
  "buyer": {
    "id": "295496932923"
  },
  "seller": {
    "id": "439067934592"
  },
  "fees": [ "2304065034032" ],
  "description": "Shipping for a 10T Container"
}
```

##### Fields

| Field | Provider | Format | Required | Notes |
| ----- | -------- | ------ | -------- | ----- |
| id | Assembly | string | true ||
| name | Assembly | string | true | Name of item |
| amount | Assembly | string | true | Value of the item in cents |
| currency | Assembly | string | true ||
| paymentType | Assembly | string | true | Valid values are escrow, express, escrow_partial_release, approve |
| buyer.id | Assembly | string | true | The ID of the buyer for this item |
| seller.id | Assembly | string | true | The ID of the seller for this item |
| fees | Assembly | array | true | An array of fee IDs that have been generated |
| description | Assembly | array | false | A description of the item |

---


### Make Item Payment
Makes a payment against the specified item.

`POST /:provider/items/:id/payment`

#### Request body

```json
{
  "id": "sdf4w598dscx67as9rewrssdfw435",
  "account": {
    "id": "dgfs908643okjzdvjkl124"
  },
  "ipAddress": "123.456.7.89",
  "deviceID": "ouipsfe3548fsdjkl1209ufsd09uert0"
}
```

##### Fields

| Field | Provider | Format | Required | Notes |
| ----- | -------- | ------ | -------- | ----- |
| id | Assembly | string | true | ID of the item we are making a payment against. |
| account.id | Assembly | string | true | ID of the payment method the user is wanting to use. |
| ipAddress | Assembly | string | true | IP address of the user (provided by Assembly SDK) |
| deviceID | Assembly | string | true | Device ID of the user (provided by Assembly SDK) |

---


### Release Item Payment
Releases the payment for an item

`POST /:provider/items/:id/release-payment`

---

### Create Fee ID
Creates a fee ID

`POST /:provider/fees`

##### Request body

```json
{
  "name": "Name of fee",
  "type": 1,
  "amount": 1000,
  "cap": null,
  "min": null,
  "max": null,
  "to": "buyer"
}
```

##### Fields

| Field | Provider | Format | Required | Notes |
| ----- | -------- | ------ | -------- | ----- |
| name | Assembly | string | true | Name of the fee you are creating. |
| type | Assembly | string | true | Type of fee you are creating. 1 = Fixed, 2 = Percentage, 3 = Percentage with Cap, 4 = Percentage with Min |
| amount | Assembly | string | false | The amount of the fee in cents. Only required if type = 1 |
| cap | Assembly | string | false | Cap of the fee in cents (for percentage fees). |
| min | Assembly | string | false | Minimum fee in cents |
| max | Assembly | string | false | Maximum fee in cents |
| to | Assembly | string | false | Who pays the fee. Allowed values are buyer, seller, cc, int_wire |

---
