const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 5;
const apiKey ='IVNZd9oqVKxJ4xNZG-hhNH-Vm5WdRDtJXGIWuf0-ZXo';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

// 반복적으로 setAttribute하는 부분을 함수형으로 정의해주자.
function setAttributes(element, attributes){
    for(const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// 이미지 로드 완료시 
function imageLoaded(){
    console.log('image loaded');
    imagesLoaded++;
    // 총 이미지 수와 로드된 이미지 수가 같다면 ready 가 true
    if( imagesLoaded === totalImages){
        ready = true;

        // 이미지 로드가 완료되면 hidden
        loader.hidden = true;

        // 초기 페이지 접속시에 빠른 접속을 위해 5개만 로드 시키고
        // 사용자 요청으로 이미지가 더 필요 할때 보다 많은 수의 이미지를 로드한다.
        count = 30;

        console.log('ready =',ready);
    }
}

// 이미지 링크를 담은 이미지 DOM 생성
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log('total images', totalImages);
    // for each를 통해 배열에 담기

    // 로드된 이미지 마다 실행
    photosArray.forEach((photo) =>{
        // 이미지 클릭시 이동할 a 링크 생성
        const item = document.createElement('a');

        setAttributes(item,{
            href: photo.links.html,
            target: '_balnk',
        });

        // 이미지 생성
        const img = document.createElement('img');

        setAttributes(img,{
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })

        // 로딩이 끝나면 이벤트 리스너 추가
        img.addEventListener('load', imageLoaded);

        // 위 두가지를 담을 컨테이너 정의
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// 스크롤 이벤트로 사진을 불러오기
window.addEventListener('scroll', () =>{

    // 윈도우 창의 높이값과 스크롤 값을 더한 값보다 바디의 기본으로 지정된 높이의 -1000보다 크고 이미지 로드가 완료된 상태일때 실행
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready)
    {
        // console.log('window.innerHeight:', window.innerHeight);
        // console.log('window.scrollY:', window.scrollY);
        // console.log('window.innerHeight + scrollY', window.scrollY + window.innerHeight);
        // console.log('document.body.offsetHeight - 1000:', document.body.offsetHeight - 1000);
        // console.log('load more');
        ready = false;
        getPhotos();
    }
});

// 사진 가져오기 API 이용
async function getPhotos(){
    // 현재는 API를 이용해 이미지를 불러옴

    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    }catch(error){
        // 오류 처리
    }
}

// 이미지 로드
getPhotos();