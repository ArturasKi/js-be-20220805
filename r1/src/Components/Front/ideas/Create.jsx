import { useContext, useState, useRef } from "react";
import getBase64 from '../../../Functions/getBase64.js';
import FrontContext from "../FrontContext";

function Create() {
  const { setCreateIdea } = useContext(FrontContext);

  const [idea, setIdea] = useState("");
  const [sum, setSum] = useState("0");
  const [photoPrint, setPhotoPrint] = useState(null);
  const fileInput = useRef();

  const doPhoto = () => {
    getBase64(fileInput.current.files[0])
    .then(photo => setPhotoPrint(photo))
    .catch(_ => {
      // tylim
    });
  }

  const handleCreate = () => {
    const data = { idea, photo: photoPrint, sum };
    setCreateIdea(data);
    setIdea('');
    setSum('');
    setPhotoPrint(null);
  };

  return (
    <div className="card mt-4">
      <div className="card-header">
        <h2>Sukurti naują idėja</h2>
      </div>
      <div className="card-body">
        <div className="form-group">
          <label>Idėja</label>
          <input
            type="text"
            className="form-control"
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
          ></input>
          <small className="form-text text-muted">Įvesti idėją</small>
        </div>
        <div className="form-group">
          <label>Suma</label>
          <input
            type="number"
            className="form-control"
            value={sum}
            onChange={(e) => setSum(e.target.value)}
          ></input>
          <small className="form-text text-muted">Įvesti idėją</small>
        </div>
        <div className="form-group">
          <label>Nuotrauka</label>
          <input ref={fileInput} type="file" className="form-control" onChange={doPhoto}/>
          <small className="form-text text-muted">Įkelti nuotrauką</small>
        </div>
          {
            photoPrint ? <div className="photo-bin"><img src={photoPrint} alt='nice'/></div> : null
          }
        <button
          type="button"
          className="btn btn-outline-primary with-loader"
          onClick={handleCreate}>Pridėti</button>
      </div>
    </div>
  );
}

export default Create;