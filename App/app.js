var cafeList = document.querySelector('#cafe-list');
var form = document.querySelector('#add-cafe-form');

function renderCafe(doc) {
    let data = doc.data();
    let li = document.createElement('li');
    let name = document.createElement('span');
    let city = document.createElement('span');
    let cross = document.createElement('div');

    name.textContent = data.name;
    city.textContent = data.city;
    cross.textContent = 'x';

    li.appendChild(name);
    li.appendChild(city);
    li.appendChild(cross);
    cafeList.appendChild(li);
}

// get data from firestore
db.collection('cafes').get()
.then((snapshot) => {
    snapshot.docs.forEach(doc => {
        renderCafe(doc);
    });
});

// save data to firestore
form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('cafes').add({
        name: form.name.value,
        city: form.city.value
    });
    form.name.value = '';
    form.city.value = '';
});