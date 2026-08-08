export function normalizeKakaoPlace(place) {
  const categoryParts = place.category_name?.split(" > ") ?? [];

  return {
    provider: "KAKAO",
    placeId: place.id,
    placeName: place.place_name,
    addressName: place.address_name,
    roadAddressName: place.road_address_name,
    latitude: Number(place.y),
    longitude: Number(place.x),
    categoryName: categoryParts.slice(-2).join(" · "),
  };
}
