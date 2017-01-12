import React, {Component} from 'react'
import {select, scaleOrdinal, schemeCategory20, drag, event} from "d3";

export default class Graph extends Component {
  componentDidMount() {
    this.meter = this.refs.meter;
    this.worker = new Worker("worker.js");
    this.svg = select(this.refs.graph)
      .append("svg").attr('width', 1200).attr('height', 800);
  }

  componentWillReceiveProps({ graph, result:[result1 = { photo: '' }], result2:[result2 = { photo: '' }] }) {

    const { svg, worker, meter } = this;
    const color = scaleOrdinal(schemeCategory20);
    if (graph.length) {
      update();
    }

    function mouseover() {
      select(this).transition()
        .duration(750)
        .attr("r", 16);
    }

    function mouseout() {
      select(this).transition()
        .duration(750)
        .attr("r", 8);
    }

    function tick({ progress }) {
      meter.style.width = 100 * progress + "%";
    }

    function ended({ nodes, links }) {
      svg.html('');
      // const defs = this.svg.append("defs").attr("id", "imgdefs")
      // const catpattern1 = defs.append("pattern")
      //   .attr("id", "catpattern1")
      //   .attr("height", 1)
      //   .attr("width", 1)
      //   .attr("x", 0)
      //   .attr("y", 0);
      // catpattern1.append("image")
      //   .attr("x", 0)
      //   .attr("y", 0)
      //   .attr("height", 40)
      //   .attr("width", 40)
      //   .attr("xlink:href", result1.photo);
      // const catpattern2 = defs.append("pattern")
      //   .attr("id", "catpattern2")
      //   .attr("height", 1)
      //   .attr("width", 1)
      //   .attr("x", 0)
      //   .attr("y", 0);
      // catpattern2.append("image")
      //   .attr("x", 0)
      //   .attr("y", 0)
      //   .attr("height", 40)
      //   .attr("width", 40)
      //   .attr("xlink:href", result2.photo);
      // const simulation = d3f.forceSimulation()
      //   .force("link", d3f.forceLink().id(({ data:{ id } }) => id).distance(30))
      //   .force("charge", d3f.forceManyBody().strength(-10).distanceMin(1).distanceMax(500))
      //   .force("collide", d3f.forceCollide(8))
      //   .force("center", d3f.forceCenter(1200 / 2, 800 / 2));

      const link = svg.append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(links)
        .enter().append("line")
        .attr("stroke-width", 1)
      //.attr("stroke-width", function (d) { return Math.sqrt(d.value); });
      const node = svg.append("g")
        .attr("class", "nodes")
        .selectAll("circle")
        .data(nodes)
        .enter().append("circle")
        //.attr("r", function (d) { return d.group == 0 || d.group == 1 ? 20 : (20 - d.group * 5); })
        .attr("r", 8)
        // .attr("fill", function ({ group }) {
        //     let fill;
        //     switch (group) {
        //       case 0 :
        //         fill = "url(#catpattern1)";
        //         break;
        //       case 1:
        //         fill = "url(#catpattern2)";
        //         break;
        //       default:
        //         fill = color(group);
        //     }
        //     return fill
        //   }
        // )
        .attr("fill", ({ group }) => color(group))
        .on("mouseover", mouseover)
        .on("mouseout", mouseout)
        .on("click", click)
      // .call(drag()
      //   .on("start", dragstarted)
      //   .on("drag", dragged)
      //   .on("end", dragended));

      node.append("title")
        .text(({ id }) => id);
      link
        .attr("x1", function (d) { return d.source.x; })
        .attr("y1", function (d) { return d.source.y; })
        .attr("x2", function (d) { return d.target.x; })
        .attr("y2", function (d) { return d.target.y; });

      node
        .attr("cx", function (d) { return d.x; })
        .attr("cy", function (d) { return d.y; });

      function ticked() {
        link
          .attr("x1", function (d) { return d.source.x; })
          .attr("y1", function (d) { return d.source.y; })
          .attr("x2", function (d) { return d.target.x; })
          .attr("y2", function (d) { return d.target.y; });

        node
          .attr("cx", function (d) { return d.x; })
          .attr("cy", function (d) { return d.y; });
      }

      function dragstarted(d) {
        if (!event.active) {
          simulation.alphaTarget(0.3).restart();
        }
        d.fx = d.x;
        d.fy = d.y;
      }

      function dragged(d) {
        d.fx = event.x;
        d.fy = event.y;
      }

      function dragended(d) {
        if (!event.active) {
          simulation.alphaTarget(0);
        }
        d.fx = null;
        d.fy = null;
      }

      function deepSearch(a, id) {
        for (let data of a) {
          if (data.id == id) {
            return data
          }
          else {
            if (data.friends) {
              const deep = deepSearch(data.friends, id);
              if (deep) {
                return deep
              }
            }
          }
        }

      }

      function click({ id }) {
        if (!event.defaultPrevented) {
          const data = deepSearch(graph, id);
          if (data.friends) {
            data._friends = data.friends;
            data.friends = null;
          }
          else {
            data.friends = data._friends || null;
            data._friends = null;
          }
          update();
        }
      }

    }

    function

    update() {

      worker.postMessage(graph);
      worker.onmessage = function ({ data }) {
        switch (data.type) {
          case "tick":
            return tick(data);
          case "end":
            return ended(data);
          case "friends":
            console.log(data);
        }
      };

      // simulation
      //   .nodes(nodes)
      //   .on("tick", ticked);
      //
      // simulation.force("link")
      //   .links(links);
    }
  }

  render() {
    return <div>
      <div ref="meter" className="progress"></div>
      <div ref="graph"></div>
    </div>
  }
}
