const cron = require('node-cron');
const { awardDailyGitHubReward } = require('./rewardService');

// 매일 자정에 실행 (00:00)
cron.schedule('0 0 * * *', async () => {
  console.log('🎁 자정 보상 정산 시작');
  await awardDailyGitHubReward();
});


async function awardDailyGitHubReward() {
    const connection = await pool.getConnection();
  
    try {
      const [users] = await connection.query(`
        SELECT id, github_token, github_username
        FROM users
        WHERE github_token IS NOT NULL
      `);
  
      for (const user of users) {
        const { id: userId, github_token, github_username } = user;
  
        const octokit = new Octokit({ auth: github_token });
        const today = new Date();
        const start = new Date(today.setHours(0, 0, 0, 0));
        const end = new Date(today.setHours(23, 59, 59, 999));
  
        const repos = await octokit.rest.repos.listForUser({
          username: github_username,
          type: 'owner',
          per_page: 100
        });
  
        let totalCommits = 0;
        for (const repo of repos.data) {
          const { data: commits } = await octokit.rest.repos.listCommits({
            owner: github_username,
            repo: repo.name,
            author: github_username,
            since: start.toISOString(),
            until: end.toISOString(),
            per_page: 100
          });
          totalCommits += commits.length;
        }
  
        const coins = totalCommits * 10;
        const exp = totalCommits * 5;
  
        if (coins > 0) {
          await connection.execute(
            `UPDATE users 
             SET fish_coins = fish_coins + ?, experience_points = experience_points + ?
             WHERE id = ?`,
            [coins, exp, userId]
          );
          console.log(`✅ ${github_username}에게 ${coins}코인 지급`);
        }
      }
  
    } catch (err) {
      console.error('보상 지급 에러:', err);
    } finally {
      connection.release();
    }
  }
  