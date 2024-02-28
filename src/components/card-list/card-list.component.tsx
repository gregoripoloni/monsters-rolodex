import { Monster } from '../../App';

import { Card } from '../card/card.component';
import './card-list.styles.css';

type CardListProps = {
	monsters: Monster[]
}

export const CardList = (props: CardListProps) => (
	<div className='card-list'>
		{props.monsters.map(monster => (
			<Card key={monster.id} monster={monster}/>
		))}
	</div>
)