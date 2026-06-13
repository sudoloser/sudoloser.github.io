import { Octokit } from 'octokit';
import fs from 'fs-extra';

const GITHUB_USERNAME = 'sudoloser';
const OUTPUT_DIR = './public/r';

async function main() {
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  console.log(`Fetching repositories for ${GITHUB_USERNAME}...`);

  try {
    const { data: repos } = await octokit.rest.repos.listForUser({
      username: GITHUB_USERNAME,
      type: 'public',
      per_page: 100,
      sort: 'updated',
    });

    const filtered = repos.filter(
      (repo) => repo.name !== 'sudoloser.github.io'
    );

    await fs.emptyDir(OUTPUT_DIR);

    for (const repo of filtered) {
      const dir = `${OUTPUT_DIR}/${repo.name}`;
      const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="refresh" content="0; url=${repo.html_url}">
  <title>Redirecting...</title>
</head>
<body>
  <p>Redirecting to <a href="${repo.html_url}">${repo.full_name}</a>...</p>
</body>
</html>`;

      await fs.outputFile(`${dir}/index.html`, html);
      console.log(`Created redirect: ${repo.name} -> ${repo.html_url}`);
    }

    console.log(`\nDone. Generated ${filtered.length} redirect(s).`);
  } catch (error) {
    console.error('Failed to fetch repositories:', error);
    process.exit(1);
  }
}

main();
