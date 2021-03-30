const express = require("express")
const exphbs = require("express-handlebars")
const app = express()

// express-handlebars setup
app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs'
}));

app.set('view engine', 'hbs');

app.get("/", (req,res)=>{
	res.render("home")
})

const PORT = 3000
app.listen(PORT,()=>{
	console.log(`Server started at Port ${PORT}`)
})