import sharp from "sharp";
import fs from "fs";
import path from "path";

const dir = "c:/Projects/react-projects/fys-website-revamp/public/images";

async function compressDir(currentDir) {
  const files = fs.readdirSync(currentDir);

  for (const file of files) {
    const fullPath = path.join(currentDir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      await compressDir(fullPath);
      continue;
    }

    const ext = path.extname(file).toLowerCase();
    if (ext === ".png" || ext === ".jpg" || ext === ".jpeg") {
      if (stat.size > 500 * 1024) { // Only compress files larger than 500KB
        console.log(`Compressing ${file} (${(stat.size / (1024 * 1024)).toFixed(2)} MB)...`);
        const tempPath = fullPath + ".tmp";
        
        try {
          if (ext === ".png") {
            await sharp(fullPath)
              .resize({ width: 1200, withoutEnlargement: true })
              .png({ quality: 80, compressionLevel: 9 })
              .toFile(tempPath);
          } else {
            await sharp(fullPath)
              .resize({ width: 1200, withoutEnlargement: true })
              .jpeg({ quality: 80, mozjpeg: true })
              .toFile(tempPath);
          }

          fs.unlinkSync(fullPath);
          fs.renameSync(tempPath, fullPath);

          const newStat = fs.statSync(fullPath);
          console.log(`✓ Compressed ${file} to ${(newStat.size / 1024).toFixed(1)} KB`);
        } catch (err) {
          console.error(`Failed to compress ${file}:`, err);
          if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
        }
      }
    }
  }
}

compressDir(dir).then(() => console.log("All heavy images compressed successfully."));
