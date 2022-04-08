const fs = require('fs');

// Organization(orgID, login, name, description, email, location, type, createdAt, updatedAt)
async function organization() {
	const orgs = [ 'facebook', 'google', 'amzn' ];
	for (const org of orgs) {
		const data = await get(`https://api.github.com/orgs/${org}`);
		console.log(data);
	}
	writeFile('organization.txt', JSON.stringify(orgs));
}

// Repository(repoID, name, description, url, forksCount, stargazersCount, watchersCount, openIssuesCount)
async function repository() {}

//User(userID, login, url, type)
async function user() {}

// Package (packageName, stars, version, latestUpdated, latestCreated, size, packageHtmlUrl)
async function package() {}

// Commit(commitID, repoID, author, committer, message, commentCount, isVerified)
async function commit() {}

// CommitStats(commitID, additions, deletions, total)
async function commitStats() {}

// Issue(issueID, repoID, title, body, state)
async function issue() {}

// Downloads(packageName, startDate, endDate, downloadsCount)
async function downloads() {}

// DownloadsOnDate(packageName, day, downloads)
async function downloadsOnDate() {}

function get(url) {
	const options = {
		method: 'GET'
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

organization();
