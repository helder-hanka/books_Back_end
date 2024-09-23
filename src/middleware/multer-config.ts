import multer from "multer";
import path from "path";
import fs from "fs";

const desImg = "images/";

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, desImg);
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

if (!fs.existsSync(desImg)) {
  fs.mkdirSync(desImg, { recursive: true });
}

const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedFileTypes = /jpeg|jpg|png/;
  const exname = allowedFileTypes.test(
    path.extname(file.originalname).split(" ").join("_").toLocaleLowerCase()
  );
  const mimeType = allowedFileTypes.test(file.mimetype);

  if (exname && mimeType) {
    return cb(null, true);
  } else {
    cb(new Error("Only images are allowed"));
  }
};

const limits = {
  fileSize: 5 * 1024 * 1024,
};

export const uploadImg = multer({
  storage,
  fileFilter,
  limits,
}).single("image");
