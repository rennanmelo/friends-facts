(function() {
  "use strict"

  function Character(props) {
    let character = props.character.name.toLowerCase();

    return (
      <img 
        src={`/assets/${character}.jpg`}
        alt={`${props.character.name} ${props.character.lastname}`} 
        className='friends-app__character-image'
      />
    );
  }

  function Filter(props) {
    return (
      <form className='friends-app__filters'>
        <CharacterSelect 
          characters={props.characters}
          character={props.character}
          handleCharacterChange={props.handleCharacterChange}
        />
        <SeasonSelect
          season={props.season}
          seasons={props.seasons}
          handleSeasonChange={props.handleSeasonChange}
        />
      </form>
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
      <fieldset className='friends-app__field-group'>
        <label htmlFor='character-options'>Character:</label>
        <select
          defaultValue={props.character}
          name='character_options'
          id='character-options'
          onChange={onCharacterChange}
        >
          {characterOptions()}
        </select>
      </fieldset>
    );
  }

  function SeasonSelect(props) {
    function seasonOptions() {
      return props.seasons.map(season => {
        return <option value={season} key={season}>{season}</option>
      });
    }

    function onSeasonChange(event) {
      props.handleSeasonChange(event.target.value);
    }

    return (
      <fieldset className='friends-app__field-group'>
        <label htmlFor='season-options'>Season:</label>
        <select
          defaultValue={props.season}
          name='season_options'
          id='season-options'
          onChange={onSeasonChange}
        >
          {seasonOptions()}
        </select>
      </fieldset>
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
      <div className='friends-app'>
        <Character character={character} />
        <Filter
          characters={characters}
          character={character}
          season={season}
          seasons={seasons}
          handleCharacterChange={handleCharacterChange}
          handleSeasonChange={handleSeasonChange}
        />
      </div>
    );
  }

  ReactDOM.render(<Friends />, document.getElementById("react-root"));
})();