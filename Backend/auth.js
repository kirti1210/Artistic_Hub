const register = require('./register');
const jwt = require('jsonwebtoken')
const feedback= require('./feedback')


exports.register = async (req, res) => {
    let values = [];
    console.log(req.body)
    try {
        values = await register.findOne({ "email": req.body.email });
        console.log(values)
    }
    catch (err) {
        res.json({ status: "error", msg: "Some error occured" });
    }

    if (values != null) {
        res.json({ status: "error", msg: "Email already registered" });
        console.log("heyheyehey")
    }
    else {
        const Register = new register({
            username: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        try {
            Register.save().then(() => {
                console.log("done")
                res.json({ status: "success", msg: "Confirm your email and login" });
            })

        }
        catch (err) {
            res.json({ status: "error", msg: err });
        }
    }
};

exports.login = async (req, res) => {
    let values = [];
    console.log("in login")
    try {
        values = await register.findOne({ "email": req.body.email });
    }
    catch (err) {
        return res.status(404);
    }
    if (values == null) {
        res.json({ status: "error", msg: 'Email not registered' });
    }
    else if (values.password != req.body.password) {
        res.json({ status: "error", msg: 'Check your login credentials' });
    }
    else {
        const token = jwt.sign({ id: values.id }, "om3011", {
            expiresIn: 60 * 60,
        })

        const cookieOptions = {
            expires: new Date(Date.now() + 1000 * 60 * 60),
            httpOnly: true
        }

        res.cookie("userLoggedIn", token, cookieOptions);
        // res.status(200);
        console.log("okokkk")
        return res.json({ status: "success", msg: "Logged In" });


    }

};


exports.feedback = (req, res) => {
    let values = [];
    console.log("in feedbak")
    console.log(req.body)

    const Feedback = new feedback({
        username: req.body.name,
        email: req.body.email,
        feedback: req.body.feedback
    });
    try {
        Feedback.save().then(() => {
            console.log("done")
            res.json({ status: "success", msg: "saved feedback" });
        })

    }
    catch (err) {
        res.json({ status: "error", msg: err });
    }

};