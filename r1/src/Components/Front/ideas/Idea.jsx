import { useState } from "react";
import { useContext } from "react";
import FrontContext from "../FrontContext";

function Idea({idea}) {

    const { setCreateDonation, donations, ideas } = useContext(FrontContext);

    const [name, setName] = useState('');
    const [donation, setDonation] = useState('0');
    // const [ideaId, setIdeaId] = useState('');

    // const donatedSum = () => donations.filter(d => (d.idea_id === idea.id)).reduce((total, item) => total + +item.donation, 0).toFixed(2)

    const handleDonate = () => {
        const data = { name, donation, idea_id: idea.id };
        setCreateDonation(data);
        setName('');
        setDonation('0');
  };

    const handleDelete = () => {
        console.log(idea.id);
        console.log(donations);
  };

    return (
        <li className="list-group-item">
            <div className="item-front">
                <div className="content">
                    <p>Idėja: {idea.idea}</p>
                    {
                        idea.photo ? <div className="photo-bin"><img src={idea.photo} alt='nice'/></div> : null
                    }
                    <p>Norima surinkti suma: <b>{idea.sum.toFixed(2)} EUR</b></p>
                    <p>Jau surinkta suma: <b>{
                    donations && ideas ? donations.filter(d => (d.idea_id === idea.id)).reduce((total, item) => total + +item.donation, 0).toFixed(2) : null
                    } EUR</b>
                    </p>
                    <p>Likusi iki tikslo suma: <b>{(idea.sum - donations.filter(d => (d.idea_id === idea.id)).reduce((total, item) => total + +item.donation, 0)).toFixed(2)} EUR</b></p>
                    <p>Lėšų surinkimo istorija: ... EUR</p>
                    <label>Aukotojo vardas</label>
                    <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)}></input>
                    <label>Aukojama suma</label>
                    <input type="number" className="form-control" value={donation} onChange={(e) => setDonation(e.target.value)}></input>
                </div>
                <div className="buttons">
                    <button type="button" className="btn btn-outline-success ml-2" onClick={handleDonate}>Paaukoti</button>
                    <button type="button" className="btn btn-outline-danger ml-2" onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </li>
    );
}

export default Idea;