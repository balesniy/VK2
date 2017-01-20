import React, {Component} from 'react'
import {select, scaleOrdinal, schemeCategory20, drag, event} from "d3";
import {forceSimulation, forceLink, forceManyBody, forceCollide, forceCenter} from "d3";

export default class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: [],
      links: []
    }
  }

  componentWillReceiveProps({ graph, getPhoto }) {
    const simulation = forceSimulation()
      .force("link", forceLink().id(({ id }) => id))
      .force("charge", forceManyBody())
      .force("collide", forceCollide(20))
      .force("center", forceCenter(1200 / 2, 800 / 2));

    const concat = (data = []) => [].concat(...data);
    const getLink = (value) => ({ id, friends = [] }) => friends.map(i => ({
      source: id,
      target: i.id,
      value
    }));
    const mapWith = (data = []) => (f) => concat(data.map(f));
    const inTheMiddle = ({ id }) => middleSet.includes(id);

    const [set1 = new Set(), set2 = new Set()] = graph.map(
      ({ _friends = [] }) => mapWith(_friends)(({ _friends = [] }) => _friends)
    ).map(data => new Set(data.map(({ id }) => id)));
    const middleSet = [...set1].filter(i => set2.has(i));
    graph.forEach(i => {
      i.friends = (i._friends || []).filter(({ _friends = [] }) => _friends.some(inTheMiddle))
    });
    const friends = mapWith(graph)(({ friends = [] }) => friends);
    friends.forEach(i => {
      i.friends = (i._friends || []).filter(inTheMiddle)
    });

    const firstLinks = mapWith(graph)(getLink(4));
    const allLinks = mapWith(friends)(getLink(1));
    const allFriends = middleSet.filter(id => !friends.some(i => i.id == id)).map(id => ({
      id,
      group: 2
    }));

    const links = [...firstLinks, ...allLinks];
    const nodes = [...graph, ...friends, ...allFriends];

    simulation.nodes(nodes).force("link").links(links);
    simulation.on("tick", ::this.forceUpdate);
    this.setState({
      nodes,
      links
    });

    function mouseover() {
      select(this).transition()
        .duration(750)
        .attr("r", 20);
    }

    function mouseout() {
      select(this).transition()
        .duration(750)
        .attr("r", 10);
    }

    // const getPattern = ({ uid, photo_50 }) => {
    //   const pattern = defs.append("pattern")
    //     .attr("id", uid)
    //     .attr("height", 1)
    //     .attr("width", 1)
    //     .attr("x", 0)
    //     .attr("y", 0);
    //   // pattern.append("image")
    //   //   .attr("x", 0)
    //   //   .attr("y", 0)
    //   //   .attr("height", 40)
    //   //   .attr("width", 40)
    //   //   .attr("xlink:href", photo_50);
    //   // return pattern
    // };

    function update() {


      // getPhoto(nodes.map(({ id }) => id))
      //   .then(({ payload }) => payload.map(getPattern))
      //   .then(() => node.attr("fill", ({ id }) => `url(#${id})`));

      // node.append("title")
      //   .text(({ id }) => id);

    }
  }

  click(data) {

    console.log(data)

      // if (data._closed) {
      //   [data._friends, data._closed] = [data._closed, undefined];
      // }
      // else {
      //   [data._closed, data._friends] = [data._friends, undefined];
      // }
      // update();
  }

  render() {
    const color = scaleOrdinal(schemeCategory20);

    return <svg width={1200} height={800}>
      <defs>
        {this.state.nodes.map(node => <pattern id="" height="1" width="1" x="0" y="0">
          <image x="0" y="0" height="40" width="40" xlinkHref=""/>
        </pattern>)}
      </defs>


      {this.state.nodes.map(
        node => <circle key={node.index} className="nodes" cx={node.x} cy={node.y}
                        r={node.group == 0 ? 20 : (20 - node.group * 5)}
                        stroke={color(node.group)}/>)}
      {this.state.links.map(
        link => <line key={link.index} x1={link.source.x} y1={link.source.y} x2={link.target.x} y2={link.target.y}
                      strokeWidth={Math.sqrt(link.value)}
                      className="links"/>)}
    </svg>
  }
}
