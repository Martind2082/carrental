import {useParams} from 'react-router-dom';
import list from '../cars.json';

const Carsinfo = ({sort}) => {
    const {carslist} = list;
    const {name} = useParams();
    const array = carslist.filter(val => val.name.split(' ')[0].toLowerCase() === name);
    return (
        <div>{array.map(val => <div>{val.name}</div>)}</div>
    );
}
 
export default Carsinfo;