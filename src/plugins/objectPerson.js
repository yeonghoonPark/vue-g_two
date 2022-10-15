// objectPlugins의 예

// export default {
//   install(app, options) {
//     const person = {
//       name: "Jasper",
//       say() {
//         alert(this.name);
//       },
//     };
//     app.config.globalProperties.$person = person;
//   },
// };

const objectPerson = {
  install(app, options) {
    const person = {
      name: "Jasper",
      say() {
        alert(this.name);
      },
      ...options,
    };
    // inject 없이 사용가능, 단 options api에서만 사용할 수 있음
    app.config.globalProperties.$person = person;

    // inject 없이 사용 불가능, 하지만 composition api에서 사용할 수 있음
    app.provide("person", person);
  },
};

export { objectPerson };
