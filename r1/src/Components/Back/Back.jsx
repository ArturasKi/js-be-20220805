import { useState, useEffect } from 'react';
import axios from 'axios';
import BackContext from './BackContext';
import Nav from './Nav';
import ListIdeas from './List';

function Back({show}) {

    const [lastUpdate, setLastUpdate] = useState(Date.now());

    const [ideas, setIdeas] = useState(null);
    const [donations, setDonations] = useState(null);
    const [acceptIdea, setAcceptIdea] = useState(null);
    const [editIdea, setEditIdea] = useState(null)
    const [deleteIdea, setDeleteIdea] = useState(null);

    // READ IDEAS
    useEffect(() => {
        axios
        .get("http://localhost:3003/ideas")
        .then((res) => setIdeas(res.data));
    }, [lastUpdate]);

    // READ DONATORS
    useEffect(() => {
        axios
        .get("http://localhost:3003/donators")
        .then((res) => setDonations(res.data));
    }, [lastUpdate]);

    // DELETE IDEA
    useEffect(() => {
    if (null === deleteIdea) return;
    axios
      .delete("http://localhost:3003/ideas/" + deleteIdea.id)
      .then((res) => {
        // showMessage(res.data.msg);
        setLastUpdate(Date.now()); // irasymas, update;
      })
      .catch((error) => {
        // showMessage({ text: error.message, type: "danger" });
      });
  }, [deleteIdea]);

  // EDIT IDEA
  useEffect(() => {
    if (null === editIdea) return;
    axios
      .put("http://localhost:3003/ideas/" + editIdea.id, editIdea)
      .then((res) => {
        // showMessage(res.data.msg);
        setLastUpdate(Date.now()); // irasymas, update;
      })
      .catch((error) => {
        // showMessage({ text: error.message, type: "info" });
      });
  }, [editIdea]);

    return (
        <BackContext.Provider value={{
            ideas,
            donations,
            setDeleteIdea,
            acceptIdea,
            setAcceptIdea,
            setEditIdea
        }}>
            {
                show === 'admin' ? 
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
        </BackContext.Provider>
    )
}

export default Back;