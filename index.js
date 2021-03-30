const express = require("express")
const bodyParser = require("body-parser")
const exphbs = require("express-handlebars")
const Pokedex = require('pokedex-promise-v2');

const app = express()
const P = new Pokedex();

// express-handlebars setup
app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs'
}));

app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({extended:true}))

app.get("/", (req,res)=>{
	res.render("home")
})

app.post("/submit", async (req,res)=>{
	const searchedPokemon = req.body.pokename.trim()
	try{
		const pokeData = await P.getPokemonByName(searchedPokemon)
		console.log(pokeData)
		res.render("pokemon",{
			data: pokeData
		})
	}catch(e){
		console.log(e)
	}
})

const PORT = 3000
app.listen(PORT,()=>{
	console.log(`Server started at Port ${PORT}`)
})