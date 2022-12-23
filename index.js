'use strict'

function bfs(rGraph, s, t, parent) {
	var visited = [];
	var queue = [];
	var V = rGraph.length;
	// Створення відвіданого масиву і позначити всі вершини як невідвідані
	for (var i = 0; i < V; i++) {
		visited[i] = false;
	}
	// Створення черги, поставити вихідну вершину в чергу та позначити вихідну вершину як відвідану
	queue.push(s);
	visited[s] = true;
	parent[s] = -1;

	while (queue.length != 0) {
		var u = queue.shift();
		for (var v = 0; v < V; v++) {
			if (visited[v] == false && rGraph[u][v] > 0) {
				queue.push(v);
				parent[v] = u;
				visited[v] = true;
			}
		}
	}
	// Якщо ми досягли приймача в BFS, починаючи з джерела, тоді повертаємо true, інакше false
	return (visited[t] == true);
}

module.exports = function fordFulkerson(graph, s, t) {
	
  if (s < 0 || t < 0 || s > graph.length-1 || t > graph.length-1){
    throw new Error("Ford-Fulkerson :: недійсний потік або джерело");
  }
  if(graph.length === 0){
    throw new Error("Ford-Fulkerson :: недійсний граф");
  }
	var rGraph = [];
	for (var u = 0; u < graph.length; u++) {
		var temp = [];
    if(graph[u].length !== graph.length){
      throw new Error("Ford-Fulkerson :: недійсний граф. графік має бути NxN");
    }
		for (v = 0; v < graph.length; v++) {
			temp.push(graph[u][v]);
		}
		rGraph.push(temp);
	}
	var parent = [];
	var maxFlow = 0;

	while (bfs(rGraph, s, t, parent)) {
		var pathFlow = Number.MAX_VALUE;
		for (var v = t; v != s; v = parent[v]) {
			u = parent[v];
			pathFlow = Math.min(pathFlow, rGraph[u][v]);
		}
		for (v = t; v != s; v = parent[v]) {
			u = parent[v];
			rGraph[u][v] -= pathFlow;
			rGraph[v][u] += pathFlow;
		}


		maxFlow += pathFlow;
	}
	// Повертає загальний потік
	return maxFlow;
}
