import { useState } from "react";
import filterSlidersIcon from "../../assets/filter-sliders.svg";

function FeedTabs(onSubmit) {

  const [hashtag, setHashtag] = useState(null);
  const [dateFilterType, setDateFilterType] = useState("TODAY");
  const [targetDate, setTargetDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");


  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit?.({
      hashtag: hashtag.trim(),
      dataFilterType,
      startDate:
        dateFilterType === "CUSTOM_RANGE" ? startDate : null,
      endDate:
        dateFilterType === "CUSTOM_RANGE" ? endDate : null,
      targetDate:
        dataFilterType === "SPECIFIC_DATE" ? targetDate : null,
    });
  }


  const dateFilterOptions = [
    { value: "TODAY", label: "오늘" },
    { value: "LAST_WEEK", label: "지난주" },
    { value: "SPECIFIC_DATE", label: "특정 날짜" },
    { value: "CUSTOM_RANGE", label: "기간 설정" },
  ];


  return (
    <div className="feed-filter">
      <div className="feed-filter-toggle-row">
        <button
          type="button"
          className="feed-filter-toggle is-expanded"
          aria-controls="feed-filter-panel"
          aria-expanded="true"
        >
          <span className="feed-filter-toggle-icon" aria-hidden="true">
            <img src={filterSlidersIcon} alt="" />
          </span>
          <span className="sr-only">검색 필터 닫기</span>
        </button>
      </div>

      <form
        id="feed-filter-panel"
        className="feed-filter-panel"
        aria-label="피드 검색 필터"
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
              placeholder="찾고 싶은 해시태그를 입력해주세요"
            />
          </label>

          <button type="submit" className="hashtag-search-button">
            검색
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
                  onClick={() => setDateFilterType(value)}
                >
                  {label}
                </button>
              );
            })}
        </div>
      </form>
    </div>
  );
}

export default FeedTabs;
