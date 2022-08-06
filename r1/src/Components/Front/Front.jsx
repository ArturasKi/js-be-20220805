import { useState, useEffect } from 'react';
import axios from 'axios';
import FrontContext from './FrontContext';
import CreateIdea from './ideas/Create';
import ListIdeas from './ideas/List';
import Nav from './Nav';
import { authConfig } from '../../Functions/auth';

function Front({show}) {

    const [lastUpdate, setLastUpdate] = useState(Date.now());

    const [ideas, setIdeas] = useState(null);
    const [donations, setDonations] = useState(null);
    const [createIdea, setCreateIdea] = useState(null);
    const [createDonation, setCreateDonation] = useState(null);

    // READ IDEAS
    useEffect(() => {
        axios
        .get("http://localhost:3003/ideas", authConfig())
        .then((res) => setIdeas(res.data));
    }, [lastUpdate]);

    // READ DONATORS
    useEffect(() => {
        axios
        .get("http://localhost:3003/donators", authConfig())
        .then((res) => setDonations(res.data));
    }, [lastUpdate]);

    // CREATE IDEAS
    useEffect(() => {
        if (null === createIdea) return;
        axios
          .post("http://localhost:3003/ideas", createIdea, authConfig())
          .then((res) => {
            // showMessage(res.data.msg);
            setLastUpdate(Date.now()); // irasymas, update;
          })
          .catch((error) => {
            // showMessage({ text: error.message, type: "success" });
          });
      }, [createIdea]);

    // CREATE DONATION
    useEffect(() => {
        if (null === createDonation) return;
        axios
          .post("http://localhost:3003/donators", createDonation, authConfig())
          .then((res) => {
            // showMessage(res.data.msg);
            setLastUpdate(Date.now()); // irasymas, update;
          })
          .catch((error) => {
            // showMessage({ text: error.message, type: "success" });
          });
      }, [createDonation]);


    return (
        <FrontContext.Provider value={{
            setCreateIdea,
            ideas,
            setCreateDonation,
            donations
        }}>
            {
                show === 'front' ? 
                    <>
                        <Nav />
                        <div className="container">
                            <div className="row">
                                <div className="col-6">
                                    <CreateIdea />
                                </div>
                            </div>
                        </div>
                    </> : 
                show === 'list' ? 
                    <>
                        <Nav />
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <ListIdeas />
                                </div>
                            </div>
                        </div>
                    </> : null
            }
        </FrontContext.Provider>
    )
}

export default Front;