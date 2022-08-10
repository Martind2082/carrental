import { useParams } from "react-router-dom";
import list from '../cars.json';

const Carinfo = () => {
    const {carslist} = list;
    const {id} = useParams();
    return (
        <div className="translate-y-[15vh]">
            <img src={carslist[id].image}/>
        </div>
    );
}
 
export default Carinfo;