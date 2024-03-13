const express = require('express')
const fs = require('fs')

const app = express()
const PORT = 3000

const customers = JSON.parse(
    fs.readFileSync(`${__dirname}/data/dummy.json`, 'utf-8')
);

app.use(express.json())

app.get('/', (req, res) => {
    res.send('<h1>Hello FSW 1 Tercinta</h1>')
})

app.get('/api/v1/customers', (req, res) => {
    res.status(200).json({
        status: 'Success',
        totalData: customers.length,
        data: {
            customers
        }
    })
})

app.post('/api/v1/customers', (req, res) => {
    const newCustomer = req.body
    customers.push(req.body)
    fs.writeFile(
        `${__dirname}/data/dummy.json`,
        JSON.stringify(customers),
        err => {
            res.status(201).json({
                status: 'Success',
                data: {
                    customers: newCustomer,
                }
            })

        }
    )
})

app.listen(PORT, () => {
    console.log(`Listening on port http://localhost:${PORT}`)
})