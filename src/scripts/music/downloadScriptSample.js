const axios = require("axios");
const fs = require("fs");
const path = require("path");

async function downloadFile(url, destination) {
  const writer = fs.createWriteStream(destination);

  const response = await axios({
    url,
    method: "GET",
    responseType: "stream",
  });

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on("finish", resolve);
    writer.on("error", reject);
  });
}

async function downloadFromGitHub(repoUrl, songs, destinationDirectory) {
  for (const song of songs) {
    const url = `${repoUrl}/${song}`;
    const destination = path.join(destinationDirectory, song);
    await downloadFile(url, destination);
    console.log(`${song} downloaded from GitHub.`);
  }
}

async function downloadFromGoogleDrive(folderUrl, songs, destinationDirectory) {
  for (const song of songs) {
    const url = `${folderUrl}`;
    const destination = path.join(destinationDirectory, song);
    await downloadFile(url, destination);
    console.log(`${song} downloaded from Google Drive.`);
  }
}

const githubRepoUrl = "https://github.com/yourusername/yourrepository";
const githubSongs = ["song1.mp3", "song2.mp3"];

const googleDriveFolderUrl =
  "https://drive.google.com/file/d/1ErGBY9xP6cMfq15icXOaNA30nnMWr2gD/view?usp=drive_link";
const driveSongs = ["song1.mp3", "song2.mp3", "song3.mp3"];

const scriptDirectory = __dirname;
const musicDirectory = path.join(scriptDirectory, "music");

// downloadFromGitHub(githubRepoUrl, githubSongs, musicDirectory)
//   .then(() => {
//     console.log("All songs downloaded from GitHub.");
//   })
//   .catch((error) => {
//     console.error("Error downloading from GitHub:", error);
//   });

downloadFromGoogleDrive(googleDriveFolderUrl, driveSongs, musicDirectory)
  .then(() => {
    console.log("All songs downloaded from Google Drive.");
  })
  .catch((error) => {
    console.error("Error downloading from Google Drive:", error);
  });
