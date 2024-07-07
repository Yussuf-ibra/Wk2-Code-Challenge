document.addEventListener('DOMContentLoaded', () => {
    const itemInput = document.getElementById('item-input');
    const addButton = document.getElementById('add-button');
    const clearButton = document.getElementById('clear-button');
    const shoppingList = document.getElementById('shopping-list');

    let items = JSON.parse(localStorage.getItem('shoppingList')) || [];

    function saveItems() {
        localStorage.setItem('shoppingList', JSON.stringify(items));
    }

    function addItemToList(item) {
        const listItem = document.createElement('li');
        listItem.className = item.purchased ? 'purchased' : '';

        const inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.value = item.name;
        inputField.readOnly = true;

        inputField.addEventListener('dblclick', () => {
            inputField.readOnly = false;
            inputField.focus();
        });

        inputField.addEventListener('blur', () => {
            inputField.readOnly = true;
            item.name = inputField.value;
            saveItems();
        });

        inputField.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                inputField.blur();
            }
        });

        const purchaseButton = document.createElement('button');
        purchaseButton.textContent = 'Purchased';
        purchaseButton.addEventListener('click', () => {
            item.purchased = !item.purchased;
            listItem.classList.toggle('purchased');
            saveItems();
        });

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => {
            items = items.filter(i => i !== item);
            shoppingList.removeChild(listItem);
            saveItems();
        });

        listItem.appendChild(inputField);
        listItem.appendChild(purchaseButton);
        listItem.appendChild(removeButton);
        shoppingList.appendChild(listItem);
    }

    function renderList() {
        shoppingList.innerHTML = '';
        items.forEach(addItemToList);
    }

    addButton.addEventListener('click', () => {
        const itemName = itemInput.value.trim();
        if (itemName) {
            const newItem = { name: itemName, purchased: false };
            items.push(newItem);
            addItemToList(newItem);
            saveItems();
            itemInput.value = '';
        }
    });

    clearButton.addEventListener('click', () => {
        items = [];
        renderList();
        saveItems()
    });

    renderList();
});