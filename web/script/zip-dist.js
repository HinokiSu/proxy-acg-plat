import { createWriteStream } from 'fs'
import { join, dirname } from 'path'
import archiver from 'archiver'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)
// zip file storage location
const homedir = join(__dirname, '../release')

//配置要打包的路径列表,需要打包某些目录，添加到数组里面即可 相对路径
const target = ['dist']

// 默认在当前目录路径生成此文件 dist.zip
const output = createWriteStream(homedir + '/dist.zip')
const archive = archiver('zip', {
  zlib: { level: 9 } // 设置压缩级别
})

archive.on('error', function (err) {
  throw err
})

output.on('close', function () {
  console.log(`
--------- Archiver zip  ---------
[Proxy-acg-plat]: Web
Create File Size: ${(archive.pointer() / 1024).toFixed(1)}KB
File location: ${homedir}\\dist.zip
--------- Zip Completed ---------
`)
})

archive.pipe(output)
for (let i of target) {
  archive.directory(i, i)
}
archive.finalize()
