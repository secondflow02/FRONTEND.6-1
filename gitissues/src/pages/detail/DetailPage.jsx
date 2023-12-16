import { GitApiIssuesDetail } from 'apis/gitApiDetail';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useSearchParams } from 'react-router-dom';

const DetailPage = () => {
    const [issueDetailData, setIssueDetailData] = useState();
    const [params] = useSearchParams();

    const issueData = params.get('issueNumber');

    const fetchGitApiIssues = async () => {
        try {
            // setIsLoading(false);
            if (issueData) {
                const response = await GitApiIssuesDetail(issueData);
                setIssueDetailData(response.data);
            }
        } catch (error) {
            console.log('error', error);
            // setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchGitApiIssues();
        console.log(issueDetailData);
    }, [issueData]);

    return (
        <>
            {issueDetailData && (
                <div>
                    <h1>{issueDetailData.title}</h1>
                    <p>
                        <ReactMarkdown>{issueDetailData.body}</ReactMarkdown>
                    </p>
                </div>
            )}
        </>
    );
};
export default DetailPage;
