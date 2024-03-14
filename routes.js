const express = require('express');
const fs = require('fs');

const router = express.Router();

const customers = JSON.parse(
    fs.readFileSync(`${__dirname}/data/dummy.json`)
);

const defaultRouter = (req, res) => {
    res.send('<p>Hello FSW 1 Tercinta')
}

const getCustomerData = (req, res) => {
    console.log(req.params)

    res.status(200).json({
        status: 'Success',
        totalData: customers.length,
        data: {
            customers
        }
    })
}

const getCustomerbyId = (req, res) => {
    const id = req.params.id

    const customer = customers.find(cust => cust._id === id)
    if (!customer) {
        return res.status(404).json({
            status: 'fail',
            message: `Customer dengan ID : ${id} tidak ditemukan!`
        })
    }

    res.status(200).json({
        status: 'Success',
        data: {
            customer
        }
    })
}

const insertUser = (req, res) => {
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
}

const updateUser = (req, res) => {
    const id = req.params.id
    const customer = customers.find(cust => cust._id === id)
    const customerIndex = customers.findIndex(cust => cust._id === id)

    if (!customer) {
        return res.status(404).json({
            status: 'fail',
            message: `Customer dengan ID : ${id} tidak ditemukan!`
        })
    }
    customers[customerIndex] = {
        ...customers[customerIndex],
        ...req.body
    }
    fs.writeFile(
        `${__dirname}/data/dummy.json`, JSON.stringify(customers), err => {
            res.status(200).json({
                status: 'Success',
                message: `Berhasil update data ID : ${id}!`,
                data: {
                    customer: customers[customerIndex],
                }
            })
        }
    )
}

const deleteUser = (req, res) => {
    const id = req.params.id;
    const customerIndex = customers.findIndex(cust => cust._id === id);


    if (customerIndex === -1) {
        return res.status(404).json({
            status: 'fail',
            message: `Customer dengan ID : ${id} tidak ditemukan!`
        });
    }

    customers.splice(customerIndex, 1);
    console.log(customerIndex)

    fs.writeFile(
        `${__dirname}/data/dummy.json`, JSON.stringify(customers), err => {
            if (err) {
                return res.status(500).json({
                    status: 'error',
                    message: 'Failed to update data file!'
                });
            }
            res.status(200).json({
                status: 'Success',
                message: `Berhasil hapus data ID : ${id}!`
            });
        }
    );
}

router.route("/").get(defaultRouter)
router.route("/api/v1/customers").get(getCustomerData).post(insertUser)
router
    .route("/api/v1/customers/:id")
    .get(getCustomerbyId)
    .patch(updateUser)
    .delete(deleteUser)

module.exports = router;
