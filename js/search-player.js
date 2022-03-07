document.getElementById('spinner').style.display = "none";
const searchPlayer = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;

    //load players
    const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayPlayers(data))
    document.getElementById('spinner').style.display = "block"
}

//display players
const displayPlayers = players => {
    const allPlayers = players.player;
    const searchResult = document.getElementById('search-result');
    allPlayers.forEach(player => {
        console.log(player)
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div onclick=loadDetail("${player.strPlayer}") class="card h-100">
             <img class="card-img-top" src="${player.strThumb}" alt="...">
             <div class="card-body">
                  <h4 class="card-title">${player.strPlayer}</h4>
                  <h6 class="card-text">${player.strNationality}</h6>
             </div>
        </div>          
        `;
        searchResult.appendChild(div);
        document.getElementById('spinner').style.display = "none";
    })
}

const loadDetail = name => {
    const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${name}`;
    fetch(url)
        .then(res => res.json())
        .then(data => console.log(data.player))
}