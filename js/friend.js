const loadFriends = () => {
    fetch('https://randomuser.me/api/?results=5')
        .then(res => res.json())
        .then(data => displayFriends(data))
}
loadFriends();
const displayFriends = data => {
    const friends = data.results;
    const friendContainer = document.getElementById('friends')
    for (const friend of friends) {
        const image = document.createElement('img');
        const p = document.createElement('p');
        image.setAttribute('src', friend.picture.large);
        image.setAttribute('title', friend.email);
        p.innerText = `Name: ${friend.name.title} ${friend.name.first} ${friend.name.last}`;
        friendContainer.appendChild(image);
        friendContainer.appendChild(p);
    }
}