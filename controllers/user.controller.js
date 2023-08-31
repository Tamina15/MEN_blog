function UserPage(req, res){
    res.render('user');
}
function Login(req, res) {
    res.render('login', {layout:'./layouts/noheader'})
}

function Register(req, res) {
    res.render('register',{layout:'./layouts/noheader'});
}
module.exports = {UserPage, Login, Register };