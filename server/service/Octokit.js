const dotenv = require('dotenv');
dotenv.config({ path: '../../.env' });

const { Octokit } = require('octokit');

console.log('Token:', process.env.OCTOKIT_TOKEN ? '토큰 확인 성공' : '토큰 확인 실패');

const octokit = new Octokit({
    auth: process.env.OCTOKIT_TOKEN
});

(async () => {
    try {
        const response = await octokit.request('GET /repos/{owner}/{repo}/commits', {
            owner: 'combe4259',
            repo: 'account_book',
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        });

        console.log('=== 중요한 필드들 ===');
        response.data.forEach((commit, index) => {
            console.log(`--- 커밋 ${index + 1} ---`);
            console.log('SHA:', commit.sha);
            console.log('메시지:', commit.commit.message);
            console.log('작성자:', commit.commit.author.name);
            console.log('날짜:', commit.commit.author.date);
            console.log('URL:', commit.html_url);
            console.log('');
        });

    } catch (error) {
        console.error('Error:', error.message);
    }
})();
