module.exports = function (app) {

    app.post("/ejs/form", postForm);
    app.get("/ejs/form", renderAllForms);
    app.get("/ejs/form/:formId/delete", deleteForm);
    app.get("/ejs/form/:formId", findFormById);


    function findFormById(req, res) {
        var formId = req.params.formId;
        var form = model.findFormById(formId);
        // var forms = model.findAllForms();
        var data = {
            form: form,
            forms: model.findAllForms()
        };
        res.render("ejs/form/form-list.view.server.ejs", data);
    }

    function deleteForm(req, res) {
        var formId = req.params.formId;
        model.deleteForm(formId);
        res.redirect('/ejs/form');
    }

    function postForm(req, res) {
        var form = req.body;
        var action = form.action;
        if(action === 'create'){
            model.createForm(form);
        } else if(action === 'create')
        {
            model.updateForm(form);
        }
        res.redirect('/ejs/form');

        // model.createForm(form);
        // res.redirect('/ejs/form');
        // var forms = model.findAllForms();
        // var data = {
        //     forms: forms
        // };
        // res.render("ejs/form/form-list.view.server.ejs", data);
    }

    function renderAllForms(req, res) {
        //no slash in the beginning supposed to be in views directory (ejs/form/form-list.view.server.ejs)
        var forms = model.findAllForms();
        var data = {
            forms: forms
        };
        res.render("ejs/form/form-list.view.server.ejs", data);
    }
};
