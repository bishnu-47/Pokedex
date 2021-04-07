const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const Pokedex = require("pokedex-promise-v2");

const app = express();
const P = new Pokedex();

// express-handlebars setup
app.engine(
	"hbs",
	exphbs({
		defaultLayout: "main",
		extname: ".hbs",
	})
);

app.set("view engine", "hbs");
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // suppoet encoded bodies

// Static folder
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
	res.render("home");
});

app.post("/pokemon", (req, res) => {
	const searchedPokemon = req.body.pokename.trim();
	res.redirect(`/pokemon/${searchedPokemon}`);
});

app.get("/pokemon/:name", async (req, res) => {
	try{
		const baseStats = {}
	const pokeData = await P.getPokemonByName(req.params.name);

	pokeData.stats.forEach((s)=>{
		baseStats[s.stat.name] = s.base_stat
	}) // to dig out each stats from json

	res.render("pokemon", {
		name: pokeData.name,
		img: pokeData.sprites.other["official-artwork"].front_default,
		stats: baseStats,
		weight: pokeData.weight,
		height: pokeData.height,
		types: pokeData.types
	});
}catch(e){
	res.render("error",{
		title : "404",
		msg : "Pokemon not found! please search for correct one"
	})
}
});

const PORT = 3000;
app.listen(PORT, () => {
	console.log(`Server started at Port ${PORT}`);
});
