import { useContext } from "react";
import Idea from "./Idea";
import FrontContext from "../FrontContext";


function List() {

    const {ideas} = useContext(FrontContext);

    // function order(a, b) {
    //     return a < b ? -1 : (a > b ? 1 : 0);
    // }

    return (
        <div className="card mt-4">
            <div className="card-header">
              <h2>Idėjų sarašas</h2>
            </div>
            <div className="card-body">
                <ul className="list-group">
                    {
                        ideas ? ideas.map(idea => idea.verify === 1 ? <Idea key={idea.id} idea={idea}></Idea> : null) : null
                    }
                </ul>
            </div>
          </div>
    )
}

export default List;




// {
//     ideas ? ideas.map((idea => (idea.verify === 1) ? (<Idea key={idea.id} idea={idea}></Idea>) : null).sort((a, b) => b.sum - a.sum)) : null
//     }