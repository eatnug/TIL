## Insertion Sort

삽입 정렬은 배열을 앞,뒤로 나누어서 앞은 정렬된 배열 뒤는 정렬되지 않은 배열로 취급한다. 그후 정렬되지 않은 배열의 원소를 하나씩 순회하며 앞의 정렬된 배열에서 어느 자리에 삽입되어야 정렬을 유지할 수 있는 지 확인하고 삽입한다.

### Pseudo code

```js
for( i = 1 ~ N - 1 ){
    tmp = arr[i];
    prev = i - 1;
    while( (prev >= 0) && (arr[prev] > tmp) ) {
        arr[prev+1] = arr[prev];
        prev--;
    }
    arr[prev + 1] = tmp;                          
}
```

### 시간 복잡도 & 공간 복잡도

- 시간 복잡도 
    - 최악의 경우, 역으로 정렬된 경우 `n(n-1)/2 => O(n^2)`
    - 최선의 경우, 모두 정렬된 경우 한번씩만 비교해서 `O(n)`
    - 최악, 평균 `O(n^2)`, 최선 `O(n)`
- 공간 복잡도
    - 주어진 배열안에서 swap 하니까 `O(n)`

### 기타

- 구현 간단, 직관적. 
- 대부분 원소가 이미 정렬된 경우 매우 효율적
- `in-place sorting`
- `stable` 
- 다른 `O(n^2)`에 비해 빠른 편
- 길이가 길어질수록 비효율적
- [참고](https://github.com/GimunLee/tech-refrigerator/blob/master/Algorithm/삽입%20정렬%20(Insertion%20Sort).md#삽입-정렬-insertion-sort)


