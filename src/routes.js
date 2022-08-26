const express = require("express");
const MercadoPagoController = require("./Controllers/index");
const routes = express.Router();

// Criar pagamento
routes.post("/createTransaction", MercadoPagoController.createTransaction);

//Consultar todos pagamentos
routes.get("/showTransaction", MercadoPagoController.showTransaction);

//Consultar pagamento por ID
routes.get(
  "/showTransactionById/:id",
  MercadoPagoController.showTransactionById
);

//Pagamento cancelado
routes.delete(
  "/cancelTransaction/:id",
  MercadoPagoController.cancelTransaction
);

//Postando  informaçoes do pagamento
routes.post(
  "/getInfoTransaction",
  MercadoPagoController.getInfoTransactionNgrok
);

// recebendo do webhook
routes.post(
  "/transactionResponse",
  MercadoPagoController.getInfoTransactionNgrok
);

routes.get("/transactionResponse", MercadoPagoController.getInfoTransaction);

module.exports = routes;
