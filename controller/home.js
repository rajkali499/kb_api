module.exports.indexPage = (req,res) => {
    // res.render('home/index')
    res.send("homePage")
}

module.exports.docsPage = (req,res) => {
    res.render('home/docs')
    res.send("docsPage")
}