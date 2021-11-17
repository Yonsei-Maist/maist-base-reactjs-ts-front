import './DefaultApp.css';

import {
    useGetPostsQuery,
    useGetPostsWithAutoRefreshQuery,
} from './rtk/api/services/defaultService';
import { useAppSelector } from './rtk/store';

function DefaultApp() {
    const config = useAppSelector((state) => state.config);

    return (
        <div className="App">
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
    const { data: posts, isLoading, refetch } = useGetPostsQuery();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!posts) {
        return <div>No posts :(</div>;
    }

    return (
        <>
            <ul>
                {posts.map(({ id, title, author }) => (
                    <li key={id}>{`Title: ${title} - Author: ${author}`}</li>
                ))}
            </ul>
            <button className="btn btn-success" onClick={refetch}>
                Refetch Data
            </button>
        </>
    );
};

export default DefaultApp;
