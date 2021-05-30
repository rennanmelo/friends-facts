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

  function SeasonSelect(props) {
    function seasonOptions() {
      return props.seasons.map(season => {
        return <option value={season} key={season}>{season}</option>
      })
    }

    function onSeasonChange(event) {
      props.handleSeasonChange(event.target.value);
    }

    return (
      <div className='field-group'>
        <label htmlFor='season-options'>Season:</label>
        <select
          defaultValue={props.season}
          name='season_options'
          id='season-options'
          onChange={onSeasonChange}
        >
          {seasonOptions()}
        </select>
      </div>
    );
  }

  function Friends(props) {
    let myData = window.FriendsData;
    let [character, setCharacter] = React.useState(myData.characters[0]);
    let [characters, setCharacters] = React.useState(myData.characters);
    let [season, setSeason] = React.useState(myData.seasons[0]);
    let [seasons, setSeasons] = React.useState(myData.seasons);

    function handleCharacterChange(selectedCharacter) {
      let availableCharacters = myData.characters;
      let newSelectedCharacter = availableCharacters.find(character => {
        return character.name === selectedCharacter;
      });
      let availableSeasons = myData.byCharacter[selectedCharacter];

      setCharacter(newSelectedCharacter);
      setSeasons(availableSeasons);
    }

    function handleSeasonChange(selectedSeason) {
      let availableCharactersNames = myData.bySeason[selectedSeason];
      let availableCharacters = availableCharactersNames.map(charName => {
        return myData.characters.find(character => {
          return character.name === charName;
        })
      });
      
      setSeason(selectedSeason);
      setCharacters(availableCharacters);      
    }

    return (
      <div>
        <Character character={character} />
        <CharacterSelect 
          characters={characters}
          character={character}
          handleCharacterChange={handleCharacterChange}
        />
        <SeasonSelect 
          season={season}
          seasons={seasons}
          handleSeasonChange={handleSeasonChange}
        />
      </div>
    );
  }

  ReactDOM.render(<Friends />, document.getElementById("react-root"));
})();