import { useEffect, useState } from "react";
import filterSlidersIcon from "../../assets/filter-sliders.svg";

function SearchFeed({onSearch, isLoading}) {

  const [dateFilterType, setDateFilterType] = useState("TODAY");
  const [hashtag, setHashtag] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {

    const dates =calculateDateRange("TODAY");

    setStartDate(dates.startDate);
    setEndDate(dates.endDate);
  },[]); 

  


  const handleSubmit = (event) => {
    event.preventDefault();

    onSearch?.({
      hashtag: hashtag?.trim(),
      startDate: startDate?.trim(),
      endDate: endDate?.trim(),
    });
  }


  const dateFilterOptions = [
    { value: "TODAY", label: "오늘" },
    { value: "THIS_WEEK",  label: "이번주"},
    { value: "THIS_MONTH", label: "이번달" },
    { value: "CUSTOM_RANGE", label: "기간 설정" },
  ];


  const formatLocalDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() +1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`
  }

  const calculateDateRange = (filterType) => {
    const today = new Date();

    switch (filterType) {
      case "TODAY":
        return {
          startDate: formatLocalDate(today),
          endDate: formatLocalDate(today),
        };

      case "THIS_WEEK": {
        const dayOfWeek = today.getDay();
        const daysFromMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

        const monday = new Date(today);
        monday.setDate(today.getDate() - daysFromMonday);

        const sunday = new Date(monday);
        sunday.setDate(monday.getDate() + 6);

        return {
          startDate: formatLocalDate(monday),
          endDate: formatLocalDate(sunday),
        };
      }

      case "THIS_MONTH": {
        const firstDay = new Date(
          today.getFullYear(),
          today.getMonth(),
          1,
        );

        const lastDay = new Date(
          today.getFullYear(),
          today.getMonth() + 1,
          0,
        );

        return {
          startDate: formatLocalDate(firstDay),
          endDate: formatLocalDate(lastDay),
        };
      }

      default:
        return {
          startDate: "",
          endDate: "",
        };
    } 
  }

  const handleDateFilterChange = (filterType) => {
    setDateFilterType(filterType);

    if (filterType === "CUSTOM_RANGE") {
      setStartDate("");
      setEndDate("");
      return;
    }

    const range = calculateDateRange(filterType);

    setStartDate(range.startDate);
    setEndDate(range.endDate);
  };



  return (
    <div className="feed-filter">
  

      <form
        id="feed-filter-panel"
        className="feed-filter-panel"
        aria-label="피드 검색 필터"
        onSubmit={handleSubmit}
      >
        <div className="hashtag-search-row">
          <label className="hashtag-input" htmlFor="feed-hashtag">
            <span className="hashtag-prefix" aria-hidden="true">
              #
            </span>
            <input
              id="feed-hashtag"
              name="hashtag"
              type="search"
              value={hashtag}
              onChange={(event) => setHashtag(event.target.value)}
              placeholder="찾고 싶은 해시태그를 입력해주세요"
            />
          </label>

          <button
            type="submit"
            className="hashtag-search-button"
            disabled={isLoading}
            aria-busy={isLoading}
          >
            {isLoading ? "검색중..." : "검색"}
          </button>
        </div>

        <div
            className="date-filter-row"
            role="group"
            aria-label="게시 기간"
        >
            <span className="date-filter-label">게시 기간</span>

            {dateFilterOptions.map(({ value, label }) => {
              const isSelected = dateFilterType === value;

              return (
                <button
                  key={value}
                  type="button"
                  className={`date-filter-chip ${
                    isSelected ? "is-selected" : ""
                  }`}
                  aria-pressed={isSelected}
                  onClick={() => handleDateFilterChange(value)}
                >
                  {label}
                </button>
              );
            })}
        </div>

        {dateFilterType === "CUSTOM_RANGE" && (
          <div className="date-range-picker" aria-label="조회 기간 설정">
            <label className="date-range-field">
              <span>시작일</span>
              <input
                type="date"
                value={startDate}
                max={endDate || undefined}
                onChange={(event) => setStartDate(event.target.value)}
                required
              />
            </label>

            <span className="date-range-separator" aria-hidden="true">
              ~
            </span>

            <label className="date-range-field">
              <span>종료일</span>
              <input
                type="date"
                value={endDate}
                min={startDate || undefined}
                onChange={(event) => setEndDate(event.target.value)}
                required
              />
            </label>
          </div>
        )}
      </form>
    </div>
  );
}

export default SearchFeed;
