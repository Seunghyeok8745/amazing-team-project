window.initMap = function () {
  const map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 35.682839, lng: 139.759455 },
    zoom: 10,
  });

  // 도쿄 스카이트리 마커 생성
  new google.maps.Marker({
    position: { lat: 35.7100627, lng: 139.8081255 },
    // label: 'T', // 라벨을 'T'로 설정
    map: map,
    icon: {
      url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png', // 마커 아이콘 이미지 URL
      //   labelOrigin: new google.maps.Point(0, 0), // 라벨의 위치 조정
    },
  });
};

function showUserLocation() {
  // 브라우저가 Geolocation을 지원하는지 확인
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      // 위치를 성공적으로 받아왔을 때의 콜백 함수
      function (position) {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        // 사용자의 위치에 마커를 추가
        new google.maps.Marker({
          position: userLocation,
          map: window.map,
          icon: {
            url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
          },
        });

        // 지도를 사용자의 위치로 이동
        window.map.setCenter(userLocation);
      },
      // 위치를 받아오지 못했을 때의 오류 핸들링
      function (error) {
        console.error('Error getting user location:', error);
      }
    );
  } else {
    alert('Geolocation is not supported by this browser.');
  }
}
