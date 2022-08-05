// import { useState } from "react";
import { useContext, useState, useEffect } from "react";
import BackContext from "./BackContext";

function Idea({idea}) {

    const { setDeleteIdea, acceptIdea, setEditIdea, setAcceptIdea } = useContext(BackContext);

    const [ideaVerify, setIdeaVerify] = useState(0);

    useEffect(() => {
        if (null === acceptIdea) {
          return;
        }
        console.log(acceptIdea);
        setIdeaVerify(acceptIdea.verify);
    }, [acceptIdea, ideaVerify]);

//     const handleAccept = () => {
//         setIdeaVerify(ideaVerify ? '1' : '0')
//         console.log(idea.verify)
//   };

  const handleAccept = () => {
    const data = {
        id: idea.id,
        verify: idea.verify === 0 ? 1 : 0
  };
  console.log(data);
  setEditIdea(data);
  setAcceptIdea(null);
}

    const handleDelete = () => {
        setDeleteIdea(idea);
        // console.log(idea)
  };

    return (
        <li className="list-group-item">
            <div className="item-front">
                <div className="content">
                    <h4>Idėja: <b>{idea.idea}</b></h4>
                    {
                        idea.photo ? <div className="photo-bin"><img src={idea.photo} alt='nice'/></div> : null
                    }
                    <p>Norima surinkti suma: <b>{idea.sum.toFixed(2)} EUR</b></p>
                    <p>Idėjos būsena: {idea.verify ? <b style={{color: 'green'}}>Patvirtinta</b> : <b style={{color: 'red'}}>Nepatvirtinta</b>}</p>
                    {/* <p>Jau surinkta suma: <b>{
                    donations && ideas ? donations.filter(d => (d.idea_id === idea.id)).reduce((total, item) => total + +item.donation, 0).toFixed(2) : null
                    } EUR</b>
                    </p>
                    <p>Likusi iki tikslo suma: <b>{donations && ideas ? (idea.sum - donations.filter(d => (d.idea_id === idea.id)).reduce((total, item) => total + +item.donation, 0)).toFixed(2) : null} EUR</b></p>
                </div>
                <div className="form-group">
                    <h5>Lėšų surinkimo istorija: </h5>
                    {
                        donations && ideas ? donations.map(d => (d.idea_id === idea.id) ? <div key={d.id}>
                            Aukotojas: <b>{d.name}</b>; Aukojama suma: <b>{d.donation.toFixed(2)} EUR</b>
                            </div> : null) : null
                    } */}
                </div>
                <div className="buttons">
                    <button type="button" className="btn btn-outline-success ml-2" onClick={handleAccept}>Patvirtinti</button>
                    <button type="button" className="btn btn-outline-danger ml-2" onClick={handleDelete}>Ištrinti</button>
                </div>
            </div>
        </li>
    );
}

export default Idea;