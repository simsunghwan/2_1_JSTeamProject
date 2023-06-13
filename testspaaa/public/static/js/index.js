    import Home from "./views/Home.js";
    import About from "./views/About.js";
    import PostView from "./views/PostView.js";
    import Contact from "./views/Contact.js";
    import BoardView from "./views/BoardView.js";
    import AdminPages from "./views/admin/Pages.js";
    import AdminAddPage from "./views/admin/AddPage.js";
    import AdminEditPage from "./views/admin/EditPage.js";
    import AdminCategories from "./views/admin/Categories.js";
    import AdminAddCategory from "./views/admin/AddCategory.js";
    import AdminEditCategory from "./views/admin/EditCategory.js";
    import AdminProducts from "./views/admin/Products.js";
    import AdminAddProduct from "./views/admin/AddProduct.js";
    import AddBoard from "./views/AddBoard.js";

    const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

    const getParams = match => {
        const values = match.result.slice(1);
        const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

        return Object.fromEntries(keys.map((key, i) => {
            return [key, values[i]];
        }));
    };

    const navigateTo = url => {
        history.pushState(null, null, url);
        router();
    };

    const router = async () => {
        const routes = [
            { path: "/", view: Home },
            { path: "/about", view: About },
            { path: "/posts/:id", view: PostView },
            { path: "/contact", view: Contact },
            { path: "/board", view: BoardView},
            { path: "/board/add-board", view: AddBoard},
            { path: "/admin/pages", view: AdminPages },
            { path: "/admin/pages/add-page", view: AdminAddPage },
            { path: "/admin/pages/edit-page/:id", view: AdminEditPage },
            { path: "/admin/categories", view: AdminCategories },
            { path: "/admin/categories/add-category", view: AdminAddCategory },
            { path: "/admin/categories/edit-category/:id", view: AdminEditCategory },
            { path: "/admin/products", view: AdminProducts },
            { path: "/admin/products/add-product", view: AdminAddProduct }
        ];

        // Test each route for potential match
        const potentialMatches = routes.map(route => {
            return {
                route: route,
                result: location.pathname.match(pathToRegex(route.path))
            };
        });

        let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);

        if (!match) {
            match = {
                route: routes[0],
                result: [location.pathname]
            };
        }

        console.log(match.route);
        const view = new match.route.view(getParams(match));

        document.querySelector("#app").innerHTML = await view.getHtml();
        view.pageFunction();
    };

    window.addEventListener("popstate", router);

    document.addEventListener("DOMContentLoaded", () => {
        document.body.addEventListener("click", e => {
            if (e.target.className === "btn btn-default") {
                
                navigateTo(e.target.dataset.href);
                return;
            } 
            if (e.target.className === "confirmDeletion") {
                e.preventDefault();
                navigateTo(location.pathname);
                return;
            }
            if (e.target.matches("[data-link]")) {
                e.preventDefault();
                navigateTo(e.target.href);
                return;
            }
        });

        router();
    });