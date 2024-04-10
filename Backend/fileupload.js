async function upload(file, folder) {
  const file_name = file.name;

  try {
    await file.mv(`./public/${folder}/${file_name}`); // ye folder upper wala folder hai

    console.log("successfully file uploaded");
  } catch (error) {
    console.log("error in file upload", error);
  }
  return `/${folder}/${file_name}`;
}
module.exports = { upload };
