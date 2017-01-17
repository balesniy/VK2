importScripts("https://d3js.org/d3.v4.min.js");

onmessage = function ({ data }) {
  const getFriends = ({ friends = [] }) => friends;
  const concat = (data = []) => [].concat(...data);
  const getLink = ({ id, friends = [] }) => friends.map(i => ({
    source: id,
    target: i.id
  }));
  const mapWith = (data = []) => (f) => concat(data.map(f));

  //const friends = mapWith(data)(getFriends);
  //const allFriends = mapWith(data)(({ friends = [] }) => mapWith(friends)(getFriends));

  const [set1 = new Set(), set2 = new Set()] = data.map(
    ({ _friends = [] }) => [].concat(..._friends.map(({ _friends = [] }) => _friends))
  ).map(data => new Set(data.map(({ id }) => id)));
  const middleSet = [...set1].filter(i => set2.has(i));
  data.forEach(i => {
    if (!i.friends) {
      i.friends = i._friends.filter(({ _friends }) => _friends.some(
        ({ id }) => middleSet.includes(id)
      ))
    }
  });
  const friends = [].concat(...data.map(getFriends));
  friends.forEach(i => {
    if (!i.friends) {
      i.friends = i._friends.filter(({ id }) => middleSet.includes(id))
    }
  });

  const firstLinks = mapWith(data)(getLink);
  const allLinks = mapWith(data)(({ friends = [] }) => mapWith(friends)(getLink));
  const allFriends = middleSet.map(id => ({
    id,
    group: 2
  }));
  // postMessage({
  //   type: 'friends',
  //   allFriends
  // });
  const links = [...firstLinks, ...allLinks];
  const nodes = [...data, ...friends, ...allFriends];
  const simulation = d3.forceSimulation(nodes)
    .force("charge", d3.forceManyBody())
    //.force("collide", d3.forceCollide(16))
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

