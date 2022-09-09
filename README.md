# IoTanic API

An API for IoTanic apps
Development server: https://iotanic-api.herokuapp.com/

## API Reference

### Account Signup()

User signup

```http
  POST /api/signUp
```

| Body       | Type     | Description                 |
| :--------- | :------- | :-------------------------- |
| `email`    | `string` | **Required**. User email    |
| `password` | `string` | **Required**. User password |

#### Response

```javascript
TRUE : {
  status: 200,
  values: 'Success creating account'
}

FALSE: {
  status: 200,
  values: 'Account is already registered'
}

ERROR: {
  status: 400,
  values: 'Failed to create an account!'
}
```

### Account Signin()

User signin

```http
  POST /api/signin
```

| Body       | Type     | Description                 |
| :--------- | :------- | :-------------------------- |
| `email`    | `string` | **Required**. User email    |
| `password` | `string` | **Required**. User password |

#### Response

```javascript
TRUE : {
  status: 200,
  values: {
    account: {
      _id: ObjectID(),
      name: Sring,
      age: Int32,
      account: ObjectID()
    },
    msg: 'Success signin'
  }
}

FALSE: {
  status: 200,
  values: {
    account: null
  }
}

ERROR: {
  status: 400,
  values: `Error getting user's profile`
}
```

### Account getAccount()

Get all accounts

```http
  GET /api/account
```

| Parameter | Type | Description |
| :-------- | :--- | :---------- |
| `-`       | `-`  | -           |

#### Response

```javascript
TRUE : {
  status: 200,
  values: {
    accounts: {
      _id: ObjectID(),
      email: Sring,
      password: String,
      created_date: Date()
      account: ObjectID()
    }
  }
}

ERROR: {
  status: 400,
  values: {
    accounts: null,
    msg: `Error getting all accounts`
  }
}
```

### Profile getProfileByAcc()

Get profile based on user's account

```http
  GET /api/profile/:id
```

| Parameter | Type     | Description                           |
| :-------- | :------- | :------------------------------------ |
| `id`      | `String` | **Required** Need user's account \_id |

#### Response

```javascript
TRUE : {
  status: 200,
  values: {
    profile: {
      _id: ObjectID(),
      name: Sring,
      age: Int32,
      account: ObjectID()
    },
    msg: 'Success retrieving profile by Account ID: ID'
  }
}

ERROR: {
  status: 400,
  values: {
    profile: null,
    msg: `Could not retrieve profile by Account ID: ID`
  }
}
```

### Device createDevice()

Create a template for device. Used by the developers. Use this when you need a new device id

```http
  GET /api/device/create
```

| Parameter | Type | Description                  |
| :-------- | :--- | :--------------------------- |
| `-`       | `-`  | Initiated with default value |

#### Response

```javascript
TRUE : {
  status: 200,
  values: {
    DeviceID: String,
    msg: 'Success creating new device'
  }
}

ERROR: {
  status: 400,
  values: {
    DeviceID: null,
    msg: `Failed creating new device`
  }
}
```

### Device checkNull()

When user going to add a new device. After input the device id, we need to verify wheter the device is already used or not.

```http
  POST /api/device/check
```

| Body     | Type     | Description                      |
| :------- | :------- | :------------------------------- |
| `device` | `String` | **Required** to check the device |

#### Response

```javascript
TRUE : {
  status: 200,
  values: {
    available: true,
    msg: `Device doesn't have a user, user can register!`
  }
}

FALSE: {
  status: 200,
  values: {
    available: false,
    msg: `Device already has the user with ID`
  }
}

ERROR: {
  status: 400,
  values: {
    available: null,
    msg: `Error checking the device`
  }
}
```

### Device setUser()

When user going to add a new device. After checking the availability, if its available, user can set the device

```http
  POST /api/device/set
```

| Body      | Type     | Description                      |
| :-------- | :------- | :------------------------------- |
| `device`  | `String` | **Required** device \_id         |
| `name`    | `String` | **Required** device name         |
| `profile` | `String` | **Required** device profile \_id |

#### Response

```javascript
TRUE : {
  status: 200,
  values: `Success updating device's user`
}

ERROR: {
  status: 400,
  values: `Failed updating device's user`
}
```

### Device userDevices()

Get user's devices based on profile \_id

```http
  POST /api/device/
```

| Body      | Type     | Description               |
| :-------- | :------- | :------------------------ |
| `profile` | `String` | **Required** profile \_id |

#### Response

```javascript
TRUE : {
  status: 200,
  values: {
    devices: {
      _id: ObjectID(),
      name: String,
      user: ObjectID(),
      records: Array
    }
  }
}

ERROR: {
  status: 400,
  values: `Failed getting user's device`
}
```

### Device saveRecords()

Saving records from the device to databse

```http
  GET /api/records/:id/:n/:p/:k/:ph/:t
```

| Parameter | Type     | Description                     |
| :-------- | :------- | :------------------------------ |
| `id`      | `String` | **Required** device \_id        |
| `n`       | `Int32`  | **Required** value of n         |
| `p`       | `Int32`  | **Required** value of p         |
| `k`       | `Int32`  | **Required** value of k         |
| `ph`      | `Int32`  | **Required** value of ph        |
| `t`       | `Date`   | **Required** sensor's data date |

#### Response

```javascript
TRUE : {
  status: 200,
  values: {
    record: {
      n: Int32,
      p: Int32,
      k: Int32,
      ph: Int32,
      datetime: Date
    },
    msg: `Success saving records of ID: ID`
  }
}

ERROR: {
  status: 400,
  values: {
    record: null,
    msg: `Error saving records to ID: ID`
  }
}
```
