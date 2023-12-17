import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchGitApi } from 'store/issuesSlice';
import styled from 'styled-components';

const MainPage = () => {
    const dispatch = useDispatch();
    // state
    const {
        issueList: issuesData,
        isLoading,
        error,
    } = useSelector(state => state.issues);
    const navigate = useNavigate();

    // const [issuesData, setIssuesData] = useState([]);
    // const page = 1;
    // const perPage = 10;
    // const sort = 'created';
    // const state = 'open';

    useEffect(() => {
        dispatch(
            fetchGitApi({
                page: 1,
                perPage: 10,
                sort: 'created',
                state: 'open',
            }),
        );
    }, [dispatch]);

    if (isLoading) {
        return <div>2조 조장 바보</div>;
    }

    if (error) {
        return <div>error</div>;
    }

    // const fetchGitApiIssues = async () => {
    //     try {
    //         const response = await GitApiIssues(page, perPage, sort, state);
    //         setIssuesData(response.data);
    //     } catch (error) {
    //         console.log('error', error);
    //     }
    // };
    // useEffect(() => {
    //     fetchGitApiIssues();
    //     console.log(issuesData);
    // }, [page, perPage, sort, state]);

    const handleIssuesDetail = issueNumber => {
        const query = `?issueNumber=${issueNumber}`;
        navigate(`/issues/${issueNumber}${query}`);
    };

    return (
        <>
            <Style.Wrapper>
                {issuesData.map(issue => (
                    <Style.Container
                        key={issue.id}
                        onClick={() => handleIssuesDetail(issue.number)}
                    >
                        {/* 제목, 내용, 댓글수, 생성일,작성자,  */}
                        <Style.H1>{issue.title}</Style.H1>
                        <Style.P>{issue.user.login}</Style.P>
                        <Style.TextContainer>
                            <Style.B>
                                <ReactMarkdown>{issue.body}</ReactMarkdown>
                            </Style.B>
                        </Style.TextContainer>
                        <p>{issue.comments}</p>
                        <p>{issue.created_at}</p>
                    </Style.Container>
                ))}
            </Style.Wrapper>
        </>
    );
};
export default MainPage;
const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;
const Container = styled.div`
    width: 60%;
    height: 100%;
    margin: 20px 0;
    box-shadow: 2px 2px 2px 2px #ccc;
    border-radius: 16px;
    &:hover {
        cursor: pointer;
    }
`;

const H1 = styled.h1`
    font-size: 30px;
`;
const P = styled.p``;

const B = styled.b``;
const TextContainer = styled.div`
    width: 80%;
    height: 50px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;
const Style = {
    Wrapper,
    Container,
    H1,
    P,
    B,
    TextContainer,
};
