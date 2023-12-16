import { GitApiIssues } from 'apis/gitApi';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const MainPage = () => {
    const [issuesData, setIssuesData] = useState([]);
    // const [isLoading, setIsLoading] = useState(false);
    const page = 1;
    const perPage = 10;
    const sort = 'created';
    const state = 'open';

    const navigate = useNavigate();

    const fetchGitApiIssues = async () => {
        try {
            // setIsLoading(false);
            const response = await GitApiIssues(page, perPage, sort, state);
            setIssuesData(response.data);
        } catch (error) {
            console.log('error', error);
            // setIsLoading(false);
        }
    };

    /* if (isLoading) {
        return <div>Loading...</div>;
    } */
    useEffect(() => {
        fetchGitApiIssues();
        console.log(issuesData);
    }, [page, perPage, sort, state]);

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
