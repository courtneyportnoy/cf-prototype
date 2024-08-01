document.addEventListener('DOMContentLoaded', function() {
    let aside = document.querySelector('aside');
    let navItems = aside.getElementsByClassName('nav-item');
    let links = aside.getElementsByClassName('li-link');
    let subMenus = aside.getElementsByClassName('sub-menu');

    // Function to close all sub menus
    function closeAllSubMenus() {
        Array.from(subMenus).forEach(menu => menu.style.maxHeight = '0px');
    }

    // Function to update the h1 text with the text from the span
    function updateTitle(newTitle) {
        const mainTitle = document.getElementById('main-title');
        console.log(mainTitle);
        console.log(newTitle);
        mainTitle.textContent = newTitle;
    }


    // Add click event listeners to all nav items
    Array.from(navItems).forEach(navItem => {
        let link = navItem.querySelector('.li-link');
        let newTitle = navItem.querySelector('.item-label');
        link.addEventListener('click', function(event) {
            let subMenu = navItem.querySelector('.sub-menu');

            // Check if the current nav item has a sub menu
            if (subMenu) {
                let isExpanded = subMenu.style.maxHeight && subMenu.style.maxHeight !== '0px';
                closeAllSubMenus();
                subMenu.style.maxHeight = isExpanded ? '0px' : subMenu.scrollHeight + 'px';
                event.preventDefault();
            } else {
                closeAllSubMenus(); // Close all sub menus if a non-accordion item is clicked
            }

            // Remove active class from all links and add to the clicked link
            Array.from(links).forEach(link => link.classList.remove('active', 'child-active'));
            link.classList.add('active');

            // Update the main title
            updateTitle(newTitle.textContent);
        });
    }); 

    // Add click event listeners to all sub menu links
    Array.from(subMenus).forEach(subMenu => {
        let subLinks = subMenu.getElementsByClassName('li-link');
        Array.from(subLinks).forEach(subLink => {
            subLink.addEventListener('click', function(event) {
                let newTitle = subLink.querySelector('.item-label');
                Array.from(links).forEach(link => link.classList.remove('active', 'child-active'));
                subLink.classList.add('active', 'child-active');
                // Update the main title
                updateTitle(newTitle.textContent);
                event.stopPropagation();
            });
        });
    });
});
