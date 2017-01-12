import {handleActions} from 'redux-actions';
// function getState({ graph, set, payload }) {
//   const friends = [].concat(...payload.fof).filter(i => i.friends);
//   const friendsSet = new Set([].concat(...friends.map(({ friends }) => friends)));
//   const allSet = set.size ? new Set([...friendsSet].filter(x => set.has(x)))
//     : friendsSet;
//   const getFirstNodes = () => graph.nodes.concat([
//     {
//       id:    payload.id,
//       friends,
//       group: 0
//     },
//     ...friends.map(({ id, friends }) => ({
//       id,
//       friends,
//       group: 2
//     }))
//   ]);
//   const getFirstLinks = () => graph.links.concat(friends.map(i => ({
//     source: payload.id,
//     target: i.id,
//     value:  1
//   })));
//   const friendsInSet = (friends) => friends.some(j => allSet.has(j));
//   const getAllNodes = ([hero, ...rest]) => {
//     return [
//       hero,
//       ...rest.filter(({ friends }) => friendsInSet(friends)),
//       {
//         id:    payload.id,
//         friends,
//         group: 1
//       },
//       ...friends.filter(({ friends }) => friendsInSet(friends)).map(({ id, friends }) => ({
//         id,
//         friends,
//         group: 2
//       })),
//       ...[...allSet].map(id => ({
//         id,
//         group: 3
//       }))
//     ]
//   };
//   const getAllLinks = (links, nodes) => {
//     const restLinks = links.filter(link => friendsInSet(nodes.find(({ id }) => id === link.target.id).friends));
//     const newFriends = friends.filter(({ friends }) => friendsInSet(friends));
//     const newLinks = newFriends.map(i => ({
//       source: payload.id,
//       target: i.id,
//       value:  1
//     }));
//     const restNodes = nodes.filter(({ friends }) => friendsInSet(friends));
//     const nodeFriendsInSet = ({ friends }) => friends.filter(j => allSet.has(j));
//     const linkFromNode = (node) => nodeFriendsInSet(node).map(friend => ({
//       source: node.id,
//       target: friend,
//       value:  1
//     }));
//     return [
//       ...restLinks,
//       ...newLinks,
//       ...[].concat(...restNodes.map(linkFromNode)),
//       ...[].concat(...newFriends.map(linkFromNode)),
//     ]
//   };
//   return {
//     graph: {
//       nodes: !graph.nodes.length ? getFirstNodes() : getAllNodes(graph.nodes),
//       links: !graph.links.length ? getFirstLinks() : getAllLinks(graph.links, graph.nodes)
//     },
//     set:   allSet
//   }
// }
//
// export default handleActions({
//   SELECT_USER:   ({ graph, set }, { payload }) => getState({
//     graph,
//     set,
//     payload
//   }),
//   SELECT_USER_2: ({ graph, set }, { payload }) => getState({
//     graph,
//     set,
//     payload
//   }),
// }, {
//   graph: {
//     nodes: [],
//     links: []
//   },
//   set:   new Set()
// })

function getState({ graph, payload }) {
  const friends = [].concat(...payload.fof).filter(i => i.friends);
  return [
    ...graph,
    {
      id:      payload.id,
      group:   0,
      friends: friends.map(({ friends, id }) => ({
        id,
        group:    1,
        _friends: friends.map(id => ({
          id,
          group: 2
        }))
      }))
    }
  ]
}

export default handleActions({
  SELECT_USER:   (graph, { payload }) => getState({
    graph,
    payload
  }),
  SELECT_USER_2: (graph, { payload }) => getState({
    graph,
    payload
  }),
}, [])

