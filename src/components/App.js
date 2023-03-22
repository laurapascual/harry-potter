import { useEffect, useState } from 'react';
import { Routes, Route} from 'react-router-dom';
import getDataApi from '../services/api';
import '../styles/App.scss';
import CharacterList from './CharacterList';
import Filters from './Filters';
import CharacterDetail from './CharacterDetail'; 
import background from '../images/harry.jpg'


function App() {
  const [characterList, setCharacterList] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [selectHouse, setSelectHouse] = useState('Gryffindor');
  const [error, setError] = useState(false);

  useEffect(() => {
    getDataApi(`https://hp-api.onrender.com/api/characters/house/${selectHouse}`).then((cleanData) => {
      setCharacterList(cleanData);
    });
  }, [selectHouse]);

  const handleSearchName = (value) => {
    setSearchName(value);
    if(characterFiltered.length > 0 && error) {
      setError(false)
    } else if (characterFiltered.length === 0 && !error) { 
      setError(true)
    }
  };

  const handleSelectHouse = (value) => {
    setSelectHouse(value);
  };

  const handleReset = () => {
    setSearchName('');
    setSelectHouse('Gryffindor');
  }

  const characterFiltered = characterList.filter((eachCharacter) => {
    return eachCharacter.name.toLowerCase().includes(searchName.toLowerCase());
  })
  .filter((eachCharacter) => {
    return eachCharacter.house === selectHouse
  })

  return(
       <div className='background' style={{ 
      backgroundImage: `url(${background})`}}>
        <header>
          <h1 className='header'>⚡Elige tu personaje de Harry Potter🤓</h1>
        </header>
        <main className="main">
        <Routes>
          <Route path='/' 
            element={<>
              <Filters searchName={searchName} handleSearchName={handleSearchName} handleSelectHouse={handleSelectHouse} selectHouse={selectHouse} handleReset={handleReset} />
              <CharacterList characterList={characterFiltered} error={error}/></>}/>
          <Route path='/character/:characterId' 
          element={<CharacterDetail characterList={characterList} setCharacterList={setCharacterList}/>}/> 
        </Routes>
      </main>
      </div>
    )
}

export default App;
