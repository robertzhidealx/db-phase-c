const fs = require('fs');
require('dotenv').config();

const token = process.env.TOKEN;

// organization();
// repository();
// downloads();
// user();
// issue();
// package();

// Organization(orgID, login, name, description, email, location, type, createdAt, updatedAt)
async function organization() {
	const orgs = [ 'facebook', 'google', 'amzn', 'angular' ];
	const db = [];
	for (const org of orgs) {
		const { id, login, name, description, email, created_at, updated_at, location, type } = await get(
			`https://api.github.com/orgs/${org}`
		);
		db.push(`${id},${login},${name},${description},${email},${created_at},${updated_at},${location},${type}`);
	}
	writeFile('files/organization.txt', db.join('\n'));
}

// Repository(repoID, name, description, url, forksCount, stargazersCount, watchersCount, openIssuesCount)
async function repository() {
	const pairs = [
		[ 'octocat', 'hello-world' ],
		[ 'Anduin2017', 'HowToCook' ],
		[ 'sveltejs', 'svelte' ],
		[ 'facebook', 'react' ],
		[ 'angular', 'angular' ],
		[ 'vuejs', 'vue' ],
		[ 'vercel', 'next.js' ],
		[ 'nuxt', 'nuxt.js' ],
		[ 'microsoft', 'Web-Dev-For-Beginners' ],
		[ 'airbnb', 'javascript' ],
		[ 'sveltejs', 'kit' ]
	];
	const db = [];
	for (const pair of pairs) {
		owner = pair[0];
		repo = pair[1];
		const {
			id,
			name,
			description,
			url,
			forks_count,
			stargazers_count,
			watchers_count,
			open_issues_count
		} = await get(`https://api.github.com/repos/${owner}/${repo}`);
		db.push(
			`${id},${name},${description},${url},${forks_count},${stargazers_count},${watchers_count},${open_issues_count}`
		);
	}
	writeFile('files/repository.txt', db.join('\n'));
}

//User(userID, login, url, type)
async function user() {
	const pairs = [
		[ 'octocat', 'hello-world' ],
		[ 'Anduin2017', 'HowToCook' ],
		[ 'sveltejs', 'svelte' ],
		[ 'facebook', 'react' ],
		[ 'angular', 'angular' ],
		[ 'vuejs', 'vue' ],
		[ 'vercel', 'next.js' ],
		[ 'nuxt', 'nuxt.js' ],
		[ 'microsoft', 'Web-Dev-For-Beginners' ],
		[ 'airbnb', 'javascript' ],
		[ 'sveltejs', 'kit' ]
	];
	const db = [];
	for (let i = 0; i < pairs.length; i++) {
		owner = pairs[i][0];
		target = await get(`https://api.github.com/users/${owner}`);
		const { id, login, url, type } = target;
		db.push(`${id},${login},${url},${type}`);
	}
	arr = await get(`https://api.github.com/users`);
	for (let i = 0; i < 30; i++) {
		const { id, login, url, type } = arr[i];
		db.push(`${id},${login},${url},${type}`);
	}
	writeFile('files/user.txt', db.join('\n'));
}

// Package (packageName, stars, version, latestUpdated, latestCreated, size, packageHtmlUrl)
async function package() {
	const pairs = [
		[ 'octocat', 'hello-world' ],
		[ 'sveltejs', 'svelte' ],
		[ 'facebook', 'react' ],
		[ 'angular', 'angular' ],
		[ 'vuejs', 'vue' ],
		[ 'vercel', 'next.js' ],
		[ 'nuxt', 'nuxt.js' ],
		[ 'airbnb', 'javascript' ],
		[ 'sveltejs', 'kit' ]
	];
	const db = [];
	for (let i = 0; i < pairs.length; i++) {
		let owner = pairs[i][1];
		const target = await get(`https://api.npms.io/v2/package/${owner}`);
		const name = target.collected.metadata.name;
		const version = target.collected.metadata.version;
		const star = target.collected.npm.starsCount;
		const score = target.score.final;
		db.push(`${name},${version},${star},${score}`);
	}
	writeFile('files/package.txt', db.join('\n'));
	//target = await get(`https://api.npms.io/v2/search?q=cross+spawn`);
	// console.log(JSON.stringify(target));
}

// Issue(issueID, repoID, title, body, state)
async function issue() {
	target = await get(`https://api.github.com/repos/octocat/hello-world/issues`);
	console.log(target[0]);
	const pairs = [
		[ 'octocat', 'hello-world' ],
		[ 'sveltejs', 'svelte' ],
		[ 'facebook', 'react' ],
		[ 'angular', 'angular' ],
		[ 'vuejs', 'vue' ],
		[ 'vercel', 'next.js' ],
		[ 'nuxt', 'nuxt.js' ],
		[ 'microsoft', 'Web-Dev-For-Beginners' ],
		[ 'airbnb', 'javascript' ],
		[ 'sveltejs', 'kit' ]
	];
	const db = [];
	for (let i = 0; i < pairs.length; i++) {
		owner = pairs[i][0];
		repo = pairs[i][1];
		target = await get(`https://api.github.com/repos/${owner}/${repo}/issues`);
		for (let j = 0; j < target.length; j++) {
			const { id, repository_url, title, body, state } = target[j];
			db.push(`${id},${repository_url},${title},${body},${state}`);
		}
	}
	writeFile('files/issue.txt', db.join('\n'));
}

// Commit(commitID, repoID, author, committer, message, commentCount, isVerified)
async function commit() {}

// CommitStats(commitID, additions, deletions, total)
async function commitStats() {}

// Downloads(packageName, startDate, endDate, downloadsCount)
async function downloads() {
	const pkgs = [ 'react', 'angular', 'vue', 'svelte', 'next', 'nuxt' ];
	const db = [];
	for (const pkg of pkgs) {
		const { package, start, end, downloads } = await get(
			`https://api.npmjs.org/downloads/point/2020-07-01:2022-01-01/${pkg}`,
			false
		);
		db.push(`${package},${start},${end},${downloads}`);
	}
	writeFile('files/downloads.txt', db.join('\n'));
}

// DownloadsOnDate(packageName, day, downloads)
async function downloadsOnDate() {}

function get(url, withAuth = true) {
	const options = {
		method: 'GET',
		headers: withAuth
			? {
					Authorization: `token ${token}`
				}
			: {}
	};
	return fetch(url, options).then((res) => res.json());
}

function writeFile(fileName, content) {
	fs.writeFile(fileName, content, (err) => {
		if (err) {
			console.error(err);
			return;
		}
	});
}
