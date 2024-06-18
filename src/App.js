import "./App.css";
import { useNavigate } from "react-router-dom";
import xvg from "./images/party-cup.png"

function App() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <div class="px-4 py-5 my-5 text-center">
      <img class="d-block mx-auto mb-4" src={xvg} alt="" width="120" height="120" />
        <h1 class="display-5 fw-bold">Baby Shower Function</h1>
        <div class="col-lg-6 mx-auto">
          <p class="lead mb-4">Welcome to Hilda's baby shower party, carry along gifts and suprises. Enjoy and have fun.</p>
          <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <button type="button" style={{color:"#c5c5c5"}} class="btn btn-light btn-lg px-4 gap-3 shadow" onClick={() => navigate("create")}>Proceed to Attendance</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
