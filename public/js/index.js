import Page from './pages/Page.js';
import AdminPage from './pages/AdminPage.js';

const navigateTo = url => {
  history.pushState(null, null, url);
  router();
};

const router = async () => {
  const routes = [
    { path: "/", view: Page },
    { path: "/admin", view: AdminPage }
  ];

  const pageMatches = routes.map(route => {
    const regex = new RegExp(`^${route.path.replace(/:[^/]+/g, "[^/]+")}$`);
    return {
      route,
      isMatch: regex.test(location.pathname)
    };
  });

  let match = pageMatches.find(pageMatch => pageMatch.isMatch);

  if (!match) {
    match = {
      route: routes[0],
      isMatch: true
    };
  }

  const view = new match.route.view();
  document.body.innerHTML = view.getHtml();

};

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
      if (e.target.matches("[data-linq]")) {
        e.preventDefault();
        navigateTo(e.target.href);
        return;
      }
      if (e.target.matches("[data-render]")) {
        console.log(e.target);
        if (document.querySelector('main-element')) {
          const mainElement = document.querySelector('main-element');
          mainElement.setAttribute('data-render', e.target.dataset.render);
          mainElement.setAttribute('data-index', e.target.dataset.index);
        }
        else if (document.querySelector('main-admin-element')) {
          const mainAdminElement = document.querySelector('main-admin-element');
          mainAdminElement.setAttribute('data-render', e.target.dataset.render);
          mainAdminElement.setAttribute('data-index', e.target.dataset.index);
        }
      }
      if (e.target.matches("[data-log]")) {
        if (document.querySelector('header-element')) {
          const headerElement = document.querySelector('header-element');
          headerElement.setAttribute('data-log', '');

        }
        else if (document.querySelector('header-admin-element')) {
          const headerAdminElement = document.querySelector('header-admin-element');
          headerAdminElement.setAttribute('data-log', '');
        }
      }
      });
    router();
});


