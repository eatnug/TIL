## Merge Sort

합병정렬은 배열을 쪼갤 수 있을 만큼 잘게 쪼갠 다음 합치면서 정렬하는 알고리즘이다.

### Pseudo code

```js
const mergeSort = (arr, m, n) => {
    if(arr[m:n] 원소수 >= 2){
        mid = (m+n) / 2
        mergeSort(arr, m, mid)
        merseSort(arr, mid+1, n)
        merge(arr[m:mid], arr[mid+1, n])
    }
}

const merge = () => {
    //정렬 하면서 합친다.
}
```

### 시간 복잡도 & 공간 복잡도

- 시간 복잡도 
    - 평균, 최선, 최악`O(nlogn)`
- 공간 복잡도
    -  `O(n)`

### 기타

- `unstable`
- [참고](https://github.com/kim6394/tech-interview-for-developer/blob/master/Algorithm/MergeSort.md)
