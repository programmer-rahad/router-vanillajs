// window history push state function
function windowHistoryPushState(url) {
    window.history.pushState({}, '', url);
} 

function Header() {
    var menu = document.querySelector('nav>div>div:nth-of-type(1)');
    var links = document.querySelector('nav>div>div:last-child');

    function LinksShowHideOnResizeAndLoad() {
        if (window.innerWidth < 576.98) {
            links.style.display = 'none';
        } else {
            links.style.display = 'block';
        }
    }
    LinksShowHideOnResizeAndLoad();

    // show hide links on click 
    menu.addEventListener('click', function () {
        if (links.style.display == 'none') {
            links.style.display = 'block';
        } else {
            links.style.display = 'none';
        }
    });

    // show hide links on resize
    window.addEventListener('resize', LinksShowHideOnResizeAndLoad);

}

Header();

// dom content load event
window.addEventListener('DOMContentLoaded', async function () {
  
    // custom Routing 
    function customRouting() {
        let url = window.location.href.split('/')
        url = url[url.length - 1];
        url = url.split('.')[0];
       
        const pages = {
            home: document.querySelector('#home-content'),
            about: document.querySelector('#about-content'),
            contact: document.querySelector('#contact-content'),
            products: document.querySelector('#products-content'),
            // 'blog': document.querySelector('#blog-content'),
            // '404': document.querySelector('#404-content')
        }
        for (const property in pages) {
            const page = pages[property];
            page.style.display = 'none';
        }
        pages.home.style.display = 'block';
        
        // if (url === '' || url === 'index') {
        //     pages['home'].style.display = 'block';
        // }

        const links = [...document.querySelectorAll('nav>div>div:last-child>a'), document.querySelector('nav a.logo')];
        for (const link of links) {
            link.addEventListener('click', function () {
                event.preventDefault();
                const pageName = link.getAttribute('href');
                const page = pages[pageName];                
                page.style.display = 'block';
                for (const key in pages) {
                    const p = pages[key];
                    if(p !== page) {
                        p.style.display = 'none';
                    } 
                }

                windowHistoryPushState(pageName);
            });
        }

        

    }

    customRouting();
});
