## React Router v6.4에 추가된 라우터 방식

### RouterProvider와 CreateBrowserRouter
기존의 BrowserRouter로 최상단 rooot를 감싸는 방식 대신  RouterProvider와 CreateBrowserRouter를 사용
- route 링크들만 따로 분리시킨 디렉토리를 만든다.
- 중첩되어있는 경로는 children을 이용해서 사용할 수 있다.