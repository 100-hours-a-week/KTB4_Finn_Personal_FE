const KAKAO_MAP_SDK_ID = import.meta.env.VITE_KAKAO_MAP_APP_KEY?.trim();;

let kakaoMapSdkPromise = null;

function getLoadedKakaoMaps() {
  if (window.kakao?.maps?.services) {
    return window.kakao;
  }

  return null;
}

export function loadKakaoMaps() {
  const loadedKakao = getLoadedKakaoMaps();

  if (loadedKakao) {
    return Promise.resolve(loadedKakao);
  }

  if (kakaoMapSdkPromise) {
    return kakaoMapSdkPromise;
  }

  const appKey = import.meta.env.VITE_KAKAO_MAP_APP_KEY?.trim();

  if (!appKey) {
    return Promise.reject(
      new Error("VITE_KAKAO_MAP_APP_KEY 환경변수가 설정되지 않았습니다."),
    );
  }

  kakaoMapSdkPromise = new Promise((resolve, reject) => {
    const finishLoading = () => {
      if (!window.kakao?.maps) {
        kakaoMapSdkPromise = null;
        reject(new Error("카카오맵 SDK를 불러오지 못했습니다."));
        return;
      }

      window.kakao.maps.load(() => {
        const kakao = getLoadedKakaoMaps();

        if (!kakao) {
          kakaoMapSdkPromise = null;
          reject(new Error("카카오맵 검색 라이브러리를 불러오지 못했습니다."));
          return;
        }

        resolve(kakao);
      });
    };

    const existingScript = document.getElementById(KAKAO_MAP_SDK_ID);

    if (existingScript) {
      if (window.kakao?.maps) {
        finishLoading();
        return;
      }

      existingScript.addEventListener("load", finishLoading, { once: true });
      existingScript.addEventListener(
        "error",
        () => {
          kakaoMapSdkPromise = null;
          reject(new Error("카카오맵 SDK 요청에 실패했습니다."));
        },
        { once: true },
      );
      return;
    }

    const script = document.createElement("script");
    script.id = KAKAO_MAP_SDK_ID;
    script.async = true;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${encodeURIComponent(appKey)}&autoload=false&libraries=services`;
    script.addEventListener("load", finishLoading, { once: true });
    script.addEventListener(
      "error",
      () => {
        kakaoMapSdkPromise = null;
        script.remove();
        reject(new Error("카카오맵 SDK 요청에 실패했습니다."));
      },
      { once: true },
    );

    document.head.appendChild(script);
  });

  return kakaoMapSdkPromise;
}

