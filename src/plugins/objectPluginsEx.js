const objectPluginsEx = {
  // parameter로 받아오는 2가지, app인스턴스와 options
  install(app, options) {
    console.log("@@app = ", app);
    console.log("@@options = ", options);

    // app.component() = 전역 컴포넌트를 선언할 수 있다.
    // app.config.globalProperties = 전역 앱인스턴스에 속성을 추가할 수 있다.
    // app.directive() = 커스텀 디렉티브를 선언할 수 있다.
    // app.provide() = 전역으로 리소스(함수, 데이터 등)를 주입할 수 있다.
  },
};

export { objectPluginsEx };
