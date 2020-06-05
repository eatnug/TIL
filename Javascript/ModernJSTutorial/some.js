function onSubmit() {
    var movie = document.getElementById('movie');   // 영화 제목 입력 값 저장
    var date = document.getElementById('date');     // 날짜 입력 값 저장
    var time = document.getElementById('time');     // 시간 입력 값 저장

    localStorage.setItem('movie', movie);   // 로컬 스토리지에 영화 제목 값 저장
    localStorage.setItem('date', date);     // 로컬 스토리지에 날짜 값 저장
    localStorage.setItem('time', time);     // 로컬 스토리지에 시간 값 저장
}