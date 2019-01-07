const fetch = require('node-fetch');
const queryString = require('query-string');
const uuidv4 = require('uuid/v4');

exports.sourceNodes = async ({actions, createNodeId, createContentDigest}, configOptions) => {
  const {createNode} = actions;

  delete configOptions.plugins;

  const processLocation = (location) => {
    const nodeId = createNodeId(`location-data-${uuidv4()}`);
    const nodeContent = JSON.stringify(location);
    const nodeData = Object.assign({}, location, {
      id: nodeId,
      parent: null,
      children: [],
      internal: {
        type: 'LocationData',
        content: nodeContent,
        contentDigest: createContentDigest(location)
      }
    });

    return nodeData;
  };

  const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?${queryString.stringify(configOptions)}`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  const nodeData = processLocation(data);
  createNode(nodeData);
};
