(function() {
  "use strict"

  function Character(props) {
    let character = props.character.name.toLowerCase();

    return (
      <img src={`/assets/${character}.jpg`} alt={`${props.character.name} ${props.character.lastname}`} />
    );
  }

  function Friends(props) {
    let [character, setCharacter] = React.useState(window.FriendsData.characters[0]); 

    return (
      <div>
        <Character character={character} />
      </div>
    );
  }

  ReactDOM.render(<Friends />, document.getElementById("react-root"));
})();