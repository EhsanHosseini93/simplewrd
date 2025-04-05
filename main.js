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
        bookCard.innerHTML = `
            <img src="${book.image}" alt="${book.title}" loading="lazy">
            <h3>${book.title}</h3>
            <p class="author">by ${book.author}</p>
            ${book.translator ? `<p class="translator">Translated by ${book.translator}</p>` : ''}
            <div class="descriptions">
                <p class="description-en">${book.description}</p>
                <p class="description-fa" dir="rtl">${book.descriptionFa}</p>
            </div>
            <p class="price">$${book.price}</p>
            <button onclick="alert('Added to cart!')">Add to Cart</button>
        `;
        bookGrid.appendChild(bookCard);
    });
}

function initializeContactForm() {
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Message sent! We will get back to you soon.');
        form.reset();
    });
}