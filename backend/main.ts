import smart from "fhirclient";
import session from "express-session";
import * as express from "express";

const app = express();

//Settings for our own server
app.use(
	session({
		secret: "my secret",
		resave: false,
		saveUninitialized: false,
	})
);

//Settings for the fhir-server
const smartSettings = {
	clientId: "my-client-id",
	redirectUri: "/app",
	scope: "launch/patient patient/*.read openid fhirUser",
	iss: "http://localhost:8080/fhir",
};

// Just a simple function to reply back with some data (the current patient if
// we know who he is, or all patients otherwise
async function handler(client, res) {
	const data = await (client.patient.id
		? client.patient.read()
		: client.request("Patient"));
	res.type("json").send(JSON.stringify(data, null, 4));
}

//Brings us to the "main page". Can use specialized routers to handle specific request-cases
app.get("/", (req, res) => {
	smart(req, res)
		.init({ ...smartSettings, redirectUri: "/" })
		.then((client) => handler(client, res));
});

//Listen to the specific port to receive the requests
app.listen(8080);
