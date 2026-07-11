const fs = require('fs');
const https = require('https');

const urls = {
  'login.html': 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ6Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpZCiVodG1sXzAwMDY1NjVhOTllMmY1ZGUwMjJkNWNkOTYwMzQ5ZDNmEgoSBhDIy4aMYxgBkgEjCgpwcm9qZWN0X2lkEhVCEzc0NjY0MDMzODc3MDEwMDUwMzg&filename=&opi=89354086',
  'admin-kelola.html': 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ6Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpZCiVodG1sXzAwMDY1NjVhOTk4NTE0ODYwN2M0ZjQ5OTFlMDQwMTQyEgoSBhDIy4aMYxgBkgEjCgpwcm9qZWN0X2lkEhVCEzc0NjY0MDMzODc3MDEwMDUwMzg&filename=&opi=89354086',
  'feedback-benar.html': 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ6Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpZCiVodG1sXzAwMDY1NjVhYTAyNTFmNjYwMDMwMzVlOTk5MDhmNDlhEgoSBhDIy4aMYxgBkgEjCgpwcm9qZWN0X2lkEhVCEzc0NjY0MDMzODc3MDEwMDUwMzg&filename=&opi=89354086',
  'feedback-salah.html': 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ6Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpZCiVodG1sXzAwMDY1NjVhYTBlZmJiMjIwOTI1ZDNlODVkM2NkMTZiEgoSBhDIy4aMYxgBkgEjCgpwcm9qZWN0X2lkEhVCEzc0NjY0MDMzODc3MDEwMDUwMzg&filename=&opi=89354086',
  'admin-analitik.html': 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ6Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpZCiVodG1sXzAwMDY1NjVhYTExZDljZTMwMzM4NThhYWRmMDYwNGZlEgoSBhDIy4aMYxgBkgEjCgpwcm9qZWN0X2lkEhVCEzc0NjY0MDMzODc3MDEwMDUwMzg&filename=&opi=89354086'
};

if (!fs.existsSync('stitch_screens')) fs.mkdirSync('stitch_screens');

for (const [name, url] of Object.entries(urls)) {
  https.get(url, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => fs.writeFileSync('stitch_screens/' + name, data));
  }).on('error', err => console.error(err));
}
console.log("Downloads started.");
