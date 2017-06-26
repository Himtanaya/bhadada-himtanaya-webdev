module.exports = function (app) {

    var forms = require('quiz6/server/models/form.mock.server.json');
    var api = {
        findAllForms: findAllForms,
        createForm: createForm,
        deleteForm: deleteForm,
        findFormById: findFormById,
        updateForm: updateForm
    };
    return api;

    function updateForm(form) {
        for(var f in forms){
            if(form._Id === forms[f]._id){
                forms[f] = form;
            }
        }
    }

    function findFormById(formId) {
        for(var f in forms){
            if(formId === forms[f]._id){
                return forms[f];
            }
        }
    }

    function deleteForm(formId) {
        for(var f in forms){
            if(formId === forms[f]._id){
                forms.splice(f, 1);
            }
        }
    }

    function createForm(form) {
        forms.push(form);
    }

    function findAllForms(){
        return forms;
    }

};