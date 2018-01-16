const path = require('path')
const fs = require('fs')
const formidable = require('formidable')
const mongoose = require('mongoose')

module.exports.addWorks = function(req, res) {

    console.log(req.body)

    const form = new formidable.IncomingForm();
    const upload = './public/assets/images/upload';
    let fileName;
  
    if (!fs.existsSync(path.join(process.cwd(), upload))) {
        fs.mkdirSync(path.join(process.cwd(), upload))
        console.log('no')
    }
  
    form.uploadDir = path.join(process.cwd(), upload)
  
    form.parse(req, function (err, fields, files) {
        console.log(fields)
        console.log(files)
      fileName = path.join(upload, files.file.name);
      fs.rename(files.file.path, fileName, function (err) {
        if (err) {
          console.log(err);
          fs.unlink(fileName);
          fs.rename(files.file.path, fileName);
        }
      })



      const Model = mongoose.model('works')
      const item = new Model({
        name: fields.name,
        tech: fields.tech,
        link: fields.link,
        path: 'assets/images/upload/' + files.file.name
      })
      item.save().then(item => {
        return res.status(200).json({ status: 'Работа успешно добавленно' })
      }, err => {
        const error = Object
          .keys(err.errors)
          .map(key => err.errors[key].message)
          .join(', ')
        res.status(404).json({ status: 'При добавлении произошла ошибка' })
      })
  })
}