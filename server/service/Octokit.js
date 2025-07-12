// // Octokit.js
// // https://github.com/octokit/core.js#readme
// import dotenv from 'dotenv'
// require('dotenv').config({ path: '../.env' })
// import { Octokit } from "octokit"
//
//
// const octokit = new Octokit({
//     auth: process.env.OCTOKIT_TOKEN
// })
//
// // await octokit.request('GET /orgs/{org}/repos', {
// //     org: 'ORG',
// //     headers: {
// //         'X-GitHub-Api-Version': '2022-11-28'
// //     }
// // })
// const response = await octokit.request('GET /users/{username}/repos', {
//     username: 'combe4259',
//     headers: {
//         'X-GitHub-Api-Version': '2022-11-28'
//     }
// });
//
// console.log(response.data);
