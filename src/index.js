import Main from './pages/Main.js'
import vBoard from './pages/vBoard.js'
// import Men from './pages/Men.js'
// import Women from './pages/Women.js'

const $root = document.querySelector('#root');
// 페이지 전환
// history.pushState(state, title, URL) : 현재 페이지의 상태를 변경하지 않고, 새로운 주소를 추가
const routerLink = url => {
  history.pushState(null, null, url)
  router()
}

const router = async () => {
  // 경로 설정
  const routes = [
    { path: '/', view: Main },
    { path: '/vBoard', view: vBoard },
    { path: '/404', view: () => console.log('Viewing 404')}
  ]

  // 현재 접속되어있는 주소와 일치하는 경로를 찾기
  const pageMatch = routes.map(route => {
    return {
      route,
      isMatch: location.pathname === route.path
    }
  })
  
  // pageMatch는 배열으로 반환
  /* 0:
       isMatch: true
       route: {path: '/', view: ()} 
  */

  // isMatch가 true인 route를 찾기
  let match = pageMatch.find(page => page.isMatch)

  // 일치하는 경로가 없으면 404(맨 마지막 위치)로 이동
  if(!match) {
    match = {
      route: routes[routes.length - 1],
      isMatch: true
    }
  }

  // view 변수에 현재 경로에 맞는 view를 넣어주기
  const view = new match.route.view();

  // html을 가져오기
  document.querySelector('#root').innerHTML = await view.getHtml()
}

// 뒤로가기나 새로고침을 했을 때 router함수 실행
window.addEventListener('popstate', router)

// 렌더링 되면 router함수 실행
document.addEventListener('DOMContentLoaded', () => {

  // 클릭했을 때 data-link 속성이 있으면 routerLink 함수 실행
  document.body.addEventListener('click', e => {
    if(e.target.matches('[data-link]')) {
      e.preventDefault()
      routerLink(e.target.href)
    }
  })

  router()
})