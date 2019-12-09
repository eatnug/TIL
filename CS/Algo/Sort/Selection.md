## Selcetion Sort

선택 정렬은 배열의 각 인덱스별로 거기에 들어갈 값을 선택하는 정렬이다. 앞의 인덱스부터 시작해서 아직 위치가 정해지지 않은 원소들 - 이번 회차에 삽입 하려는 원소보다 뒤에 있는 원소들 - 중에서 가장 작은 원소를 현재 목표 인덱스에 삽입하기로 선택하는 것.

### Pseudo code

```js
min, tmp = 0
for ( i= 0 ~ N-2 ){
    min = i
    for ( j = i+1 ~ N-1){
        if( arr[min] < arr[j] ) min = j;
    }
    swap(arr[i], arr[min])
}
```

### 시간 복잡도 & 공간 복잡도

- 시간 복잡도 
    - `n(n-1)/2 => O(n^2)`
    - 정렬 되었든 안되었든 비교하니까 최악, 최선, 평균 모두 `O(n^2)`
- 공간 복잡도
    - 주어진 배열안에서 swap 하니까 `O(n)`

### 기타

- 구현 간단, 직관적. 
- `bubble`에 비해서 교환 횟수가 적다.
- `in-place sorting`
- `unstable`
- [참고](https://github.com/GimunLee/tech-refrigerator/blob/master/Algorithm/%EC%84%A0%ED%83%9D%20%EC%A0%95%EB%A0%AC%20(Selection%20Sort).md#%EC%84%A0%ED%83%9D-%EC%A0%95%EB%A0%AC-selection-sort)



