## Quick Sort

퀵 정렬은 피벗이라는 값을 기준으로 배열을 나눈다. 배열은 피벗 기준으로 왼쪽은 피벗보다 작은 값, 오른쪽은 피벗보다 큰 값이 된다. 피벗을 옯겨다니면서 정렬을 수행한다.

### Pseudo code

```js
const partition = (arr, begin, end) => {
    [pivot,left,right] = [begin,begin,end]
    while(left < right){
        while(arr[left] <= a[pivot] && left < end) left++
        while(arr[right] >= a[pivot]) right--
        if(left < right) swap(arr[left], arr[right])
    }
    swap(a[pivot],right)
    return right;
}

const qs = (arr, begin, end) => {
    if(begin < end){
        pivot = partition(arr, begin, end)
        qs(arr, begin, pivot-1)
        qs(arr, pivot+1, end)
    }
}
```

### 시간 복잡도 & 공간 복잡도

- 시간 복잡도 
    - 최악의 경우 `O(n^2)`
    - 평균적으로 `O(nlogn)`
    - 최악, 평균 `O(n^2)`, 최선 `O(n)`
- 공간 복잡도
    - `O(logn)`

### 기타

- 피벗이 정해지는 위치에 따라 속도가 달라진다.
- `unstable` 
- [참고](https://github.com/kim6394/tech-interview-for-developer/blob/master/Algorithm/QuickSort.md)


