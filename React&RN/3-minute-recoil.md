## 3분 recoil

#### why recoil?

- redux는 너무 무겁다.
- react-query로 sever state를 관리할 것이라, local state를 관리하기 위한 가벼운 선택지가 필요하다.
- context는 선별적 리렌더링이 불가능하다.

#### how to

- recoil은 간단하다.
- atom 이라는 상태 조각을 선언하고,
- 컴포넌트들은 해당 상태를 각종 유틸 함수로 구독하고, 갱신할 수 있음

사실상 이게 전부임. 한발짝 나아가면 selector라는 개념도 있다.

- 공식문서에 따르면 selector는 `derived state`를 나타낸다.
- `derived state = dynamic data that depends on other data`
- 즉 selector 어떤 데이터에 의존적인 데이터를 다룰 수 있게 해준다.
- 좀 지엽적일 수 있지만 어떤 버튼의 색이 어떤 값에 따라 바뀐다면 다음처럼 코드를 짤 수 있을 듯

```tsx
const labelState = atom({
    key:'label',
    default:'not-selected'
})

const colorState = selector({
    key: 'color',
    get: ({get}) => {
        const labelState = get(labelState)
        if(labelState === 'selected') return 'red'
        return 'blue'
    }
})

const CameleonButton = () => {
    const [label, setLabel] = useRecoilState(labelState)
    const color = useRecoilValue(colorState)

    const onClick = () => {
        if(label === 'selected') setLabel('not-selected')
        else setLabel('selected')
    }

    return <button onClick={onClick} color={color}>{label}</button>
}

// label이 selected가 되면 여기서 파생된 color는 red가 되고, not-selected가 되면 blue가 된다.
```

## 나머지

atomFamily, selectorFamily, Loadable는 6분 리코일에서