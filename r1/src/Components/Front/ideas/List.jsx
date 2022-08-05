import { useContext } from "react";
import Idea from "./Idea";
import FrontContext from "../FrontContext";


function List() {

    const {ideas} = useContext(FrontContext);

    return (
        <div className="card mt-4">
            <div className="card-header">
              <h2>Idėjų sarašas</h2>
            </div>
            <div className="card-body">
                <ul className="list-group">
                    {
                    ideas ? ideas.map(idea => <Idea key={idea.id} idea={idea}></Idea>) : null
                    }
                </ul>
            </div>
          </div>
    )
}

export default List;