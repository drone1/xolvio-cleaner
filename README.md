Xolv.io Cleaner
===============

This package cleans your database for testing purposes. 

# Installation

```
meteor add xolvio:cleaner
```

# Usage

resetDatabase only resets your database when it is executed inside a debugOnly environment.

You can clear your database with `resetDatabase(options, callback)`. It works on both the client and the server.

```javascript
import { resetDatabase } from 'meteor/xolvio:cleaner';

// delete all collections with optional callback
await resetDatabase(null);
```

## Provide specific database instance
```javascript
// delete all collections except myCollection with optional callback
await resetDatabase({db: yourDatabaseInstance});
```

## Don't reset certain collection
```javascript
// delete all collections except myCollection with optional callback
await resetDatabase({excludedCollections: ['myCollection']});
```

# About Xolv.io

We help you on your journey to delivering higher quality software, faster. We offer:
* Software development services (including but not limited to Meteor development)
* Modernization services
* Training
* SaaS products that allow you to up your own game

[Visit Xolv.io to find out more about what we do](https://www.xolv.io).
