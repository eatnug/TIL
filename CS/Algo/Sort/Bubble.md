## Bubble Sort

버블 정렬은 인접한 두 원소를 비교해서 조건이 맞지 않으면 서로를 교환하는 정렬 방법이다. 매 원소마다 이것을 반복하면 큰 값을 가진 원소가 점점 뒤로 옮겨지는데 이것이 비누방울이 수면 위로 올라오는 것과 비슷하다고 해서 버블 정렬이라고 한다.

### Pseudo code

```js
temp = 0
for ( i = 0 ~ N-1 ){
    for ( j = 1 ~ N-2 ){
        if(arr[j-1] > arr[j]) swap(a[j-1], a[j])
    }
}
```

### 시간 복잡도 & 공간 복잡도

- 시간 복잡도 
    - `n-1 + n-2 + ... + 2 + 1 => n(n-1)/2 => O(n^2)`
    - 정렬 되었든 안되었든 비교하니까 최악, 최선, 평균 모두 `O(n^2)`
- 공간 복잡도
    - 주어진 배열안에서 swap 하니까 `O(n)`

### 기타

- 구현 간단, 직관적. 
- 제 자리에서 다른 메모리 공간을 필요로 하지 않는다. `in-place sorting`
- `stable`
- 만약 제일 큰게 제일 처음에 있다면 한 칸 한 칸 다 타고 올라가야 해서 교환 횟수가 많다.
- [참고](https://github.com/GimunLee/tech-refrigerator/blob/master/Algorithm/%EA%B1%B0%ED%92%88%20%EC%A0%95%EB%A0%AC%20(Bubble%20Sort).md#%EA%B1%B0%ED%92%88-%EC%A0%95%EB%A0%AC-bubble-sort)

