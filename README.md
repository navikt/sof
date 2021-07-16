# SOF

I dette prosjektet lages en SMART on FHIR applikasjon, som skal kunne brukes av ulike elektroniske pasientjournaler i Norge. Gjennom applikasjonen vil leger kunne fylle ut og sende ulike skjemaer til NAV. Blant skjemaene som brukes er "Legeerklæring: pleiepenger for sykt barn".

# Komme i gang

1. Klon prosjektet.
2. Naviger til prosjektet sof i terminalen og kjør `npm install` for å laste ned nødvendige pakker.
3. For å kjøre frontend, skriv `npm start` i terminalen.
4. For å teste applikasjonen i en EPJ, gå inn på https://launch.smarthealthit.org/. Der velger du en pasient og en lege (Provider), fyller inn URLen hvor frontend applikasjonen kjører (dette vil ofte være http://localhost:4200), og trykker «Launch App!».
5. For å kjøre alle tester, skriv `npm test` i terminalen.

# Oppstart av prosjektet

Prosjektet ble lagd ved å bruke [Nx](https://nx.dev), som gir flere verktøy, biblioteker ol. Blant annet gjorde nx det lett å lage en react applikasjon ved å kjøre `nx g @nrwl/react:app my-app`.

# FHIR

## Å lage et Questionnaire

Når man lager nye skjemaer må man følge noen standarder for at koden skal virke som forventet. For det første må man følge standarden til Questionnaire ressursen som oppgitt hos [FHIR](https://hl7.org/fhir/questionnaire.html). I tillegg må følgende overholdes for at skjemaet skal rendres som ønsket:

1. Et items linkId må være unikt. Hvis itemet representerer en hjelpetekst må verdien til linkId være på følgende format: "idNumber-help", hvor -help gjør at det dukker opp som hjelpetekst i stedet for et spørsmål. Om svaret på et spørsmål skal hentes automatisk fra en FHIR server (som f.eks. pasientens navn og fødselsnummer), skriv verdien til linkId på følgende format: "idNumber-automatic".

# Henvendelser

Spørsmål knyttet til koden eller prosjektet kan stilles som issues her på GitHub.

# For NAV-ansatte

Interne henvendelser kan sendes via Slack i kanalen #smart-on-fhir.
