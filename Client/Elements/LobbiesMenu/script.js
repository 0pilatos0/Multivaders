let lobbies = window.lobbies

lobbies.map(lobby => {
    window.HTMLLoader.Load("Elements/LobbiesMenu/Lobby.html").then(html => {
        html = html.replace(`{{name}}`, `Lobby ${lobby.id}`)
        html = html.replace(`{{type}}`, `Mode: ${lobby.type}`)
        html = html.replace(`{{players}}`, `Players: ${lobby.players}/${lobby.maxPlayers}`)
        lobbiesDisplay.insertAdjacentHTML('beforeend', html)
        let buttons = document.querySelectorAll('button')
        buttons[buttons.length - 1].onclick = () => {
            window.client.emit('join', lobby.id)
        }
    })
})