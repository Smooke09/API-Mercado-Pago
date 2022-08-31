const axios = require("axios");
const env = require("dotenv").config();
const firebase = require("../config/connection");

class MercadoPagoController {
  //Method para criar pagamento
  async createTransaction(req, res) {
    axios({
      method: "post",
      url: `https://api.mercadopago.com/point/integration-api/devices/${process.env.DEVICE_ID}/payment-intents`,
      data: req.body,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
    })
      .then((response) => {
        const idGET = response.data.id;
        const getDescription = response.data.description;
        const paymentOfPagament = response.data.payment.type;

        if (paymentOfPagament === "credit_card") {
          let convertString = paymentOfPagament.replace(
            "credit_card",
            "Cartão de Credito"
          );
          res.status(200).json({
            message: "Pagamento criado com sucesso",
            NumeroDoPagamento: idGET,
            Descrição: getDescription,
            TipodePagamento: convertString,
          });
          return;
        } else if (paymentOfPagament === "debit_card") {
          let convertString = paymentOfPagament.replace(
            "debit_card",
            "Cartão de Debito"
          );
          res.status(200).json({
            message: "Pagamento criado com sucesso",
            NumeroDoPagamento: idGET,
            Descrição: getDescription,
            "Tipo de Pagamento": convertString,
          });

          /* 
          //Salvando no banco de dados
                  const payment = firebase.database().ref("pagamentos");
          let key = payment.push().key;

          payment
            .child(data.id)
            .set({
              id: data.id,
              ...data,
            })
            .then(() => {
              res.status(200).json({
                message: "Pagamento salvo com sucesso",
                status: 200,
              });
            })
            .catch((error) => {
              console.log(error);
            });
          return; 
    */

          return;
        }
      })
      .catch((error) => {
        res.status(404).json(error.response.data);
        return;
      });
  }

  //Method para consultar todos os pagamentos
  async showTransaction(req, res) {
    let dataStart = "2022-08-02";
    let dataEnd = "2022-09-01";
    const urlGet =
      await `https://api.mercadopago.com/point/integration-api/payment-intents/events?startDate=${dataStart}&endDate=${dataEnd}`;

    axios({
      method: "get",
      url: `${urlGet}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
    })
      .then((response) => {
        res.status(200).json(response.data);
        return;
      })
      .catch((error) => {
        res.status(500).json(error);
        return;
      });
  }

  //Method para consultar pagamento por ID
  async showTransactionById(req, res) {
    const payMentID = req.params.id;
    const urlGet = `https://api.mercadopago.com/point/integration-api/payment-intents/${payMentID}`;

    axios({
      method: "get",
      url: `${urlGet}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
    })
      .then((response) => {
        res.status(200).json(response.data);
        return;
      })
      .catch((error) => {
        res.status(404).json(
          (error.response.data = {
            message: "Pagamento não encontrado",
            status: 404,
          })
        );
        return;
      });
  }

  //Method para cancelar o pagamento
  async cancelTransaction(req, res) {
    const payMentID = req.params.id;
    console.log(payMentID);
    const urlGet = `https://api.mercadopago.com/point/integration-api/devices/${process.env.DEVICE_ID}/payment-intents/${payMentID}`;

    axios({
      method: "delete",
      url: `${urlGet}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
    })
      .then((response) => {
        res.status(200).json(response.data);
        return;
      })
      .catch((error) => {
        res.status(404).json(
          (error.response.data = {
            message: "Pagamento não encontrado",
            status: 404,
          })
        );
        return;
      });
  }

  async getInfoTransactionNgrok(req, res) {
    const bodyResponse = [await req.body];
    try {
      const { io } = require("../config/http");
      io.on("connection", (socket) => {
        console.log("socket payment", socket.id);
      });

      io.emit("payment", bodyResponse[0]);

      console.log(bodyResponse);

      res.status(200).json(bodyResponse);
    } catch (error) {
      res.status(500).json(error);
    }

    //Salvando no banco de dados
    /*  const data = {
      id: bodyResponse.id,
      amount: bodyResponse.amount,
      transictionCreate: bodyResponse.created_at,
      payment: {
        idDopagamento: bodyResponse.payment.id,
        status: bodyResponse.payment.state,
        type: bodyResponse.payment.type,
      },
      state: bodyResponse.state,
    };

    */
  }

  //Method para pegar informaçoes do pagamento
  async getInfoTransaction(req, res) {
    console.log(req);
  }
}

module.exports = new MercadoPagoController();
