import { useEffect, useRef, useState } from "react";
import { loadKakaoMaps } from "../../lib/kakaoMapLoader";

function KakaoMap({ place }) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const placeRef = useRef(place);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  placeRef.current = place;

  useEffect(() => {
    let isMounted = true;
    let resizeObserver = null;

    loadKakaoMaps()
      .then((kakao) => {
        const currentPlace = placeRef.current;

        if (!isMounted || !containerRef.current || !currentPlace) {
          return;
        }

        const position = new kakao.maps.LatLng(
          currentPlace.latitude,
          currentPlace.longitude,
        );
        const map = new kakao.maps.Map(containerRef.current, {
          center: position,
          level: 4,
        });
        const markerElement = document.createElement("span");

        markerElement.className = "location-map-marker";
        markerElement.setAttribute("aria-hidden", "true");

        const marker = new kakao.maps.CustomOverlay({
          position,
          content: markerElement,
          yAnchor: 1.2,
        });

        marker.setMap(map);
        mapRef.current = map;
        markerRef.current = marker;

        resizeObserver = new ResizeObserver(() => {
          map.relayout();
          map.setCenter(marker.getPosition());
        });
        resizeObserver.observe(containerRef.current);
        setErrorMessage("");
      })
      .catch((error) => {
        if (isMounted) {
          setErrorMessage(error.message);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
      resizeObserver?.disconnect();
      markerRef.current?.setMap(null);
      markerRef.current = null;
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current || !markerRef.current || !place) {
      return;
    }

    loadKakaoMaps().then((kakao) => {
      const position = new kakao.maps.LatLng(
        place.latitude,
        place.longitude,
      );

      markerRef.current?.setPosition(position);
      mapRef.current?.setCenter(position);
    });
  }, [place]);

  return (
    <div className="location-map-wrap">
      <div
        ref={containerRef}
        className="location-map"
        aria-label={`${place.placeName} 지도 위치`}
      />

      {(isLoading || errorMessage) && (
        <div className={`location-map-status${errorMessage ? " error" : ""}`}>
          {errorMessage || "지도를 불러오는 중입니다."}
        </div>
      )}
    </div>
  );
}

export default KakaoMap;

