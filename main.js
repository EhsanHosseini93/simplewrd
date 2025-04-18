import { config } from 'config';

document.addEventListener('DOMContentLoaded', () => {
    const bookGrid = document.getElementById('bookGrid');
    if (bookGrid) {
        initializeFeaturedBooks();
    }
    
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        initializeContactForm();
    }
});

function initializeFeaturedBooks() {
    const bookGrid = document.getElementById('bookGrid');
    
    config.featuredBooks.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        
        const paymentButton = book.paymentLink ? `
            <div class="payment-container">
                <div class="payment-button-wrapper">
                    <a target="_blank" 
                       id="embedded-checkout-modal-checkout-button"
                       data-url="${book.paymentLink}"
                       href="${book.paymentLink}?src=embed" 
                       class="payment-button">
                        Pay now
                    </a>
                </div>
            </div>
        ` : `<button onclick="alert('Added to cart!')">Add to Cart</button>`;

        bookCard.innerHTML = `
            <img src="${book.image}" alt="${book.title}" loading="lazy">
            <h3>${book.title}</h3>
            <p class="author">by ${book.author}</p>
            ${book.translator ? `<p class="translator">Translated by ${book.translator}</p>` : ''}
            <div class="descriptions">
                <p class="description-en">${book.description}</p>
                <p class="description-fa" dir="rtl">${book.descriptionFa}</p>
            </div>
            <p class="price">£${book.price}</p>
            ${paymentButton}
        `;
        bookGrid.appendChild(bookCard);

        if (book.paymentLink) {
            const paymentBtn = bookCard.querySelector('#embedded-checkout-modal-checkout-button');
            paymentBtn.addEventListener('click', showCheckoutWindow);
        }
    });
}

function showCheckoutWindow(e) {
    e.preventDefault();

    const url = e.target.getAttribute('data-url');
    const title = 'Square Payment Links';
    const topWindow = window.top ? window.top : window;

    const dualScreenLeft = topWindow.screenLeft !== undefined ? topWindow.screenLeft : topWindow.screenX;
    const dualScreenTop = topWindow.screenTop !== undefined ? topWindow.screenTop : topWindow.screenY;

    const width = topWindow.innerWidth || document.documentElement.clientWidth || screen.width;
    const height = topWindow.innerHeight || document.documentElement.clientHeight || screen.height;

    const h = height * .75;
    const w = 500;

    const systemZoom = width / topWindow.screen.availWidth;
    const left = (width - w) / 2 / systemZoom + dualScreenLeft;
    const top = (height - h) / 2 / systemZoom + dualScreenTop;
    
    const newWindow = window.open(url, title, 
        `scrollbars=yes, width=${w / systemZoom}, height=${h / systemZoom}, top=${top}, left=${left}`
    );

    if (window.focus) newWindow.focus();
}

function initializeContactForm() {
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Message sent! We will get back to you soon.');
        form.reset();
    });
}