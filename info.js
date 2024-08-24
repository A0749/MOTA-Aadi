// script.js
document.addEventListener('DOMContentLoaded', () => {
    const card = document.getElementById('cardMap');
    const cardImage = document.getElementById('card-image');
    const cardHeading = document.getElementById('card-heading');
    const cardSubheading = document.getElementById('card-subheading');
    const cardParagraph = document.getElementById('card-paragraph');
    const scrollValueDisplay = document.getElementById('scroll-value');
    const header = document.getElementById('message'); // Change this to the correct selector for your header

    const scrollThreshold = 100; // Define how much scroll should trigger hiding or showing the card
    let lastScrollTop = 50;

    const areas = {
        'INMP': {
            image: './images/rssm.jpg',
            heading: 'Raja Shankar Shah, Tribal Freedom Fighters Museum',
            subheading: 'Jabalpur, Madhya Pradesh',
            paragraph: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },
        'INMP': {
            image: './images/rssm.jpg',
            heading: 'Raja Shankar Shah, Tribal Freedom Fighters Museum',
            subheading: 'Jabalpur, Madhya Pradesh',
            paragraph: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },

        'INJH': {
            image: './images/birsaMunda.png',
            heading: 'Birsa Munda Meuseum',
            subheading: 'Ranchi, Jharkhand',
            paragraph: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },
        'INGJ': {
            image: './images/dummy.jpg',
            heading: 'National Tribal Freedom Fighters Museum',
            subheading: 'Rajpipla, Gujarat',
            paragraph: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },
        'INCT': {
            image: './images/dummy.jpg',
            heading: 'Shaheed Veer Narayan, Freedom Fighters Museum',
            subheading: 'Raipur, Chattisgarh',
            paragraph: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },
        'INMN': {
            image: './images/dummy.jpg',
            heading: 'Heading for Area 3',
            subheading: 'Subheading for Area 3',
            paragraph: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },
        'INMN': {
            image: './images/dummy.jpg',
            heading: 'Rani Gaidinlu, Freedom Fighters Museum',
            subheading: 'Senapati, Manipur',
            paragraph: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },
        'INMZ': {
            image: './images/dummy.jpg',
            heading: 'Ropuiliani, Freedom Fighters Museum',
            subheading: 'Kelsih, Mizoram',
            paragraph: 'Detailed description for Area 3.'
        },
        'INTG': {
            image: './images/dummy.jpg',
            heading: 'Freedom Fighters Museum',
            subheading: 'Heyderabad, Telangana',
            paragraph: 'Detailed description for Area 3.'
        },
        'INAP': {
            image: './images/dummy.jpg',
            heading: 'Freedom Fighters Museum',
            subheading: 'Lammasingi, Andhra Pradesh',
            paragraph: 'Detailed description for Area 3.'
        },
        'INGA': {
            image: './images/dummy.jpg',
            heading: 'Freedom Fighters Museum',
            subheading: 'Ponda, Goa',
            paragraph: 'Detailed description for Area 3.'
        },
        'INKL': {
            image: './images/dummy.jpg',
            heading: 'Freedom Fighters Museum',
            subheading: 'Kozhikode, Kerala',
            paragraph: 'Detailed description for Area 3.'
        },
    };
    
    const showCard = (event, content) => {
        cardImage.src = content.image;
        cardHeading.textContent = content.heading;
        cardSubheading.textContent = content.subheading;
        cardParagraph.textContent = content.paragraph;

        card.style.display = 'block';
        card.style.right = '0px';

        const target = event.target;
        target.classList.add('highlighted');
    };

    const hideCard = (event) => {
        const target = event.target;
        target.classList.remove('highlighted');
    };

    Object.keys(areas).forEach(id => {
        const element = document.getElementById(id);
        element.addEventListener('mouseover', (event) => {
            showCard(event, areas[id]);
        });
        element.addEventListener('mouseout', hideCard);
    });

    // Show the default card (replace 'INMP' with the desired default area ID)
    const defaultArea = 'INMP';
    if (areas[defaultArea]) {
        showCard({ target: document.getElementById(defaultArea) }, areas[defaultArea]);
    }

    // Hide or show card based on scroll direction and position relative to the header
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const headerBottom = header.getBoundingClientRect().bottom + scrollTop;
        scrollValueDisplay.textContent = `Scroll Value: ${scrollTop}`;

        if (scrollTop > headerBottom) {
            // Scrolling past the bottom of the header
            if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
                // Scrolling down and past the threshold
                card.style.display = 'block';
            } else if (scrollTop < lastScrollTop && scrollTop > scrollThreshold) {
                // Scrolling up and past the threshold
                card.style.display = 'none';
            }
        } else {
            // Before the header's bottom, hide the card
            card.style.display = 'none';
        }

        lastScrollTop = scrollTop;
    });
});