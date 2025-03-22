document.addEventListener('DOMContentLoaded', function() {
    let aside = document.querySelector('aside');
    let navItems = aside.getElementsByClassName('nav-item');
    let links = aside.getElementsByClassName('li-link');
    let subMenus = aside.getElementsByClassName('sub-menu');

    function closeAllSubMenus() {
        Array.from(subMenus).forEach(menu => {
            menu.style.maxHeight = '0px';
            let parentLink = menu.previousElementSibling;
            if (parentLink) {
                parentLink.classList.remove('expanded');
            }
        });
    }

    function updateTitle(newTitle) {
        const mainTitle = document.getElementById('main-title');
        mainTitle.textContent = newTitle;
    }

    Array.from(navItems).forEach(navItem => {
        let link = navItem.querySelector('.li-link');
        let newTitle = navItem.querySelector('.item-label');
        let subMenu = navItem.querySelector('.sub-menu');

        link.addEventListener('click', function(event) {
            if (subMenu) {
                let isExpanded = subMenu.style.maxHeight && subMenu.style.maxHeight !== '0px';
                closeAllSubMenus();
                subMenu.style.maxHeight = subMenu.scrollHeight + 'px';
                link.classList.add('expanded');
                event.preventDefault();
            } else {
                closeAllSubMenus();
            }
            Array.from(links).forEach(l => l.classList.remove('active', 'child-active'));
            link.classList.add('active');
            updateTitle(newTitle.textContent);
        });
    });

    Array.from(subMenus).forEach(subMenu => {
        let subLinks = subMenu.getElementsByClassName('li-link');
        Array.from(subLinks).forEach(subLink => {
            subLink.addEventListener('click', function(event) {
                let newTitle = subLink.querySelector('.item-label');
                Array.from(links).forEach(link => link.classList.remove('active', 'child-active'));
                subLink.classList.add('active', 'child-active');
                updateTitle(newTitle.textContent);
                event.stopPropagation();
            });
        });
    });
});
