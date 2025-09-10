document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.querySelector('.grid-container');
    const cartItemsList = document.getElementById('cart-items');
    const totalPriceEl = document.getElementById('total-price');
    const clearCartBtn = document.getElementById('clear-cart-btn');
    
    let cart = [];

    const booths = [
        { id: 'A1', price: 100, status: 'available' }, { id: 'A2', price: 100, status: 'available' }, { id: 'A3', price: 100, status: 'booked' }, { id: 'A4', price: 100, status: 'available' },
        { id: 'B1', price: 120, status: 'available' }, { id: 'B2', price: 120, status: 'booked' },    { id: 'B3', price: 120, status: 'available' }, { id: 'B4', price: 120, status: 'available' },
        { id: 'C1', price: 150, status: 'available' }, { id: 'C2', price: 150, status: 'available' }, { id: 'C3', price: 150, status: 'available' }, { id: 'C4', price: 150, status: 'booked' },
        { id: 'D1', price: 150, status: 'available' }, { id: 'D2', price: 150, status: 'available' }, { id: 'D3', price: 150, status: 'available' }, { id: 'D4', price: 150, status: 'available' },
        { id: 'E1', price: 100, status: 'available' }, { id: 'E2', price: 100, status: 'available' }, { id: 'E3', price: 100, status: 'booked' }, { id: 'E4', price: 100, status: 'available' },
        { id: 'F1', price: 120, status: 'available' }, { id: 'F2', price: 120, status: 'booked' },    { id: 'F3', price: 120, status: 'available' }, { id: 'F4', price: 120, status: 'available' },
        { id: 'G1', price: 150, status: 'available' }, { id: 'G2', price: 150, status: 'available' }, { id: 'G3', price: 150, status: 'available' }, { id: 'G4', price: 150, status: 'booked' },
        { id: 'H1', price: 150, status: 'booked' }, { id: 'H2', price: 150, status: 'available' }, { id: 'H3', price: 150, status: 'available' }, { id: 'H4', price: 150, status: 'available' },
        { id: 'I1', price: 110, status: 'available' }, { id: 'I2', price: 150, status: 'available' }, { id: 'I3', price: 150, status: 'booked' }, { id: 'I4', price: 150, status: 'available' },
        { id: 'J1', price: 120, status: 'booked' }, { id: 'J2', price: 150, status: 'available' }, { id: 'J3', price: 150, status: 'available' }, { id: 'J4', price: 150, status: 'available' },
    ];

    let focusableBooths = [];

    function createBoothGrid() {
        booths.forEach(boothData => {
            const booth = document.createElement('article');
            booth.className = 'booth';
            booth.dataset.boothId = boothData.id;
            booth.dataset.price = boothData.price;
            booth.dataset.status = boothData.status;
            booth.setAttribute('aria-label', `Booth ${boothData.id}, Price: KD ${boothData.price.toFixed(3)}`);

            const boothLabel = document.createElement('span');
            boothLabel.textContent = boothData.id;
            booth.appendChild(boothLabel);

            if (boothData.status === 'booked') {
                booth.classList.add('booked');
                booth.setAttribute('aria-disabled', 'true');
                const hoverContent = document.createElement('div');
                hoverContent.className = 'hover-content';
                const bookedText = document.createElement('p');
                bookedText.textContent = 'Booked';
                hoverContent.appendChild(bookedText);
                booth.appendChild(hoverContent);
            } else {
                const hoverContent = document.createElement('div');
                hoverContent.className = 'hover-content';
                
                const priceText = document.createElement('p');
                priceText.textContent = `KD ${boothData.price.toFixed(3)}`;
                
                const addButton = document.createElement('button');
                addButton.className = 'add-btn';
                addButton.textContent = 'Add Booth';
                addButton.addEventListener('click', (e) => handleBoothAction(e, boothData));
                hoverContent.appendChild(priceText);
                hoverContent.appendChild(addButton);
                booth.appendChild(hoverContent);
 
                booth.setAttribute('tabindex', '0');
                booth.addEventListener('keydown', (e) => {
                    if ((e.key === 'Enter' || e.key === ' ') && e.target === booth) {
                        e.preventDefault();
                        handleBoothAction(e, boothData);
                        return;
                    }

                    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                        e.preventDefault();
                        handleArrowNavigation(e.key, booth);
                    }
                });
            }

            gridContainer.appendChild(booth);
        });

        focusableBooths = Array.from(document.querySelectorAll('.booth[tabindex="0"]'));
    }

    function getGridColumnCount() {
        const gridStyles = window.getComputedStyle(gridContainer);
        const gridTemplateColumns = gridStyles.getPropertyValue('grid-template-columns');
        return gridTemplateColumns.split(' ').length;
    }

    function handleArrowNavigation(key, currentBooth) {
        const currentIndex = focusableBooths.indexOf(currentBooth);
        if (currentIndex === -1) return;

        const numColumns = getGridColumnCount();
        let nextIndex = -1;

        if (key === 'ArrowLeft') {
            nextIndex = currentIndex > 0 ? currentIndex - 1 : focusableBooths.length - 1;
        } else if (key === 'ArrowRight') {
            nextIndex = currentIndex < focusableBooths.length - 1 ? currentIndex + 1 : 0;
        } else if (key === 'ArrowUp') {
            nextIndex = currentIndex - numColumns >= 0 ? currentIndex - numColumns : -1;
        } else if (key === 'ArrowDown') {
            nextIndex = currentIndex + numColumns < focusableBooths.length ? currentIndex + numColumns : -1;
        }

        if (nextIndex !== -1 && focusableBooths[nextIndex]) {
            focusableBooths[nextIndex].focus();
        }
    }

    /**
     * @param {Event} e
     * @param {object} boothData 
     */
    function handleBoothAction(e, boothData) {
        e.stopPropagation();
        const isInCart = cart.some(item => item.id === boothData.id);
        if (isInCart) {
            removeBoothFromCart(boothData.id);
        } else {
            addBoothToCart(boothData);
        }

        e.target.blur();

    }

    /**
     * @param {object} boothData
     */
    function addBoothToCart(boothData) {
        if (cart.some(item => item.id === boothData.id)) {
            alert('This booth is already in your cart.');
            return;
        }
        cart.push(boothData);
        updateCart();

        const boothEl = document.querySelector(`[data-booth-id="${boothData.id}"]`);
        if (boothEl) {
            boothEl.classList.add('selected');
            const button = boothEl.querySelector('.add-btn');
            if (button) {
                button.textContent = 'Cancel';
                button.classList.add('cancel-mode');
            }
        }
    }

    /**
     * @param {string} boothId
     */
    function removeBoothFromCart(boothId) {

        if (!confirm(`Are you sure you want to remove booth ${boothId} from your cart?`)) {
            return;
        }

        const index = cart.findIndex(item => item.id === boothId);
        if (index > -1) {
            cart.splice(index, 1);
            updateCart();

            const boothEl = document.querySelector(`[data-booth-id="${boothId}"]`);
            if (boothEl) {
                boothEl.classList.remove('selected');
                const button = boothEl.querySelector('.add-btn');
                if (button) {
                    button.textContent = 'Add Booth';
                    button.classList.remove('cancel-mode');
                }
            }
        }
    }


    function clearCart() {
        if (cart.length === 0) return; 

        if (!confirm('Are you sure you want to clear the entire cart?')) {
            return;
        }

        cart.forEach(item => {
            const boothEl = document.querySelector(`[data-booth-id="${item.id}"]`);
            if (boothEl) {
                boothEl.classList.remove('selected');
                const button = boothEl.querySelector('.add-btn');
                if (button) {
                    button.textContent = 'Add Booth';
                    button.classList.remove('cancel-mode');
                }
            }
        });

        cart = [];
        updateCart();
    }


    function updateCart() {
        cartItemsList.innerHTML = '';
        let totalPrice = 0;

        cart.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${item.id} - KD ${item.price.toFixed(3)}</span>
                <button class="remove-btn" style="background:var(--danger-color);color:white;cursor:pointer">&times;</button>
            `;
            li.querySelector('.remove-btn').addEventListener('click', () => removeBoothFromCart(item.id));
            cartItemsList.appendChild(li);
            totalPrice += item.price;
        });
        
        totalPriceEl.textContent = totalPrice.toFixed(3);

        if (cart.length > 0) {
            clearCartBtn.classList.remove('hidden');
        } else {
            clearCartBtn.classList.add('hidden');
        }
    }

    clearCartBtn.addEventListener('click', clearCart);

    createBoothGrid();
    updateCart(); 
});