import "./DefaultApp.css";

import { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { bindActionCreators } from "redux";

import { useAppSelector } from "./rtk/store";
import * as defaultActions from "./stores/actions/defaultAction";
import { ReduceState } from "./stores/reducers";
import { DefaultState } from "./stores/reducers/defaultReducer";
import {
  useGetPostsQuery,
  useGetPostsWithAutoRefreshQuery,
} from "./rtk/api/services/defaultService";

interface DefaultAppProps {
  defaultSetting?: any;
  DefaultActions?: typeof defaultActions;
}

function DefaultApp({ defaultSetting, DefaultActions }: DefaultAppProps) {
  const config = useAppSelector((state) => state.config);

  const { success }: DefaultState = useSelector(
    (state: ReduceState) => state.default
  );

  /* useEffect(() => {
    //defaultSetting.func();
  }, [defaultSetting]); */

  const handleOnClick = () => {
    //DefaultActions.fetchDefault({ value: 'some value' });
  };

  return (
    <div className="App">
      {defaultSetting && (
        <div>{`defaultSetting.data: ${defaultSetting.data}`}</div>
      )}
      <button className="btn btn-success" onClick={handleOnClick}>
        call DefaultActions.fetchDefault method
      </button>
      {success && <div>Success !</div>}
      {!success && <div>NOT Success !</div>}

      <h3>App configuration initializing from index.html or server side:</h3>
      {`baseUrl: ${config.baseUrl}`}
      <br />
      {`defaultSetting: ${JSON.stringify(config.defaultSetting)}`}

      <h3>Default Service - Posts List:</h3>
      <PostList />
    </div>
  );
}

const PostList = () => {
  const { data: posts, isLoading } = useGetPostsQuery();

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (!posts) {
    return <div>No posts :(</div>;
  }

  return (
    <ul>
      {posts.map(({ id, title, author }) => (
        <li key={id}>{`Title: ${title} - Author: ${author}`}</li>
      ))}
    </ul>
  );
};

/* export default connect(
  (state: ReduceState) => ({
    defaultSetting: state.config ? state.config.data : undefined, // bind data to props
  }),
  (dispatch) => ({
    DefaultActions: bindActionCreators(defaultActions, dispatch), // bind dispatch to props
  })
)(DefaultApp); */

export default DefaultApp;
