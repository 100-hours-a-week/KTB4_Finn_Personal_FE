function LocationSearchResultRow({ place, onSelect }) {
  return (
    <button
      className="location-result-row"
      type="button"
      onClick={() => onSelect(place)}
    >
      <strong>{place.placeName}</strong>
      <span>{place.roadAddressName || place.addressName}</span>
      {place.categoryName && <small>{place.categoryName}</small>}
    </button>
  );
}

export default LocationSearchResultRow;

