const fs = require('fs')


const customers = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/dummy.json`)
);


const getCustomerData = (req, res) => {
    console.log(req.requestTime)
    res.status(200).json({
        status: 'Success',
        totalData: customers.length,
        requestAt: req.requestTime,
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
        `${__dirname}/../data/dummy.json`, JSON.stringify(customers), err => {
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

module.exports = {
    getCustomerData,
    getCustomerbyId,
    insertUser,
    updateUser,
    deleteUser,
}