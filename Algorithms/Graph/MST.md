## Spanning Tree

그래프 G에서 사이클 없이 그래프 G의 모든 정점과 그 정점들을 연결하는 간선으로 연결된 트리. 정점이 N개이면 간선은 N-1개

## Minimum Spanning Tree

Weight가 최소가 되게하는 Spanning Tree

- Kruskal
    - 간선의 weight를 오름차순으로 정리
    - 사이클을 만들지 않는 간선들만 차례대로 삽입
    - N-1개 까지 삽입한다.
- Prim
    - 모든 점을 순회한다.
    - 각 점에서 연결할 수 있는 간선 중 weigth가 가장 작은 간선을 선택한다
    - 사이클이 생기면 다음순위의 간선을 선택한다.
    - N-1까지 반복한다.