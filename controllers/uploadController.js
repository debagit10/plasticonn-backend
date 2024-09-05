const pics = (req, res) => {
  try {
    const imageUrl = req.file.path;
    const imageName = req.file.originalname;

    res.status(200).json({
      message: "Image uploaded successfully",
      imageUrl: imageUrl,
      imageName: imageName,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Failed to upload image", error: error.message });
  }
};

const files = (req, res) => {
  try {
    const fileUrl = req.file.path;
    const fileName = req.file.originalname;

    res.status(200).json({
      message: "Document uploaded successfully",
      fileUrl: fileUrl,
      fileName: fileName,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Failed to upload image", error: error.message });
  }
};

module.exports = { pics, files };
