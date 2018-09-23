import { success, notFound, authorOrAdmin } from '../../services/response/'
import { transaction } from '.'
import { axios } from 'axios'

export const create = ({ user, bodymen: { body } }, res, next) =>
  transaction.create({ ...body, user })
    .then((transaction) => transaction.view(true))
    .then(res => {
      axios.post('https://apitest.authorize.net/xml/v1/request.api', {
        headers:
        { 'postman-token': '396b2c37-7aa6-1fd5-a396-28fcecd8d504',
          'cache-control': 'no-cache',
          authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViYTZlNDZhNjQwMGQ2MTg4YjI1YjE2YyIsImlhdCI6MTUzNzY2NDU3N30.v2ridg8lxxiyeNaNARv70gyK8hElsaY2rflPkx2b0pE',
          'content-type': 'application/json' },
        data:
        { createTransactionRequest:
            { merchantAuthentication: { name: '99f54XpAd9Tp', transactionKey: '8ZqfCc228Y88M7nK' },
              refId: '123456',
              transactionRequest:
              { transactionType: 'authCaptureTransaction',
                amount: '50000',
                payment:
                  { creditCard:
                    { cardNumber: '5424000000000015',
                      expirationDate: '2020-12',
                      cardCode: '999' } },
                lineItems:
                  { lineItem:
                    { itemId: '1',
                      name: 'vase',
                      description: 'Cannes logo',
                      quantity: '18',
                      unitPrice: '45.00' } },
                tax:
                  { amount: '4.26',
                    name: 'level2 tax name',
                    description: 'level2 tax' },
                duty:
                  { amount: '8.55',
                    name: 'duty name',
                    description: 'duty description' },
                shipping:
                  { amount: '4.26',
                    name: 'level2 tax name',
                    description: 'level2 tax' },
                poNumber: '456654',
                customer: { id: '99999456654' },
                billTo:
                  { firstName: 'Ellen',
                    lastName: 'Johnson',
                    company: 'Souveniropolis',
                    address: '14 Main Street',
                    city: 'Pecan Springs',
                    state: 'TX',
                    zip: '44628',
                    country: 'USA' },
                shipTo:
                  { firstName: 'China',
                    lastName: 'Bayles',
                    company: 'Thyme for Tea',
                    address: '12 Main Street',
                    city: 'Pecan Springs',
                    state: 'TX',
                    zip: '44628',
                    country: 'USA' },
                customerIP: '192.168.1.1',
                userFields:
                  { userField:
                    [ { name: 'MerchantDefinedFieldName1',
                      value: 'MerchantDefinedFieldValue1' },
                    { name: 'favorite_color', value: 'blue' } ] } } } },
        json: true })

      success(res, 201)
    }

    )
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  transaction.find(query, select, cursor)
    .populate('user')
    .then((transactions) => transactions.map((transaction) => transaction.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  transaction.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then((transaction) => transaction ? transaction.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  transaction.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((transaction) => transaction ? Object.assign(transaction, body).save() : null)
    .then((transaction) => transaction ? transaction.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  transaction.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((transaction) => transaction ? transaction.remove() : null)
    .then(success(res, 204))
    .catch(next)
