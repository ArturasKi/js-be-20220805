import { useContext } from "react";
import FrontContext from "../FrontContext";

function Idea({idea}) {

    const { a } = useContext(FrontContext);

    // kai paspaudžiamas mygtukas, pasileidžia f-ja handleDelete, kuri paset'iną 'line' (id, title);
    // po paspaudimo setDeleteSav pakeis deleteSav state'ą, kurio pasikeitimą stebės useEffect;
    const handleDelete = () => {
        // setDeleteSav(idea);
    }
    
    const handleEdit = () => {
        // setModalSav(idea);
    }

    return (
        <li className="list-group-item">
            <div className="item">
                <div className="content">
                    <b>{idea.idea}</b>
                    <b>{idea.sum}</b>
                    {
                        idea.photo ? <div className="photo-bin"><img src={idea.photo} alt='nice'/></div> : null
                    }
                </div>
                <div className="buttons">
                    <button type="button" className="btn btn-outline-success ml-2" onClick={handleEdit}>Edit</button>
                    <button type="button" className="btn btn-outline-danger ml-2" onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </li>
    );
}

export default Idea;