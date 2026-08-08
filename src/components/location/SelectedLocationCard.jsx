function SelectedLocationCard({ place, onChange, onRemove }) {
  return (
    <div className="selected-location-card">
      <div className="selected-location-info">
        <strong>{place.placeName}</strong>
        <span>{place.roadAddressName || place.addressName}</span>
      </div>

      <div className="selected-location-actions">
        <button type="button" className="change" onClick={onChange}>
          변경
        </button>
        <button type="button" onClick={onRemove}>
          삭제
        </button>
      </div>
    </div>
  );
}

export default SelectedLocationCard;

