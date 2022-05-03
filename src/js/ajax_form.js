import './asyncForm.js';



$('form[name="contact_form"]').asynForm({
    email: {
        required: true,
        email: true
    }
},{
    email: "გთხოვთ შეიყვანოთ სწორი ელ.ფოსტის მისამართი"
},{
    'load': 'ფორმა წარმატებით გაიგზავნა',
    'error': 'აღმოჩენილია შეცდომა, სცადეთ კიდევ ერთხელ მოგვიანებით',
    'timeout': 'დამუშავების დრო ამოიწურვა, სცადეთ კიდევ ერთხელ მოგვიანებით'
});










//jQuery(document).ready(function($){
//
//    $(':input','#mail_form')
//        .not(':button, :submit, :reset, :hidden')
//        .val('')
//        .prop('checked', false)
//        .prop('selected', false);
//
//
//    
//    var form = $('#mail_form')[0],
//    patterns = {
//        'subject': /.*/i,
//        'message': /.*/i,
//        'email': /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]+\b$/i,
//    },
//    responseMessages = {
//        'load': 'ფორმა წარმატებით გაიგზავნა',
//        'error': 'აღმოჩენილია შეცდომა, სცადეთ კიდევ ერთხელ მოგვიანებით',
//        'timeout': 'დამუშავების დრო ამოიწურვა, სცადეთ კიდევ ერთხელ მოგვიანებით',
//        'empty': 'ფორმა ცარიელია',
//        'unvalidated': 'მეილი აუცილებელია'
//    },
//
//
//
//    outputDialog = $('.output_dialog')[0],
//    outputDialogAnim = anime.timeline({autoplay: false})
//        .add({
//            targets: outputDialog,
//            opacity: 1,
//            duration: 200,
//            easing: 'linear',
//        })
//        .add({
//            targets: outputDialog,
//            opacity: 0,
//            duration: 200,
//            delay: 1000,
//            easing: 'linear',
//            complete: function(anim){
//                forEach(anim.animatables, function(el){
//                    el.target.className = 'output_dialog';
//                    el.target.querySelector('span').innerHTML = '';
//                });
//            }
//        }),
//
//
//
//    hasClass = function(elem, className) {
//        return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
//    },
//    addClass = function(elem, className) {
//        if (!hasClass(elem, className)) {
//            elem.className += ' ' + className;
//        }
//    },
//    removeClass = function(elem, className) {
//        var newClass = ' ' + elem.className.replace( /[\t\r\n]/g, ' ') + ' ';
//        if (hasClass(elem, className)) {
//            while (newClass.indexOf(' ' + className + ' ') >= 0 ) {
//                newClass = newClass.replace(' ' + className + ' ', ' ');
//            }
//            elem.className = newClass.replace(/^\s+|\s+$/g, '');
//        }
//    },
//    forEach = function(self,f){
//        return Array.prototype.map.call(self,f).filter(function(e){return e!=null})
//    },
//
//
//
//
//
//    /// is
//    empty = function(form) {
//        return forEach(form,function(elem){
//            if(elem.name){ return elem.value; }
//        })
//        .every(function(elemValue){
//            return !elemValue
//        });
//    },
//    ///is
//    validate = function(form){
//        return forEach(form,function(elem){
//            if(elem.name){ return elem }
//        })
//        .some(function(elem){
//            if(elem.name==='email'){
//                if(elem.value===''){ return false }
//                return patterns[elem.name].test(elem.value);
//            } else {
//                return false;
//            }
//        });
//    },
//
//    serialize = function(form) {
//        return forEach(form,function(elem){
//            return elem.name?elem.name+'='+elem.value:null
//        })
//        .join('&');
//    },
//    disableForm = function(form,disable) {
//        forEach(form,function(elem){
//            elem.disabled = disable;
//        });
//    },
//    clearForm = function(form) {
//        forEach(form,function(elem){
//            elem.value = ''
//            removeClass(elem,'success');
//            removeClass(elem,'with_content');
//        });
//    },
//
//
//
//    responseHandler = function(responseStatus) {
//        addClass(outputDialog,responseStatus);
//        $(outputDialog).find('span').html(responseMessages[responseStatus]);
//        removeClass(form,'processing');
//        clearForm(form);
//        outputDialogAnim.restart();
//        disableForm(form,false);
//    };
//
//
//
//    $("#mail_form").submit(function(e) {
//        e.preventDefault();
//        var form = this,
//            url = $(form).attr('action');
//        if(empty(form)) {
//            addClass(outputDialog,'empty');
//            outputDialog.querySelector('span').innerHTML = responseMessages['empty'];
//            outputDialogAnim.restart();
//            disableForm(form,false);
//        } else if(!validate(form)) {
//            addClass(outputDialog,'unvalidated');
//            outputDialog.querySelector('span').innerHTML = responseMessages['unvalidated'];
//            outputDialogAnim.restart();
//            disableForm(form,false);
//        } else {
//            addClass(form,'processing');
//            disableForm(form,true);
//            $.ajax({
//                type: "POST",
//                url: url,
//                data: serialize(form),
//                timeout:30000,
//                success: function(data){
//                    responseHandler('load');
//                },
//                error: function(jqXHR, textStatus){
//                    if (textStatus === 'timeout') {
//                        addClass(outputDialog,'timeout');
//                        outputDialog.querySelector('span').innerHTML = responseMessages['timeout'];
//                        removeClass(form,'processing');
//                        outputDialogAnim.restart();
//                        disableForm(form,false);
//                    } else {
//                        responseHandler('error');
//                    }
//                }
//            });
//        }
//    });
//    for(var j = 0; form.length > j; j++) {
//        var input = form[j],
//            validateInput = function(input){
//                if(input.value===''){ return '' }
//                return patterns[$(input).attr('name')].test(input.value)
//            },
//            inputStatus = function(input){
//                if(validateInput(input)){
//                    addClass(input,'success');
//                    removeClass(input,'error');
//                } else if(validateInput(input) === '') {
//                    removeClass(input,'error');
//                    removeClass(input,'success');
//                } else {
//                    addClass(input,'error');
//                    removeClass(input,'success');
//                }
//            };
//        input.addEventListener('blur',function(e){
//            var input = e.target;
//            inputStatus(input);
//            if(input.value){
//                addClass(input,'with_content');
//            } else {
//                removeClass(input,'with_content');
//            }
//        });
//        input.addEventListener('input',function(e){
//            var input = e.target;
//            if(hasClass(input,'success') || hasClass(input,'error')) { inputStatus(e.target) }
//        });
//    }
//});