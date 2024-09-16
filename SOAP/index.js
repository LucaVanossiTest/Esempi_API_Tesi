const soap = require('soap');
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

// Dati in memoria per ordini
let ordini = [];
let idOrdineCorrente = 1;

// Implementazione del servizio
const servizio = {
    ordiniService: {
        ordiniServicePortType: {
            CreaOrdine: (args) => {
                const nuovoOrdine = {
                    idOrdine: idOrdineCorrente.toString(),
                    nomeCliente: args.nomeCliente,
                    prodotto: args.prodotto,
                    quantita: args.quantita
                };
                ordini.push(nuovoOrdine);
                idOrdineCorrente++;
                return { idOrdine: nuovoOrdine.idOrdine };
            },
            GetOrdine: (args) => {
                const ordine = ordini.find(o => o.idOrdine === args.idOrdine);
                if (ordine) {
                    return ordine;
                } else {
                    throw new Error("ordine non trovato");
                }
            },
            DeleteOrdine: (args) => {
                const index = ordini.findIndex(o => o.idOrdine === args.idOrdine);
                if (index !== -1) {
                    ordini.splice(index, 1);
                    return { success: true };
                } else {
                    throw new Error("ordine non trovato");
                }
            }
        }
    }
};

// Lettura del file WSDL
const wsdlPath = path.join(__dirname, 'ordini.wsdl');
const wsdlXML = fs.readFileSync(wsdlPath, 'utf8');

// Avvio del server SOAP
app.listen(8000, () => {
    soap.listen(app, '/ordiniService', servizio, wsdlXML, () => {
        console.log('SOAP server running on http://localhost:8000/ordiniService');
    });
});
