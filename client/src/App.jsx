
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./components/main/main";
import Question from "./components/question-page/question";
import AddAnswer from "./components/add-answer/add-answer";
import Login from "./components/auth/login"
import SignUp from "./components/auth/sign-up"

import "./App.scss";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/:_id" component={Question} />
          <Route exact path="/:_id/edit" component={AddAnswer} />
          <Route exact path="/auth/login" component={Login}/>
          <Route exact path="/auth/sign-up" component={SignUp} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
