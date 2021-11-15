import "./DefaultApp.css";
import { connect, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import * as defaultActions from "./stores/actions/defaultAction";

import { useEffect, useState } from "react";
import { ReduceState } from "./stores/reducers";
import { DefaultState } from "./stores/reducers/defaultReducer";

interface DefaultAppProps {
  defaultSetting?: any;
  DefaultActions: typeof defaultActions;
}

function DefaultApp({ defaultSetting, DefaultActions }: DefaultAppProps) {
  const { success }: DefaultState = useSelector(
    (state: ReduceState) => state.default
  );

  useEffect(() => {
    //DefaultActions.fetchDefault({value: "some value"});
  });

  return (
    <div className="App">
      <button
        className="btn btn-success"
        onClick={() => {
          defaultSetting.func();
        }}
      >
        call defaultSetting func
      </button>
      {defaultSetting && <div>{defaultSetting.data}</div>}
      {success && <div>Success !</div>}
    </div>
  );
}

export default connect(
  (state: ReduceState) => ({
    defaultSetting: state.config ? state.config.data : undefined, // bind data to props
  }),
  (dispatch) => ({
    DefaultActions: bindActionCreators(defaultActions, dispatch), // bind dispatch to props
  })
)(DefaultApp);
