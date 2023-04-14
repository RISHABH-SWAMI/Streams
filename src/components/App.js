import React from "react";
import { Router, Route, Switch, Routes } from "react-router-dom";
import StreamList from "./streams/StreamList";
import StreamCreate from "./streams/StreamCreate";
import StreamEdit from "./streams/StreamEdit";
import StreamDelete from "./streams/StreamDelete";
import StreamShow from "./streams/StreamShow";
// import StreamDetail from "./streams/StreamDetails";
import Header from "./Header";
import history from "../history";

const App = () => {
  return (
    <div className="ui container">
      <Router history={history}>
        <Header />
        <div>
          {/* <Route path="/" element={<StreamList />} />
          <Route path="/streams/show" element={<StreamShow />} />
          <Route path="/streams/detail" element={<StreamDetail />} />
          <Route path="/streams/new" element={<StreamCreate/>} />
          <Route path="/streams/edit" element={<StreamEdit />} />
          <Route path="/streams/delete" element={<StreamDelete />} /> */}

          <Switch>
            {/* <Route path="/streams/detail" exact component={StreamDetail} /> */}
            <Route path="/" exact component={StreamList} />
            <Route path="/streams/new" exact component={StreamCreate} />
            <Route path="/streams/edit/:id" exact component={StreamEdit} />
            <Route path="/streams/delete/:id" exact component={StreamDelete} />
            <Route path="/streams/:id" exact component={StreamShow} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
