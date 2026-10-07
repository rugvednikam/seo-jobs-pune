const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

async function pushToGitHub() {
  console.log("Retrieving GitHub authentication token...");
  const token = execSync("gh auth token", { encoding: "utf-8" }).trim();
  const repoOwner = "rugvednikam";
  const repoName = "seo-jobs-pune";

  console.log(`Target Repository: ${repoOwner}/${repoName}`);

  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "Antigravity-Git-Pusher",
  };

  const projectRoot = path.resolve(__dirname, "..");

  // Step 0: Ensure repository is initialized by creating/updating README.md via Contents API
  console.log("Initializing repository with initial README commit...");
  const readmeContent = fs.readFileSync(path.join(projectRoot, "README.md"), "utf-8");
  
  // Check if main branch exists
  let mainSha = null;
  try {
    const refCheck = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/git/ref/heads/main`, { headers });
    if (refCheck.ok) {
      const refData = await refCheck.json();
      mainSha = refData.object.sha;
    }
  } catch {}

  if (!mainSha) {
    const initRes = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/README.md`, {
      method: "PUT",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "Initial commit",
        content: Buffer.from(readmeContent).toString("base64"),
      }),
    });
    if (!initRes.ok) {
      const err = await initRes.text();
      console.warn("Init README notice:", err);
    } else {
      const initJson = await initRes.json();
      mainSha = initJson.commit.sha;
      console.log("Initialized repository successfully.");
    }
  }

  // Get current main commit SHA if not retrieved
  if (!mainSha) {
    const refRes = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/git/ref/heads/main`, { headers });
    if (refRes.ok) {
      const refJson = await refRes.json();
      mainSha = refJson.object.sha;
    }
  }

  console.log(`Current base commit SHA: ${mainSha}`);

  const ignoredDirs = new Set(["node_modules", ".next", ".git"]);
  const ignoredFiles = new Set([".DS_Store", "package-lock.json"]);

  function getFiles(dir, baseDir = "") {
    let results = [];
    const list = fs.readdirSync(dir);
    for (const item of list) {
      if (ignoredDirs.has(item) || ignoredFiles.has(item)) continue;
      const fullPath = path.join(dir, item);
      const relPath = path.join(baseDir, item).replace(/\\/g, "/");
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        results = results.concat(getFiles(fullPath, relPath));
      } else {
        results.push({ fullPath, relPath, size: stat.size });
      }
    }
    return results;
  }

  const files = getFiles(projectRoot);
  console.log(`Found ${files.length} project files to commit.`);

  // 1. Create blobs for each file
  const treeItems = [];
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const content = fs.readFileSync(file.fullPath);
    const isBinary = file.relPath.endsWith(".ico") || file.relPath.endsWith(".png") || file.relPath.endsWith(".jpg");

    const blobPayload = {
      content: isBinary ? content.toString("base64") : content.toString("utf-8"),
      encoding: isBinary ? "base64" : "utf-8",
    };

    const blobRes = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/git/blobs`, {
      method: "POST",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify(blobPayload),
    });

    if (!blobRes.ok) {
      const err = await blobRes.text();
      throw new Error(`Failed to upload blob for ${file.relPath}: ${err}`);
    }

    const blobJson = await blobRes.json();
    treeItems.push({
      path: file.relPath,
      mode: "100644",
      type: "blob",
      sha: blobJson.sha,
    });

    process.stdout.write(`\r[${i + 1}/${files.length}] Uploaded: ${file.relPath.slice(0, 45)}...`);
  }
  console.log("\nAll blobs uploaded successfully.");

  // 2. Create Git Tree
  console.log("Creating Git tree...");
  const treeRes = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/git/trees`, {
    method: "POST",
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify({ tree: treeItems }),
  });

  if (!treeRes.ok) {
    throw new Error(`Failed to create tree: ${await treeRes.text()}`);
  }
  const treeJson = await treeRes.json();
  console.log(`Git Tree SHA: ${treeJson.sha}`);

  // 3. Create Commit
  console.log("Creating commit...");
  const commitRes = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/git/commits`, {
    method: "POST",
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify({
      message: "SEO Jobs Pune: Production-ready job discovery platform with verified Pune openings, daily ingestion, and resume matcher",
      tree: treeJson.sha,
      parents: mainSha ? [mainSha] : [],
    }),
  });

  if (!commitRes.ok) {
    throw new Error(`Failed to create commit: ${await commitRes.text()}`);
  }
  const commitJson = await commitRes.json();
  console.log(`Commit SHA: ${commitJson.sha}`);

  // 4. Update refs/heads/main
  console.log("Updating main branch reference...");
  const patchRes = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/git/refs/heads/main`, {
    method: "PATCH",
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify({
      sha: commitJson.sha,
      force: true,
    }),
  });

  if (!patchRes.ok) {
    throw new Error(`Failed to update main branch ref: ${await patchRes.text()}`);
  }

  console.log(`\n🎉 SUCCESS! Full codebase pushed to GitHub:`);
  console.log(`Repository Link: https://github.com/${repoOwner}/${repoName}`);
}

pushToGitHub().catch((err) => {
  console.error("Push failed:", err);
  process.exit(1);
});
