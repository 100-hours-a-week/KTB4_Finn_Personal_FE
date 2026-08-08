import { useRef, useState } from "react";
import searchIcon from "../../assets/icon-search-location.svg";
import { loadKakaoMaps } from "../../lib/kakaoMapLoader";
import { normalizeKakaoPlace } from "../../utils/kakaoPlace";
import KakaoMap from "./KakaoMap";
import LocationSearchResultRow from "./LocationSearchResultRow";
import SelectedLocationCard from "./SelectedLocationCard";

function LocationField({ value, onChange }) {
  const inputRef = useRef(null);
  const searchRequestRef = useRef(0);
  const [query, setQuery] = useState(value?.placeName ?? "");
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const previewPlace = results[0] ?? value;
  const isShowingResults = results.length > 0;

  const searchPlaces = async () => {
    const keyword = query.trim();

    if (!keyword) {
      setResults([]);
      setErrorMessage("장소명 또는 주소를 입력해주세요.");
      inputRef.current?.focus();
      return;
    }

    const requestId = searchRequestRef.current + 1;
    searchRequestRef.current = requestId;
    setIsSearching(true);
    setErrorMessage("");

    try {
      const kakao = await loadKakaoMaps();
      const places = new kakao.maps.services.Places();

      places.keywordSearch(keyword, (data, status) => {
        if (requestId !== searchRequestRef.current) {
          return;
        }

        setIsSearching(false);

        if (status === kakao.maps.services.Status.OK) {
          setResults(data.slice(0, 5).map(normalizeKakaoPlace));
          return;
        }

        setResults([]);

        if (status === kakao.maps.services.Status.ZERO_RESULT) {
          setErrorMessage("검색 결과가 없습니다. 다른 검색어를 입력해보세요.");
          return;
        }

        setErrorMessage("장소 검색에 실패했습니다. 잠시 후 다시 시도해주세요.");
      });
    } catch (error) {
      if (requestId === searchRequestRef.current) {
        setIsSearching(false);
        setResults([]);
        setErrorMessage(error.message);
      }
    }
  };

  const handleKeyDown = (event) => {
    if (event.nativeEvent.isComposing) {
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      searchPlaces();
    }
  };

  const handleSelect = (place) => {
    onChange(place);
    setQuery(place.placeName);
    setResults([]);
    setErrorMessage("");
  };

  const handleChangeLocation = () => {
    inputRef.current?.focus();
    inputRef.current?.select();
  };

  const handleRemoveLocation = () => {
    searchRequestRef.current += 1;
    onChange(null);
    setQuery("");
    setResults([]);
    setIsSearching(false);
    setErrorMessage("");
    inputRef.current?.focus();
  };

  return (
    <div className="location-field-content">
      <div className="location-search-shell">
        <button
          className="location-search-button"
          type="button"
          onClick={searchPlaces}
          aria-label="위치 검색"
          disabled={isSearching}
        >
          <img src={searchIcon} alt="" />
        </button>
        <input
          ref={inputRef}
          id="create-location"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="장소명 또는 주소를 검색하세요"
          autoComplete="off"
          aria-describedby={errorMessage ? "location-search-message" : undefined}
        />
        {isSearching && <span className="location-searching">검색 중</span>}
      </div>

      {errorMessage && (
        <p id="location-search-message" className="helper input-error" role="alert">
          {errorMessage}
        </p>
      )}

      {isShowingResults && (
        <>
          <div className="location-results" aria-label="장소 검색 결과">
            {results.map((place) => (
              <LocationSearchResultRow
                key={place.placeId}
                place={place}
                onSelect={handleSelect}
              />
            ))}
          </div>
          <p className="helper">
            검색 결과에서 장소를 선택하면 지도에 위치가 표시됩니다.
          </p>
        </>
      )}

      {previewPlace && <KakaoMap place={previewPlace} />}

      {value && !isShowingResults && (
        <SelectedLocationCard
          place={value}
          onChange={handleChangeLocation}
          onRemove={handleRemoveLocation}
        />
      )}
    </div>
  );
}

export default LocationField;

