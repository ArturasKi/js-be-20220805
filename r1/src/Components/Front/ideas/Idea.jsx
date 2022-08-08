import { useState } from "react";
import { useContext } from "react";
import FrontContext from "../FrontContext";

function Idea({idea}) {

    const { setCreateDonation, donations, ideas } = useContext(FrontContext);

    const [name, setName] = useState('');
    const [donation, setDonation] = useState('0');

    const handleDonate = () => {
        const data = { name, donation, idea_id: idea.id };
        setCreateDonation(data);
        setName('');
        setDonation('0');
  };

  let surinktaSuma;

  surinktaSuma = donations.filter(d => (d.idea_id === idea.id)).reduce((total, item) => total + +item.donation, 0).toFixed(2);

    return (
        <li className="list-group-item">
            <div className="item-front">
                <div className="content">
                    <h4>Idėja: <b>{idea.idea}</b></h4>
                    {
                        idea.photo ? <div className="photo-bin"><img src={idea.photo} alt='nice'/></div> : null
                    }
                    <p>Norima surinkti suma: <b>{idea.sum.toFixed(2)} EUR</b></p>
                    <div>Jau surinkta suma:  
                        <b>{donations && ideas ? surinktaSuma : null} EUR</b>
                        <p style={idea.sum <= surinktaSuma ? {display: 'block', color: 'green', fontWeight: 'bold'} : {display: 'none'}}>Suma surinkta!</p>
                    </div>
                    <p style={idea.sum <= surinktaSuma ? {display: 'none'} : {display: 'block'}}>Likusi iki tikslo suma: <b>{donations && ideas ? (idea.sum - surinktaSuma) : null} EUR</b></p>
                    <div style={idea.sum <= surinktaSuma ? {display: 'none'} : {display: 'block'}}>
                        <label>Aukotojo vardas</label>
                        <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)}></input>
                        <label>Aukojama suma</label>
                        <input type="number" className="form-control" value={donation} onChange={(e) => setDonation(e.target.value)}></input>
                    </div>
                </div>
                <div style={idea.sum <= surinktaSuma ? {display: 'none'} : {display: 'block'}} className="buttons">
                    <button type="button" className="btn btn-outline-success ml-2" onClick={handleDonate}>Paaukoti</button>
                </div>
                <div className="form-group">
                    <h5>Lėšų surinkimo istorija: </h5>
                    {
                        donations && ideas ? donations.map(d => (d.idea_id === idea.id) ? <div key={d.id}>
                            Aukotojas: <b>{d.name}</b>; Aukojama suma: <b>{d.donation.toFixed(2)} EUR</b>
                            </div> : null) : null
                    }
                </div>
            </div>
        </li>
    );
}

export default Idea;

// donations && ideas ? donations.filter(d => (d.idea_id === idea.id)).reduce((total, item) => total + +item.donation, 0).toFixed(2) : null