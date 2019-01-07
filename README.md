# gatsby-source-googlemaps-geocoding

This source plugin for Gatsby will make location information from [Google Maps](https://cloud.google.com/maps-platform/) available in GraphQL queries.

## Installation

```sh
# Install the plugin
yarn add gatsby-source-googlemaps-geocoding
```

In `gatsby-config.js`:

```js
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-googlemaps-geocoding',
      options: {
        key: 'YOUR_GOOGLE_MAPS_GEOCODING_API_KEY',
        address: 'ADDRESS_YOU_ARE_GEOCODING'
      },
    }
  ]
};
```

**NOTE:** To get a Google Maps Geocoding API key, [register for a Google Maps dev account](https://console.cloud.google.com/google/maps-apis).

## Configuration Options

The configuration options for this plugin are currently a small subset of the [geocoding API parameters](https://developers.google.com/maps/documentation/geocoding/intro). Please review those docs for more details and feel free to contribute to this repo to expand the accepted parameters.

| Option           | Default   | Description                                                                                                                                                                                                                                                                |
| ---------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `key`            |           | **[required]** Your application's API key. This key identifies your application for purposes of quota management.                                                                                                                                                                                                                                        |
| `address`       |           | **[required]** The street address that you want to geocode, in the format used by the national postal service of the country concerned.                                                                                                                                             |

### Example Configuration

```js
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-googlemaps-geocoding',
      options: {
        key: process.env.GOOGLE_MAPS_GEOCODING_API_KEY,
        address: `Boston, MA`
      }
    }
  ]
};
```

## Querying Google Maps geocoding information

Once the plugin is configured, one new query is available in GraphQL: `allLocationData`.

Here’s an example query to load the latitude and longitude for Boston, MA:

```gql
query LocationQuery {
  allLocationData {
    edges {
      node {
        results {
          geometry {
            location_type
            location {
              lat
              lng
            }
          }
        }
      }
    }
  }
}
```

See the [Google Maps Geocoding API docs](https://developers.google.com/maps/documentation/geocoding/intro) or the GraphiQL UI for info on all returned fields.
