let resetDatabase

if (Meteor.isServer) {
  const _resetDatabase = async function (options) {
    if (process.env.NODE_ENV !== 'development') {
      throw new Error(
          'resetDatabase is not allowed outside of a development mode. ' +
          'Aborting.'
      );
    }

    options = options || {};
    let excludedCollections = [ 'system.indexes' ];
    if (options.excludedCollections) {
      excludedCollections = excludedCollections.concat(options.excludedCollections);
    }

    const db = options.db || MongoInternals.defaultRemoteCollectionDriver().mongo.db;
    const collections = await db.collections();
    const appCollections = _.reject(collections, function (col) {
      return col.collectionName.indexOf('velocity') === 0 ||
          excludedCollections.indexOf(col.collectionName) !== -1;
    });

    await Promise.all(appCollections.map(appCollection => appCollection.deleteMany({})))
  };

  Meteor.methods({
    'xolvio:cleaner/resetDatabase': async function (options) {
      await _resetDatabase(options);
    }
  });

  resetDatabase = async function (options) {
    await _resetDatabase(options);
  }
} else if (Meteor.isClient) {
  resetDatabase = async function (options) {
    // NOTE: Exceptions will be thrown on error and should be handled by client code
    await Meteor.callAsync('xolvio:cleaner/resetDatabase', options);
  }
}

export { resetDatabase }
