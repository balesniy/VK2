importScripts("https://d3js.org/d3.v4.min.js");

onmessage = function ({ data }) {
  const set = {};
  const getFriends = ({ friends = [] }) => friends;
  const concat = (data) => [].concat(...data);
  const getLink = ({ id, friends = [] }) => friends.map(i => ({
    source: id,
    target: i.id
  }));
  const mapWith = (data) => (f) => concat(data.map(f));

  const friends = mapWith(data)(getFriends);
  const allFriends = mapWith(data)(({ friends = [] }) => mapWith(friends)(getFriends));

  const firstLinks = mapWith(data)(getLink);
  const allLinks = mapWith(data)(({ friends = [] }) => mapWith(friends)(getLink));

  const [set1=new Set(), set2=new Set()] = data.map(({ friends = [] }) => mapWith(friends)(getFriends))
    .map(data => new Set(data));
  const middleSet = [...set1].filter(i=>set2.has(i));
  postMessage({
    type: 'friends',
    middleSet
  });
  const links = [...firstLinks, ...allLinks];
  const nodes = [...data, ...friends, ...allFriends].filter(({ id }) => id in set ? false : set[id] = true);
  const simulation = d3.forceSimulation(nodes)
    .force("charge", d3.forceManyBody().strength(-10))
    .force("collide", d3.forceCollide(16))
    .force("center", d3.forceCenter(1200 / 2, 800 / 2))
    .force("link", d3.forceLink(links).id(({ id }) => id))
    .stop();

  for (let i = 0, n = Math.ceil(Math.log(simulation.alphaMin()) / Math.log(1 - simulation.alphaDecay())); i < n; ++i) {
    postMessage({
      type:     "tick",
      progress: i / n
    });
    simulation.tick();
  }

  postMessage({
    type: "end",
    nodes,
    links,
  });
};

