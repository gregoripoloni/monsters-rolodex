import { useState, useEffect, ChangeEvent } from 'react';

import { CardList } from './components/card-list/card-list.component';
import { SearchBox } from './components/search-box/search-box.component';
import './App.css';

import { getData } from './utils/data.utils';

export type Monster = {
	id: string
	name: string
	email: string
}

const App = () => {
	const [searchField, setSearchField] = useState('');
	const [monsters, setMonsters] = useState<Monster[]>([]);
	const [filteredMonsters, setFilterMonsters] = useState(monsters);

	useEffect(() => {
		const fetchUsers = async () => {
			const users = await getData<Monster[]>('https://jsonplaceholder.typicode.com/users')
			setMonsters(users)
		}

		fetchUsers()
	}, []);

	useEffect(() => {
		const newfilteredMonsters = monsters.filter(monster => 
			monster.name.toLowerCase().includes(searchField.toLowerCase())	
		);

		setFilterMonsters(newfilteredMonsters);
	}, [monsters, searchField]);

	const onSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
		const searchFieldString = event.target.value.toLowerCase();
		setSearchField(searchFieldString);
	};

	return (
		<div className='App'>
			<h1>Monsters Rolodex</h1>
			<SearchBox placeholder='search monsters' handleChange={onSearchChange}/>
			<CardList monsters={filteredMonsters}/>
		</div>
	);
}

export default App;
