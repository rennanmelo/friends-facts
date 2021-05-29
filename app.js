(function() {
  "use strict"

  function Character(props) {
    let character = props.character.name.toLowerCase();

    return (
      <img src={`/assets/${character}.jpg`} alt={`${props.character.name} ${props.character.lastname}`} />
    );
  }

  function CharacterSelect(props) {
    function characterOptions() {
      return props.characters.map(char => {
        return <option value={char.name} key={char.name}>{char.name}</option>
      })
    }

    function onCharacterChange(event) {
      props.handleCharacterChange(event.target.value);
    }

    return (
      <div className='field-group'>
        <label htmlFor='character-options'>Character:</label>
        <select
          defaultValue={props.character}
          name='character_options'
          id='character-options'
          onChange={onCharacterChange}
        >
          {characterOptions()}
        </select>
      </div>
    );
  }

  function Friends(props) {
    let [character, setCharacter] = React.useState(window.FriendsData.characters[0]);
    let [characters, setCharacters] = React.useState(window.FriendsData.characters);

    function handleCharacterChange(selectedCharacter) {
      let availableCharacters = window.FriendsData.characters;
      let newSelectedCharacter = availableCharacters.find(char => {
        return char.name === selectedCharacter;
      });

      setCharacter(newSelectedCharacter);
    }

    return (
      <div>
        <Character character={character} />
        <CharacterSelect 
          characters={characters}
          character={character}
          handleCharacterChange={handleCharacterChange}
        />
      </div>
    );
  }

  ReactDOM.render(<Friends />, document.getElementById("react-root"));
})();