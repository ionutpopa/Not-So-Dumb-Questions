
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./components/main/main";
import CreateQuestion from "./components/create-question/create-question";
import AddAnswer from "./components/add-answer/add-answer";

import "./App.scss";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/questions/new" component={CreateQuestion} />
          <Route exact path="/questions/:_id/edit" component={AddAnswer} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
