React 적용 순서
1. UI를 컴포넌트 계층으로 나누기

먼저 화면을 보고 역할별로 컴포넌트를 나눈다.

예제에서는 다음과 같이 구분한다.

FilterableProductTable
├─ SearchBar
└─ ProductTable
   ├─ ProductCategoryRow
   └─ ProductRow

컴포넌트를 나눌 때는 다음 기준을 생각할 수 있다.

하나의 컴포넌트가 한 가지 역할만 하는가
반복해서 사용할 수 있는 부분인가
데이터 구조와 UI 구조가 대응하는가
너무 커져서 하위 컴포넌트로 분리할 필요가 있는가

즉, 화면을 기능과 책임에 따라 작은 컴포넌트로 쪼개고 부모·자식 관계를 정하는 단계다.

2. State 없이 정적인 화면 구현하기

컴포넌트 구조를 정했다면 먼저 사용자 입력이나 클릭 기능 없이 화면부터 만든다.

이 단계에서는 다음만 사용한다.

JSX로 화면 작성
Props로 부모에서 자식에게 데이터 전달
전달받은 데이터를 화면에 출력
function ProductRow({ product }) {
  return (
    <tr>
      <td>{product.name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

이때는 아직 useState를 사용하지 않는다.

데이터
  ↓
부모 컴포넌트
  ↓ props
자식 컴포넌트
  ↓
화면 출력

먼저 주어진 데이터가 화면에 제대로 표시되는 정적 버전을 완성한 다음 상호작용을 추가하는 방식이다.

3. 필요한 최소한의 State 찾기

정적인 화면이 완성되면 화면에서 어떤 값이 변하는지 찾아 State를 결정한다.

글에서는 어떤 값이 State인지 다음 기준으로 판단한다.

1. 시간이 지나도 변하지 않는가?
   → State가 아님

2. 부모에게 Props로 전달받는가?
   → State가 아님

3. 다른 State나 Props로 계산할 수 있는가?
   → State가 아님

4. 시간이 지나면서 변하고 다른 값으로 계산할 수 없는가?
   → State일 가능성이 높음

예제에서는 다음 데이터가 있다.

제품 원본 목록
사용자가 입력한 검색어
재고 상품만 보기 체크 여부
필터링된 상품 목록

이 중 State는 다음 두 개뿐이다.

const [filterText, setFilterText] = useState('');
const [inStockOnly, setInStockOnly] = useState(false);

제품 목록은 부모에게 받은 Props이고, 필터링된 상품 목록은 다른 데이터로 계산할 수 있으므로 State로 만들지 않는다.

const filteredProducts = products.filter(/* 검색 조건 */);

핵심은 State를 가능한 한 최소화하고, 계산할 수 있는 값은 저장하지 않는 것이다.

4. State를 소유할 컴포넌트 정하기

필요한 State를 찾았다면 어느 컴포넌트가 State를 관리할지 결정한다.

순서는 다음과 같다.

1. 해당 State를 사용하는 컴포넌트를 찾는다.
2. 그 컴포넌트들의 가장 가까운 공통 부모를 찾는다.
3. 공통 부모가 State를 소유한다.
4. 자식에게 State를 Props로 내려준다.

예제에서는 SearchBar와 ProductTable 모두 검색어와 체크 여부가 필요하다.

FilterableProductTable
├─ SearchBar       ← 검색어와 체크 여부 사용
└─ ProductTable    ← 검색어와 체크 여부 사용

따라서 공통 부모인 FilterableProductTable이 State를 가진다.

function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <>
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
      />

      <ProductTable
        products={products}
        filterText={filterText}
        inStockOnly={inStockOnly}
      />
    </>
  );
}

이것이 State 끌어올리기(Lifting State Up)다.

여러 자식 컴포넌트가 같은 State를 사용한다면 가장 가까운 공통 부모가 State를 관리한다.

5. 자식의 이벤트로 부모 State 변경하기

마지막으로 사용자의 입력에 따라 State가 변경되도록 이벤트를 연결한다.

State는 부모가 가지고 있지만 실제 입력은 자식인 SearchBar에서 발생한다.

따라서 부모가 State 변경 함수를 자식에게 Props로 전달한다.

<SearchBar
  filterText={filterText}
  inStockOnly={inStockOnly}
  onFilterTextChange={setFilterText}
  onInStockOnlyChange={setInStockOnly}
/>

자식은 이벤트가 발생했을 때 전달받은 함수를 실행한다.

function SearchBar({
  filterText,
  inStockOnly,
  onFilterTextChange,
  onInStockOnlyChange,
}) {
  return (
    <>
      <input
        value={filterText}
        onChange={(e) => onFilterTextChange(e.target.value)}
      />

      <input
        type="checkbox"
        checked={inStockOnly}
        onChange={(e) => onInStockOnlyChange(e.target.checked)}
      />
    </>
  );
}

전체 흐름은 다음과 같다.

사용자가 SearchBar에 입력
        ↓
SearchBar의 onChange 실행
        ↓
부모에게 받은 setter 함수 실행
        ↓
부모 State 변경
        ↓
부모가 변경된 값을 Props로 다시 전달
        ↓
SearchBar와 ProductTable 리렌더링

데이터 자체는 부모에서 자식으로 내려가지만, 자식에서 발생한 이벤트를 통해 부모의 State를 바꾸므로 이를 역방향 데이터 흐름 추가라고 표현한다. 실제 데이터 흐름 원칙은 여전히 부모에서 자식으로 흐르는 단방향 구조다.

최종 정리
1. 화면을 컴포넌트 단위로 나눈다.
2. Props만 사용해 정적인 화면부터 만든다.
3. 변하는 데이터 중 최소한의 State를 찾는다.
4. State를 사용할 컴포넌트들의 공통 부모에 State를 둔다.
5. State와 변경 함수를 Props로 내려 이벤트를 연결한다.

한 줄 요약

화면을 컴포넌트로 나눈 뒤 정적인 UI를 먼저 만들고, 필요한 최소 State를 공통 부모에서 관리하면서 Props와 이벤트 콜백으로 컴포넌트를 연결하는 순서다.