### REST APIs for admin

#### Routes

* `/` -> `GET` -> Give Server status
* `/admin/api/customers` -> `GET` -> Retrive all customers data from Database
* `/admin/api/customers/:id` -> `GET` -> Retrive a particular Customer Data
* `/admin/api/customers` -> `POST` -> Add a Customer to Database
* `/admin/api/customers/:id` -> `PUT` -> Update a Customer data on Database
* `/admin/api/customers/:id` -> `DELETE` -> Delete a Customer from Database
* `/admin/api/customers/count` -> `GET` -> Retrive total Counts of Customers on Database
* `/admin/api/customers/:id/orders` -> `GET` -> Retrive all orders for a particular Customer

#### Demo JSON data for `POST`, `PUT` requests
---
* `/admin/api/customers` -> `POST`
### JSON Data:
```
{
  "customer": {
    "first_name": "Nilanjan",
    "last_name": "Deb",
    "email": "nildeb@example.com",
    "phone": "7005179663",
    "verified_email": true,
    "addresses": [
      {
        "address1": "123 Oak St",
        "city": "Ottawa",
        "phone": "9366496119",
        "zip": "799001",
        "last_name": "Deb",
        "first_name": "Nil",
        "country": "India"
      }
    ]
  }
}
``` 
---
* `/admin/api/customers/:id` -> `PUT`
### JSON Data:
```
{
  "customer": {
    "first_name": "Nilanjan",
    "last_name": "Deb",
    "tags": "New Customer, Repeat Customer",
    "accepts_marketing": true,
    "email": "updated@example.com",
    "note": "Customer is a great guy",
    "phone": "7005179663",
    "verified_email": true,
    "addresses": [
      {
        "address1": "123 Oak St",
        "city": "Ottawa",
        "phone": "9366496119",
        "zip": "799001",
        "last_name": "Deb",
        "first_name": "Nil",
        "country": "India"
      }
    ]
  }
}
```
---